import LogoImg from "@/assets/img/logo.png";
import Image, { ImageProps } from "next/image";
import * as React from "react";
export const LogoIcon: React.FC<Partial<ImageProps>> = ({ width = 16, height = 16, ...props }) => (
  <Image src={LogoImg} width={width} height={height} alt="logo" {...props} />
);
