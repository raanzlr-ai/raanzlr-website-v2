import React from "react";
import { motion } from "framer-motion";

interface HeartbeatProps {
  className?: string;
}

const PATH =
  "M0,20 L40,20 L55,5 L65,35 L75,10 L85,30 L95,20 L160,20";

export default function Heartbeat({ className = "" }: HeartbeatProps) {
  return (
    <svg
      viewBox="0 0 160 40"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hb-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#00F0FF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#00F0FF" stopOpacity="1" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={PATH}
        fill="none"
        stroke="url(#hb-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
      />
    </svg>
  );
}
