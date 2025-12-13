import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50 p-4">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-slate-900">
          Whale Activity Index <br />
          <span className="text-blue-600">Monitoring & Analytics</span>
        </h1>
        
        <p className="text-lg text-slate-600 mx-auto max-w-2xl">
          Willkommen beim WAI Projekt. Wir analysieren und visualisieren Wal-Bewegungen 
          in Echtzeit, um Forschern und Naturschützern wertvolle Daten zu liefern.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg">
              Statistiken ansehen <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://github.com" target="_blank">
             <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
              Dokumentation
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Grid (Optional, sieht aber gut aus) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl text-center">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <Globe className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Globale Daten</h3>
          <p className="text-slate-500">Erfassung von Wal-Sichtungen aus verschiedenen Ozeanen.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <BarChart3 className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Live Analyse</h3>
          <p className="text-slate-500">Echtzeit-Berechnung des Activity Scores für schnelle Einblicke.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <ArrowRight className="h-10 w-10 text-blue-500 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Historie</h3>
          <p className="text-slate-500">Lückenlose Aufzeichnung aller Bewegungen der letzten Jahre.</p>
        </div>
      </div>

    </main>
  );
}