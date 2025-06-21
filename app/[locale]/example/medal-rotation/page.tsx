"use client";

import { motion } from "framer-motion";
import { Crown, Star, Trophy, Zap } from "lucide-react";
import { useState } from "react";

const medals = [
  {
    id: 1,
    name: "王者勋章",
    icon: Crown,
    color: "from-yellow-400 via-yellow-500 to-yellow-600",
    shadowColor: "shadow-yellow-500/50",
    glowColor: "shadow-yellow-400/30",
  },
  {
    id: 2,
    name: "传奇勋章",
    icon: Star,
    color: "from-purple-400 via-purple-500 to-purple-600",
    shadowColor: "shadow-purple-500/50",
    glowColor: "shadow-purple-400/30",
  },
  {
    id: 3,
    name: "胜利勋章",
    icon: Trophy,
    color: "from-blue-400 via-blue-500 to-blue-600",
    shadowColor: "shadow-blue-500/50",
    glowColor: "shadow-blue-400/30",
  },
  {
    id: 4,
    name: "闪电勋章",
    icon: Zap,
    color: "from-orange-400 via-orange-500 to-orange-600",
    shadowColor: "shadow-orange-500/50",
    glowColor: "shadow-orange-400/30",
  },
];

export default function MedalRotation() {
  const [selectedMedal, setSelectedMedal] = useState(medals[0]);
  const [isRotating, setIsRotating] = useState(false);

  const handleMedalClick = (medal: (typeof medals)[0]) => {
    if (medal.id !== selectedMedal.id) {
      setIsRotating(true);
      setTimeout(() => {
        setSelectedMedal(medal);
        setIsRotating(false);
      }, 300);
    }
  };

  const IconComponent = selectedMedal.icon;

  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="flex min-w-64 flex-col items-center space-y-8 text-center">
        {/* 主勋章 */}
        <div className="relative h-64 w-64">
          {/* 外层光环 */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${selectedMedal.color} opacity-20 blur-xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              width: "280px",
              height: "280px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* 勋章主体 */}
          <motion.div
            className={`relative h-64 w-64 rounded-full bg-gradient-to-br ${selectedMedal.color} ${selectedMedal.shadowColor} shadow-2xl ${selectedMedal.glowColor} shadow-lg`}
            animate={{
              rotateY: isRotating ? 180 : 0,
              scale: isRotating ? 0.4 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.05,
              rotateZ: 5,
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 内层装饰环 */}
            <div className="absolute inset-4 rounded-full border-4 border-white/30 bg-gradient-to-br from-white/20 to-transparent">
              {/* 中心图标区域 */}
              <div className="absolute inset-6 flex items-center justify-center rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <IconComponent className="h-16 w-16 text-white drop-shadow-lg" />
                </motion.div>
              </div>
            </div>

            {/* 装饰性光点 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-white"
                style={{
                  left: "50%",
                  top: "10px",
                  transformOrigin: "0 118px",
                }}
                animate={{
                  rotate: 360,
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    delay: i * 0.5,
                  },
                  opacity: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.25,
                  },
                }}
                initial={{
                  rotate: i * 45,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* 勋章名称 */}
        <motion.h2
          className="text-3xl font-bold text-white drop-shadow-lg"
          key={selectedMedal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedMedal.name}
        </motion.h2>

        {/* 勋章选择器 */}
        <div className="flex justify-center space-x-4">
          {medals.map((medal) => {
            const MedalIcon = medal.icon;
            return (
              <motion.button
                key={medal.id}
                onClick={() => handleMedalClick(medal)}
                className={`h-16 w-16 rounded-full bg-gradient-to-br ${medal.color} ${medal.shadowColor} flex items-center justify-center shadow-lg transition-all duration-300 ${
                  selectedMedal.id === medal.id
                    ? "scale-110 ring-4 ring-white/50"
                    : "opacity-70 hover:scale-105 hover:opacity-100"
                }`}
                whileHover={{
                  scale: selectedMedal.id === medal.id ? 1.1 : 1.05,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <MedalIcon className="h-8 w-8 text-white" />
              </motion.button>
            );
          })}
        </div>

        {/* 装饰性粒子效果 */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              suppressHydrationWarning
              className="absolute h-1 w-1 rounded-full bg-white opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
