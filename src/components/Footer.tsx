"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next"; // Lokalisierung importiert

export default function Footer() {
  const { t } = useTranslation(); // Hook initialisiert

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 py-12 transition-colors duration-300 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-neutral-500 dark:text-neutral-400 text-sm">
        
        {/* Logo Bereich */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-bold text-orange-500">₿</span>
            <span className="font-semibold text-neutral-700 dark:text-neutral-200">WAI Project</span>
        </div>
        
        {/* Links */}
        <div className="flex gap-6 flex-wrap justify-center">
          <Link href="/dataprotection" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {String(t('privacy_policy_title', 'Datenschutz'))}
          </Link>
          <Link href="/imprint" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {String(t('imprint_title', 'Impressum'))}
          </Link>
          <Link href="/pricing" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {String(t('nav_pricing', 'Preise'))}
          </Link>
          <Link 
            href="https://github.com/Whale-Activity-Analysis/wai-frontend" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Github
          </Link>
        </div>
        
        {/* Copyright */}
        <div className="mt-4 md:mt-0">
          &copy; 2026 WAI Project. {String(t('footer_rights', 'All rights reserved.'))}
        </div>
      </div>
    </footer>
  );
}