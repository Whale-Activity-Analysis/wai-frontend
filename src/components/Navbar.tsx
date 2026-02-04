"use client";

import Link from "next/link";
import { Bitcoin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle"; 

export default function Navbar() {
  return (
    // FIX: dark:bg-neutral-950/80 für echten Grau-Ton
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 dark:border-neutral-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
             <Bitcoin className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl text-neutral-900 dark:text-neutral-50 tracking-tight">
            WAI Project
          </span>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <Link href="/#features" className="hover:text-orange-500 transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-orange-500 transition-colors">Preise</Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors">Über uns</Link>
        </nav>

        {/* RECHTS */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hidden sm:block">
            Login
          </Link>
          <Link href="/dashboard">
            <Button className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-orange-500 dark:hover:bg-orange-600">
              Zum Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}