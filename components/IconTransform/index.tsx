"use client";
import { getIcon, Icon, IconifyIcon, loadIcons } from "@iconify/react";
import { interpolate } from "flubber";
import { animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
interface IconTransformProps<T> {
  startIconifyIcon: T;
  endIconifyIcon: T;
}
// 提取 d 属性的值
const extractPathD = (body: string) => {
  const match = body.match(/d="([^"]*)"/);
  return match ? match[1] : "";
};
export default function IconTransform({
  startIconifyIcon,
  endIconifyIcon
}: IconTransformProps<string>) {
  const [isStart, setIsStart] = useState(false);
  const [d, setD] = useState<string>();
  const [paths, setPaths] = useState<IconTransformProps<IconifyIcon>>();
  const getIconifyIcon = async () => {
    await loadIcons([startIconifyIcon, endIconifyIcon]);
    const startIconifyIconData = getIcon(startIconifyIcon)!;
    const endIconifyIconData = getIcon(endIconifyIcon)!;
    setPaths({
      startIconifyIcon: startIconifyIconData,
      endIconifyIcon: endIconifyIconData
    });
  };
  useEffect(() => {
    getIconifyIcon();
  }, [startIconifyIcon, endIconifyIcon]);
  function togglePath(isStart: boolean) {
    const currentShape = isStart ? paths!.startIconifyIcon : paths!.endIconifyIcon;
    const targetShape = isStart ? paths!.endIconifyIcon : paths!.startIconifyIcon;
    if (!currentShape || !targetShape) return;
    // Use interpolate to create the morphing path function
    const mixPaths = interpolate(extractPathD(currentShape.body), extractPathD(targetShape.body), {
      maxSegmentLength: 1.5
    });
    // Start the animation
    animate(0, 1, {
      duration: 0.5,
      ease: "easeInOut",
      onUpdate: (progress) => {
        setD(mixPaths(progress));
        // path.setAttribute("fill", targetShape.color);
      }
    });
  }
  useEffect(() => {
    if (paths) {
      togglePath(isStart);
    }
  }, [isStart, paths]);
  return (
    <div className="text-center">
      {paths && (
        <svg width="200" height="200" viewBox="0 0 24 24">
          <path fill="#008c8c" d={d}></path>
        </svg>
      )}
      <Button onClick={() => setIsStart((pre) => !pre)}>
        <Icon icon={"tabler:play"} />
      </Button>
    </div>
  );
}
