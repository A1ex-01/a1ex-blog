export const STATUSCODE = {
  NEEDTOVIP: 40101,
  NOUSERTIMES: 40102,
  NOLIMIT: 40103,
  NOBULBTIMES: 40104 // 活动数量超出限制
} as const;
export type ISTATUSCODES = (typeof STATUSCODE)[keyof typeof STATUSCODE];
export type ISTATUSCODEKEYS = keyof typeof STATUSCODE;
