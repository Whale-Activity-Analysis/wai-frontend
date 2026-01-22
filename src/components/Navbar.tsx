"use client";

import Link from "next/link";
import { Bitcoin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
             <Bitcoin className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">WAI Project</span>
        </Link>

        {/* NAVIGATION MITTE (Versteckt auf Handy) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {/* Wir nutzen /# damit es auch vom Dashboard aus zurück zur Startseite springt */}
          <Link href="/#features" className="hover:text-orange-500 transition-colors">Features</Link>
          <Link href="/#pricing" className="hover:text-orange-500 transition-colors">Preise</Link>
          <Link href="/#about" className="hover:text-orange-500 transition-colors">Über uns</Link>
        </nav>

        {/* RECHTE SEITE: LOGIN / DASHBOARD */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">
            Login
          </Link>
          <Link href="/dashboard">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              Zum Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}