import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el);
        setIsPointer(style.cursor === "pointer");
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 4, y: pos.y - 4, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.5 }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        animate={{
          x: pos.x - (isPointer ? 20 : 16),
          y: pos.y - (isPointer ? 20 : 16),
          opacity: visible ? 0.6 : 0,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.8 }}
      >
        <div
          className={`rounded-full border border-cyan-400 transition-all duration-200 ${isPointer ? "h-10 w-10" : "h-8 w-8"}`}
          style={{ boxShadow: "0 0 8px rgba(0,240,255,0.4)" }}
        />
      </motion.div>
    </>
  );
}
