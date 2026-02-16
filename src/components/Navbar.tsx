"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Bitcoin, Menu, Sun, Moon, Gamepad2, Languages, 
  User, LogOut, LayoutDashboard 
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  
  const [mounted, setMounted] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  // Hydration fix & User check (wird bei jedem Pfadwechsel ausgeführt)
  React.useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    router.push("/");
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(nextLang);
  };

  const isActive = (path: string) => 
    pathname === path 
      ? "text-orange-500 font-semibold" 
      : "text-neutral-600 dark:text-neutral-400 hover:text-orange-500 transition-colors";

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
            <Link href="/dashboard" className={isActive("/dashboard")}>
              {t('nav_dashboard')}
            </Link>
            <Link href="/ai-analysis" className={isActive("/ai-analysis")}>
              {t('nav_analysis')}
            </Link>
            <Link href="/pricing" className={isActive("/pricing")}>
              {t('nav_pricing')}
            </Link>
            <Link href="/about" className={isActive("/about")}>
              {t('nav_about')}
            </Link>
        </div>

        {/* --- RECHTS: ACTIONS --- */}
        <div className="flex items-center gap-2">
            
            {/* 1. Language Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1"
              >
                <Languages className="h-4 w-4" />
                <span className="text-xs font-bold">{i18n.language.toUpperCase()}</span>
              </Button>
            )}

            {/* 2. Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {/* 3. Play/Snake (Immer sichtbar, zeigt aktiven Status) */}
            <Link 
              href="/snake" 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                isActive("/snake") 
                  ? "bg-neutral-100 dark:bg-neutral-800 text-orange-500 font-medium" 
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span className="hidden lg:inline text-xs font-bold uppercase">{t('play')}</span>
            </Link>

            <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800 mx-1 hidden md:block" />

            {/* 4. DYNAMISCHER AUTH-BEREICH */}
            {mounted && (
              user ? (
                /* EINGELOGGT: User Profil Badge */
                <div className="flex items-center gap-2 ml-2">
                  <div className="flex flex-col items-end hidden lg:flex mr-1">
                    <span className="text-xs font-bold dark:text-white leading-none">{user.name}</span>
                    <span className="text-[9px] text-orange-500 font-bold uppercase tracking-tighter">{user.role}</span>
                  </div>
                  
                  <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-full p-1 border border-neutral-200 dark:border-neutral-800">
                    <div className="h-7 w-7 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                    
                    <Link href="/dashboard" className="p-1.5 text-neutral-500 hover:text-orange-500 transition-colors" title="Dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="p-1.5 text-neutral-500 hover:text-red-500 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* NICHT EINGELOGGT: Standard Buttons */
                <div className="flex items-center gap-2">
                  <Link href="/login" className="hidden md:block">
                      <Button variant="ghost" size="sm" className="text-neutral-600 dark:text-neutral-400">
                          {t('login')}
                      </Button>
                  </Link>
                  
                  <Link href="/register">
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20">
                          {t('get_started')}
                      </Button>
                  </Link>
                </div>
              )
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden ml-1">
                 <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                 </Button>
            </div>
        </div>
      </div>
    </nav>
  );
}