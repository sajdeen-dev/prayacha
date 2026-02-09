"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
}

export const Timeline = ({
  data,

}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateHeight = () => {
      const rect = el.getBoundingClientRect();
      setHeight(rect.height);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const heightTransform = useTransform(scrollYProgress, (v) => v * height);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full  font-sans "
      ref={containerRef}
    >


      <div ref={ref} className="relative max-w-full mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div style={{ background: "linear-gradient(to top, #a855f7 0%, #6366f1 35%, #3b82f6 100%, transparent 100%)" }} className="h-10 absolute left-3 md:left-3 w-10 rounded-full  flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white border border-neutral-300 p-2" />
              </div>
              <h3 className="hidden  md:block text-[44px] md:pl-20 md:text-[44px] font-semibold text-[#3E3EE3]">
                {item.title}
              </h3>
            </div>
            <div className="relative mt-4  text-[#000000] font-sans font-semibold text-[24px] leading-relaxed">
              {item.content}{" "}
            </div>

          </div>
        ))}
        <div
          style={{
            height: Math.max(height, 1) + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background: "linear-gradient(to top, #a855f7 0%, #6366f1 35%, #3b82f6 70%, transparent 100%)",
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
