import { ICP, IRes } from "@/types";
import { IUser } from "@/types/user";
import request from ".";
import { IHeaders } from "./client-request";

export const getMeInfo = (header: IHeaders) => {
  return request.get<IRes<IUser>>("/mobi/me/info", {}, header);
};

export const getPosts = (params: ICP) => {
  return request.get<IRes<any>>("/api/mock/post/get-posts", {
    ...params,
  });
};
