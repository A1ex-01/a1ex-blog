import { getHeaders } from "@/lib/getHeaders";
import queryString from "qs";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type Params = any;

export interface IHeaders {
  Authorization?: string;
}

interface Props extends Params {
  url: string;
  method: Method;
  headers: IHeaders;
}

class ClientRequest {
  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params, headers }: Props) {
    let queryParams = ""; //url参数
    let requestPayload = ""; //请求体数据

    //请求头
    const concatHeaders = getHeaders(headers);

    if (method === "GET" || method === "DELETE") {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url
      if (params) {
        queryParams = queryString.stringify(params);
        url = `${url}?${queryParams}`;
      }
    } else {
      //非form-data传输JSON数据格式
      if (
        !["[object FormData]", "[object URLSearchParams]"].includes(
          Object.prototype.toString.call(params),
        )
      ) {
        Object.assign(headers, { "Content-Type": "application/json" });
        requestPayload = JSON.stringify(params);
      } else {
        requestPayload = params;
      }
    }
    return {
      url,
      options: {
        method,
        headers: concatHeaders,
        body:
          method !== "GET" && method !== "DELETE" ? requestPayload : undefined,
      },
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url;
      if (res.ok) {
        return resolve(res.json() as Promise<T>);
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text);
              return reject({
                message: errorData || "接口错误",
                url: requestUrl,
              });
            } catch {
              return reject({ message: text, url: requestUrl });
            }
          });
      }
    });
  }

  async httpFactory<T>({
    url = "",
    params = {},
    method,
    headers = {},
  }: Props): Promise<T> {
    const remoteUrl = process.env.NEXT_PUBLIC_BASEURL;
    const localUrl = "";
    const baseUrl = url.includes("mock") ? localUrl : remoteUrl;
    const req = this.interceptorsRequest({
      url: baseUrl + url,
      method,
      params: params,
      headers,
      // cacheTime: params.cacheTime,
    });
    const res = await fetch(req.url, req.options);
    return this.interceptorsResponse<T>(res);
  }

  async request<T>(
    method: Method,
    url: string,
    params?: Params,
    headers: IHeaders = {},
  ): Promise<T> {
    return this.httpFactory<T>({ url, params, method, headers });
  }

  get<T>(url: string, params?: Params, headers?: IHeaders): Promise<T> {
    return this.request("GET", url, params, headers);
  }

  post<T>(url: string, params?: Params): Promise<T> {
    return this.request("POST", url, params);
  }

  put<T>(url: string, params?: Params): Promise<T> {
    return this.request("PUT", url, params);
  }

  delete<T>(url: string, params?: Params): Promise<T> {
    return this.request("DELETE", url, params);
  }

  patch<T>(url: string, params?: Params): Promise<T> {
    return this.request("PATCH", url, params);
  }
}

// const clientRequest = new ClientRequest();

// export default clientRequest;
export default ClientRequest;
