import { CoreMessage } from "ai";
import Redis from "ioredis";
import { v4 as uuid } from "uuid";
export interface Message extends Omit<CoreMessage, "createdAt"> {
  id: string;
  conversationId: string;
  createdAt: number;
}
const URL = process.env.AI_MESSAGES_REDIS_REDIS_URL;

if (!URL) {
  throw new Error("AI_MESSAGES_REDIS_REDIS_URL is not set");
}

const redis = new Redis(URL);

export interface Conversation {
  id: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}
export async function createConversation({ userId }: { userId: string }): Promise<Conversation> {
  const conversationId = uuid();
  const now = Date.now();
  const conversation: Conversation = {
    id: conversationId,
    userId,
    createdAt: now,
    updatedAt: now
  };

  await redis.set(`conversation:${conversationId}`, JSON.stringify(conversation));

  await redis.zadd(`user:${userId}:conversations`, now, conversationId);

  return conversation;
}

export async function getConversationById(id: string): Promise<Conversation | null> {
  const conversation = await redis.get(`conversation:${id}`);
  return conversation ? JSON.parse(conversation) : null;
}

export async function createMessage({
  conversationId,
  aiMessage
}: {
  conversationId: string;
  aiMessage: Omit<CoreMessage, "createdAt" | "id">;
}): Promise<Message> {
  const messageId = uuid();
  const now = Date.now();

  const message: Message = {
    ...aiMessage,
    id: messageId,
    conversationId,
    createdAt: now
  } as const;

  await redis.set(`message:${messageId}`, JSON.stringify(message));
  await redis.rpush(`conversation:${conversationId}:messages`, messageId);

  // Update conversation's updatedAt and its position in the sorted set
  const conversation = await getConversationById(conversationId);
  if (conversation) {
    conversation.updatedAt = now;
    await redis.set(`conversation:${conversationId}`, JSON.stringify(conversation));
    // Update the score in the sorted set to reflect new updatedAt
    await redis.zadd(`user:${conversation.userId}:conversations`, now, conversationId);
  }

  return message;
}

export async function getMessagesByConversation(conversationId: string): Promise<Message[]> {
  const messageIds = await redis.lrange(`conversation:${conversationId}:messages`, 0, -1);
  if (!messageIds.length) return [];

  const messages = await Promise.all(messageIds.map((id) => redis.get(`message:${id}`)));

  return messages.filter(Boolean).map((str) => JSON.parse(str!));
  // .sort(
  //   (a, b) =>
  //     new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  // ); // TODO: this sort is probably not needed, because we add messages in order
}

export async function getConversationsByUser(userId: string): Promise<Conversation[]> {
  // Get all conversation IDs for this user in reverse chronological order (newest first)
  // We use a sorted set (zset) with timestamp as score to maintain conversation order
  // In Redis, 0 is the start index and -1 means "until the end of the list"
  const ids = await redis.zrevrange(`user:${userId}:conversations`, 0, -1);
  if (!ids.length) return [];

  const conversations = await Promise.all(ids.map((id) => redis.get(`conversation:${id}`)));

  return conversations.filter(Boolean).map((str) => JSON.parse(str!));
}

// 表结构：
