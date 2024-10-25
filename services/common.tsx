import { ICP } from "@/types";
import request from ".";

export const getPosts = async (params: ICP) => {
  return request.get(`/posts`, { ...params });
};
export const getPost = async (uuid: string) => {
  return request.get(`/posts/${uuid}`, {});
};
export const getCates = async () => {
  return request.get(`/categories`, {});
};
export const getTags = async () => {
  return request.get(`/tags`, {});
};
