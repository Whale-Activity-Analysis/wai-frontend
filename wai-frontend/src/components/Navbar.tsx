import Link from "next/link";
import { Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4 max-w-5xl mx-auto container">
        {/* Logo / Home Link */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900">
          <Waves className="h-6 w-6 text-blue-600" />
          <span>WAI Project</span>
        </Link>

        {/* Rechte Seite: Links */}
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Startseite
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Statistiken
          </Link>
          
          {/* Optional: Ein Call-to-Action Button */}
          <Link href="/dashboard">
            <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
              Zum Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}