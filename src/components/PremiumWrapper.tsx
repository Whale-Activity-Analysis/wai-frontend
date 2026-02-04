"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumWrapperProps {
  children: React.ReactNode;
  isPremium: boolean;
  featureName: string;
}

export default function PremiumWrapper({ children, isPremium, featureName }: PremiumWrapperProps) {
  if (isPremium) return <>{children}</>;

  return (
    <div className="relative group h-full w-full overflow-hidden">
      {/* Background Blur */}
      <div className="blur-sm pointer-events-none select-none opacity-40 h-full">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        
        {/* FIX: Box Hintergrund auf neutral-950 (fast schwarz) im Dark Mode */}
        <div className="bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800 max-w-[90%] text-center">
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-neutral-800 dark:text-neutral-100">{featureName}</span>
          </div>
          
          <Button size="sm" className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-orange-500 dark:hover:bg-orange-600 text-white h-8 text-xs px-6">
            Upgrade
          </Button>
        </div>

      </div>
    </div>
  );
}