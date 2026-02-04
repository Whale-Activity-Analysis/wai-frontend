"use client";

import * as React from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bitcoin, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // Wichtig für Theme-Switch: Verhindert Hydration-Fehler
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path ? "text-orange-500 font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-orange-500 transition-colors";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center space-x-2">
            <div className="p-1.5 bg-orange-100 dark:bg-orange-500/10 rounded-lg">
                <Bitcoin className="h-5 w-5 text-orange-600 dark:text-orange-500" />
            </div>
            <span className="font-bold text-lg text-neutral-900 dark:text-white tracking-tight">
              WAI Project
            </span>
        </Link>

        {/* --- DESKTOP NAVI --- */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
            <Link href="/ai-analysis" className={isActive("/analysis")}>AI Analyse</Link>
            <Link href="/pricing" className={isActive("/pricing")}>Preise</Link>
            <Link href="/about" className={isActive("/about")}>Über uns</Link>
        </div>

        {/* --- RECHTS: ACTIONS --- */}
        <div className="flex items-center gap-2">
            
            {/* 1. Theme Toggle (Nur anzeigen wenn Client gemountet ist) */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white mr-2"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 transition-all" />
                ) : (
                  <Moon className="h-5 w-5 transition-all" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}

            {/* 2. Login & Register */}
            <Link href="/login" className="hidden md:block">
                <Button variant="ghost" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                    Login
                </Button>
            </Link>
            
            <Link href="/register">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20">
                    Get Started
                </Button>
            </Link>

            {/* Mobile Menu Toggle (Platzhalter) */}
            <div className="md:hidden ml-2">
                 <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                 </Button>
            </div>
        </div>
      </div>
    </nav>
  );
}