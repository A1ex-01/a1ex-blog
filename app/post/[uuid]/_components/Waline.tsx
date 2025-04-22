"use client";
import { init } from "@waline/client";
import * as React from "react";

interface WalineProps {}

export default function Waline(props: WalineProps) {
  React.useEffect(() => {
    init({
      el: "#waline",
      serverURL: "https://waline-nu-self.vercel.app/",
      lang: "zh-CN"
    });
  }, []);
  return (
    <div className="comment">
      <div id="waline"></div>
    </div>
  );
}
