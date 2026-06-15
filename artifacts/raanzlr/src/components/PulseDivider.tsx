import React from "react";
import { motion } from "framer-motion";

export default function PulseDivider() {
  return (
    <div className="relative h-px mx-auto max-w-7xl px-6 lg:px-8 my-1">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      <motion.div
        className="absolute inset-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.9), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
    </div>
  );
}
