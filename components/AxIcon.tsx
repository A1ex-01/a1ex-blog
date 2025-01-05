"use client";
import { cn } from "@/lib/utils";
import { icons as entypoIcons, IconifyJSON } from "@iconify-json/entypo";
import { icons as lineMDIcons } from "@iconify-json/line-md";
import { icons as phIcons } from "@iconify-json/ph";
import { icons as tablerIcons } from "@iconify-json/tabler";

import { replaceIDs } from "@iconify/react";
import { getIconData, iconToHTML, iconToSVG } from "@iconify/utils";

interface AxIconProps {
  icon: string;
  size?: string | number;
  className?: string;
}

export default function AxIcon({ icon, size = 16, className }: AxIconProps) {
  const [brand, iconName] = icon.split(":");
  const brandIcons: Record<string, IconifyJSON> = {
    tabler: tablerIcons,
    entypo: entypoIcons,
    ph: phIcons,
    "line-md": lineMDIcons
  };
  if (!brandIcons[brand]) return;
  const iconData = getIconData(brandIcons[brand], iconName);
  if (!iconData) return;
  const renderData = iconToSVG(iconData, {
    height: size,
    width: size
  });
  const svgStr = iconToHTML(replaceIDs(renderData.body), {
    ...renderData.attributes,
    class: cn("!w-auto !h-auto", className)
  });
  return <div dangerouslySetInnerHTML={{ __html: svgStr }} />;
}
