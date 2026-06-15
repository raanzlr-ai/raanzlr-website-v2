import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "ghost";
  testId?: string;
  className?: string;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = "default",
  testId,
  className = "",
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const isGhost = variant === "ghost";

  const baseClass = isGhost
    ? `inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:border-white/40 transition-colors ${className}`
    : `inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-bold text-[#050505] shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:shadow-[0_0_36px_rgba(0,240,255,0.55)] transition-shadow ${className}`;

  const MotionSpan = motion.span as any;

  if (to) {
    return (
      <Link to={to} data-testid={testId} style={{ display: "inline-block" }}>
        <MotionSpan
          ref={ref}
          style={{ x: sx, y: sy }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className={baseClass}
        >
          {children}
        </MotionSpan>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-testid={testId} style={{ display: "inline-block" }}>
        <MotionSpan
          ref={ref}
          style={{ x: sx, y: sy }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className={baseClass}
        >
          {children}
        </MotionSpan>
      </a>
    );
  }

  return (
    <motion.button
      ref={ref as any}
      type={type}
      onClick={onClick}
      data-testid={testId}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={baseClass}
    >
      {children}
    </motion.button>
  );
}
