"use client";
import { useGlobalWrapperScroll } from "@/providers/GlobalWrapperScrollProvider";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ceil } from "lodash";
import { Progress } from "./ui/progress";

interface ScrollBallProps {}

export default function ScrollBall(props: ScrollBallProps) {
  const { scroll, progress } = useGlobalWrapperScroll();
  // if (typeof window === "undefined") return null;
  // const progress = (scroll?.top / (window.innerHeight - 65)) * 100;
  return (
    <AnimatePresence mode="wait">
      {progress > 0 && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 50 }}
          exit={{ opacity: 0, width: 0 }}
        >
          <Progress
            className={clsx("transition-all duration-100", progress <= 0 && "w-0 opacity-0")}
            value={ceil(progress, 0)}
            color="primary"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
