"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Bitcoin, Menu, Sun, Moon, Gamepad2, Languages, 
  User, LogOut 
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
    // Hier auf "currentUser" geändert, passend zur Login-Logik
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
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
              AI-Analysis
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
            
            <Link href="/snake">
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-500 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-500"
                title="Play Snake"
              >
                <Gamepad2 className="h-5 w-5" />
              </Button>
            </Link>

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

            {/* 3. Login / User Profil Toggle */}
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <div className="hidden md:flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/50 py-1.5 px-3 rounded-full border border-neutral-200 dark:border-neutral-700">
                  <div className="h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center overflow-hidden">
                    <User className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    {user.name?.split(' ')[0] || "User"}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout} 
                  title="Logout" 
                  className="text-neutral-500 hover:text-red-500 dark:hover:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden md:block">
                    <Button variant="ghost" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                        {t('login')}
                    </Button>
                </Link>
                
                <Link href="/register">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20">
                        {t('get_started')}
                    </Button>
                </Link>
              </>
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