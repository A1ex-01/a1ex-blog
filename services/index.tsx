import { STATUSCODE } from "@/config/global";
import { ILocale } from "@/config/lng";
// import * as Sentry from "@sentry/nextjs";
import toast from "react-hot-toast";

export function isClient() {
  return typeof window !== "undefined";
}
function withError(res: Response) {
  // Sentry.captureException(res);
  if (res.status === 500) {
    isClient() && res?.message && toast(res.statusText);
  }

  if (res?.code === 4012) {
    //
    if (isClient()) {
      localStorage.removeItem("accessToken");
      res?.message &&
        toast(res?.message || "", {
          type: "error"
        });
    }
  }
  if (res?.code === 5002) {
    //
    if (typeof window !== "undefined") {
      res?.message &&
        toast(res?.message || "", {
          type: "error"
        });
    }
  }
  if (res?.code === STATUSCODE.NOLIMIT) {
    if (typeof window !== "undefined") {
      res?.message &&
        toast(res?.message || "", {
          type: "error"
        });
    }
  }
  return res;
}
function withHeader(h, lng?: ILocale) {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      h["Authorization"] = `${accessToken}`;
    }
  } else {
  }
}
export class Request {
  static lng = "";
  // private baseURL;
  constructor(private baseURL: string) {
    this.baseURL = baseURL;
  }
  static setLng(lng: ILocale) {
    if (Request.lng !== lng) {
      Request.lng = lng;
    }
  }
  get(url: string, params: any, lng?: ILocale) {
    const paramsData = new URLSearchParams();
    Object.keys(params).map((item) => {
      paramsData.append(item, params[item]);
    });
    let h = {};
    withHeader(h, lng);

    return fetch(`${this.baseURL}${url}?${paramsData.toString()}`, {
      method: "GET",
      next: {
        revalidate: 10
      },
      headers: {
        ...h,
        n2language: Request.lng
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
        // e?.message && toast(e?.message);
      });
  }
  post(url: string, data: any, lng?: ILocale) {
    let h = {};
    withHeader(h, lng);
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
        ...h,
        n2language: Request.lng
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
        e.message && toast(e.message);
      });
  }
  put(url: string, data: any, lng?: ILocale) {
    let h = {};
    withHeader(h, lng);

    return fetch(`${this.baseURL}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      next: {
        revalidate: 1
      },
      headers: {
        ...h,
        n2language: Request.lng
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
        toast?.(e.message);
      });
  }
  delete(url: string, data: any, lng?: ILocale) {
    let h = {};
    withHeader(h, lng);

    return fetch(`${this.baseURL}${url}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      next: {
        revalidate: 1
      },
      headers: {
        ...h,
        n2language: Request.lng
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
        toast?.(e.message);
      });
  }
  postData(url: string, formData: any, lng?: ILocale) {
    let h = {};
    withHeader(h, lng);

    return fetch(`${this.baseURL}${url}`, {
      method: "POST",
      body: formData,
      next: {
        revalidate: 1
      },
      headers: {
        ...h,
        n2language: Request.lng
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return withError(res);
      })
      .catch((e) => {
        console.log(e, "---");
        toast?.(e.message);
      });
  }
}
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export { BASE_URL };
const request = new Request(BASE_URL);
export default request;
