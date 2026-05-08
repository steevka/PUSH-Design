"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
import type { Work } from "@/lib/works";

interface WorkCursorPreviewProps {
  work: Work | null;
  enabled: boolean;
}

export function WorkCursorPreview({ work, enabled }: WorkCursorPreviewProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const vx = useMotionValue(0);

  const xs = useSpring(x, { damping: 22, stiffness: 180, mass: 0.6 });
  const ys = useSpring(y, { damping: 22, stiffness: 180, mass: 0.6 });
  const tilt = useTransform(vx, [-30, 30], [-6, 6]);
  const rotate = useSpring(tilt, { damping: 18, stiffness: 220 });

  useEffect(() => {
    let lastX = 0;
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      vx.set(e.clientX - lastX);
      lastX = e.clientX;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y, vx]);

  return (
    <AnimatePresence mode="wait">
      {enabled && work ? (
        <motion.div
          key={work.slug}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
          style={{
            x: xs,
            y: ys,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.div
            className="grain relative aspect-[1503/922] w-[380px] overflow-hidden bg-bg-elev shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{ rotate }}
          >
            <Image
              src={work.image}
              alt=""
              fill
              sizes="380px"
              className="object-contain"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fg">
              <span>{work.client}</span>
              <span className="text-accent">View →</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
