import { ICP } from "@/types";
import request from ".";
import { IPost } from "./types";

export const getPosts = async (params: ICP) => {
  return request.get(`/posts`, { ...params });
};
export const getPost = async (uuid: string) => {
  return request.get<IPost>(`/posts/${uuid}`, {});
};
export const getCates = async () => {
  return request.get(`/categories`, {});
};
export const getTags = async () => {
  return request.get(`/tags`, {});
};
export const getNotionBlogs = async (uuid: string) => {
  return request.get(`/notion/${uuid}`, {});
};
