"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/i18n"; // Initialisierung der Lokalisierung
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <--- Import hinzugefügt
import { ThemeProvider } from "@/components/Theme-Provider";
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* flex-col und min-h-screen sorgen dafür, dass der Footer unten bleibt */}
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            
            {/* flex-1 dehnt den Inhalt aus, damit der Footer nach unten gedrückt wird */}
            <main className="flex-1">
              {children}
            </main>

            <Footer /> {/* <--- Footer hier eingebunden */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}