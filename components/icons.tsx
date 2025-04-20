import Image, { ImageProps } from "next/image";
import * as React from "react";
export const LogoIcon: React.FC<Partial<ImageProps>> = ({ width = 16, height = 16, ...props }) => (
  <Image src={"/favicon.png"} width={width} height={height} alt="logo" {...props} />
);
