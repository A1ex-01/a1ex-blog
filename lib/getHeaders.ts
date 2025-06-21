import { ACCESSTOKEN } from "@/config";
import { IHeaders } from "@/services/client-request";

export function getHeaders(defaultHeaders: IHeaders = {}) {
  if (typeof window === "undefined") {
    return {
      ...defaultHeaders,
    };
  }
  const token =
    localStorage.getItem(ACCESSTOKEN) || defaultHeaders?.Authorization;
  return {
    ...defaultHeaders,
    Authorization: `Bearer ${token}`,
  };
}
