export const STATUSCODE = {
  NOLIMIT: 40103
} as const;
export type ISTATUSCODES = (typeof STATUSCODE)[keyof typeof STATUSCODE];
export type ISTATUSCODEKEYS = keyof typeof STATUSCODE;
export const timeZone = "Asia/Shanghai";
