"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils"; // Falls du shadcn nutzt, sonst clsx importieren

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  fullWidth?: boolean;
};

export default function FadeIn({ 
  children, 
  className, 
  delay = 0, 
  direction = "up", 
  fullWidth = false 
}: Props) {
  
  // Konfiguration der Richtungen
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        filter: "blur(4px)" // Der "Blur-Effekt" für Modernität
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0, 
        filter: "blur(0px)" 
      }}
      viewport={{ once: true, margin: "-50px" }} // Feuert nur einmal beim Scrollen
      transition={{ 
        duration: 0.5, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={cn(fullWidth ? "w-full" : "", className)}
    >
      {children}
    </motion.div>
  );
}