import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- Importieren

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
      <body className={inter.className}>
        <Navbar /> {/* <-- Hier einfügen, über {children} */}
        {children}
      </body>
    </html>
  );
}