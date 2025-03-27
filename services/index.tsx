import toast from "react-hot-toast";
import { IRes } from "./types";

export function isClient() {
  return typeof window !== "undefined";
}
function withError<T>(res: IRes<T>) {
  const isClient = typeof window !== "undefined";
  if (isClient) {
    toast(res?.message || "服务器错误");
  }

  return res;
}
function withHeader(h: any) {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      h["Authorization"] = `${accessToken}`;
    }
  } else {
  }
}
export class Request {
  // private baseURL;
  constructor(private baseURL: string) {
    this.baseURL = baseURL;
  }

  get<T>(url: string, params: any) {
    const paramsData = new URLSearchParams();
    Object.keys(params).map((item) => {
      paramsData.append(item, params[item]);
    });
    let h = {};
    withHeader(h);

    return fetch(`${this.baseURL}${url}?${paramsData.toString()}`, {
      method: "GET",
      next: {
        revalidate: 10
      },
      headers: {
        ...h
      }
    })
      .then((res) => {
        return res.json() as Promise<IRes<T>>;
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
        // e?.message && toast(e?.message);
      });
  }
  post<T>(url: string, data: any) {
    let h = {};
    withHeader(h);
    // const formData = new FormData();
    // if (data || {}) {
    //   Object.keys(data).map((item) => {
    //     formData.append(item, data[item]);
    //   });
    // }
    return fetch(`${this.baseURL}${url}`, {
      method: "POST",
      body: JSON.stringify(data),

      next: {
        revalidate: 1
      },
      headers: {
        // "content-type": "application/json; charset=utf-8",
        ...h
      }
    })
      .then((res) => {
        return res.json() as Promise<IRes<T>>;
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
      });
  }
  put<T>(url: string, data: any) {
    let h = {};
    withHeader(h);

    return fetch(`${this.baseURL}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      next: {
        revalidate: 1
      },
      headers: {
        ...h
      }
    })
      .then((res) => {
        return res.json() as Promise<IRes<T>>;
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
        toast?.(e.message);
      });
  }
  delete<T>(url: string, data: any) {
    let h = {};
    withHeader(h);

    return fetch(`${this.baseURL}${url}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      next: {
        revalidate: 1
      },
      headers: {
        ...h
      }
    })
      .then((res) => {
        return res.json() as Promise<IRes<T>>;
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {});
  }
  postData<T>(url: string, formData: any) {
    let h = {};
    withHeader(h);

    return fetch(`${this.baseURL}${url}`, {
      method: "POST",
      body: formData,
      next: {
        revalidate: 1
      },
      headers: {
        ...h
      }
    })
      .then((res) => {
        return res.json() as Promise<IRes<T>>;
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
      });
  }
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export { BASE_URL };
const request = new Request(BASE_URL);
export default request;
