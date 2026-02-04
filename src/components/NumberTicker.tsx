"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Eine einzelne Ziffernsäule (0-9)
function DigitColumn({ digit, className }: { digit: number; className?: string }) {
  return (
    <div className={cn("relative inline-block overflow-hidden", className)}>
      {/* TRICK: Eine unsichtbare "0", die den Platz reserviert.
        So passt sich die Box automatisch an die Schriftgröße an.
        Kein Raten von '1em' oder '0.6em' mehr.
      */}
      <span className="invisible">0</span>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: `${-1 * digit * 10}%` }} // Wir schieben pro Ziffer um 10% (da wir 10 Ziffern haben)
        transition={{ 
          type: "spring", 
          stiffness: 80,
          damping: 15,
          mass: 0.8 
        }}
        className="absolute top-0 left-0 right-0 flex flex-col items-center"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="flex justify-center items-center h-full">
            {/* WICHTIG: Die Höhe jeder Zahl muss exakt 100% des Containers sein, 
               den die unsichtbare '0' aufspannt.
               Wir nutzen einen Span, damit Line-Height greift.
            */}
             <span>{i}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

type Props = {
  value: number;
  className?: string;
  prefix?: string;
  decimals?: number;
};

export default function NumberTicker({
  value,
  className,
  prefix = "",
  decimals = 2,
}: Props) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const numberString = formatNumber(value);
  const characters = numberString.split("");

  return (
    // 'whitespace-nowrap' verhindert Umbrüche
    <div className={cn("inline-flex items-center whitespace-nowrap", className)}>
      {prefix && <span className="mr-1">{prefix}</span>}
      
      {characters.map((char, index) => {
        const isDigit = !isNaN(parseInt(char));

        if (isDigit) {
          return (
            <DigitColumn 
              key={`${index}-${char}`}
              digit={parseInt(char)} 
              // Wir geben KEINE size-classes weiter, das macht der Container selbst
            />
          );
        }

        // Kommas, Punkte
        return (
          <span key={index} className="opacity-70 mx-[1px]">
            {char}
          </span>
        );
      })}
    </div>
  );
}