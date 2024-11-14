"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { interpolate } from "flubber";
import { animate } from "framer-motion";
import { useEffect, useState } from "react";
interface SvgTransformProps {}

const paths = {
  star: {
    color: "#fff312",
    d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
  },
  heart: {
    color: "#ff0088",
    d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  }
};

export default function SvgTransform(props: SvgTransformProps) {
  const [isStar, setIsStar] = useState(false);
  function togglePath(isStar: boolean) {
    const path = document.querySelector("#icon path");
    const currentShape = isStar ? paths.star : paths.heart;
    const targetShape = isStar ? paths.heart : paths.star;
    // Use interpolate to create the morphing path function
    const mixPaths = interpolate(currentShape.d, targetShape.d, {
      maxSegmentLength: 1.5
    });
    // Start the animation
    animate(0, 1, {
      duration: 0.5,
      ease: "easeInOut",
      onUpdate: (progress) => {
        path.setAttribute("d", mixPaths(progress));
        path.setAttribute("fill", targetShape.color);
      }
    });
  }
  useEffect(() => {
    togglePath(isStar);
  }, [isStar]);
  return (
    <div>
      <h1>svg 过度变换</h1>

      <main
        style={{
          fontSize: 100
        }}
      >
        <svg id="icon" width="300" height="300" viewBox="0 0 400 400">
          <g transform="scale(5)">
            <path />
          </g>
        </svg>
        <Button
          onClick={() => setIsStar((pre) => !pre)}
          isIconOnly
          startContent={<Icon icon={"tabler:play"} />}
        />
      </main>
    </div>
  );
}
