import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; // <--- 1. IMPORTIEREN
import { ThemeProvider } from "@/components/Theme-Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whale Activity Index",
  description: "Dashboard für Wal-Aktivitäten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}> {/* flex-col + min-h-screen für Sticky Footer */}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <Navbar /> 
          
          {/* Der Hauptinhalt der Seite */}
          <div className="flex-1">
             {children}
          </div>

          {/* 2. HIER EINFÜGEN: Erscheint jetzt auf jeder Seite */}
          <Footer /> 
          
        </ThemeProvider>
      </body>
    </html>
  );
}