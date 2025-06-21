import { IRes, IUploadFile } from "@/types";
import request from ".";

export const uploadImage = (data?: FormData) => {
  return request.post<IRes<IUploadFile>>("/mobi/services/upload/image", data);
};
