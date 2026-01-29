import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, Zap, BarChart3 } from "lucide-react"; 
// Hinweis: Bitcoin Icon brauchen wir hier nicht mehr, ist jetzt in der Navbar

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* --- HIER WURDE DER HEADER GELÖSCHT (kommt jetzt aus layout.tsx) --- */}

      <main className="flex-1">
        
        {/* --- HERO SECTION --- */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-800 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2"></span>
              v2.0 Algorithmus jetzt live
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Verstehe, was die <span className="text-orange-500">Bitcoin Wale</span> wirklich vorhaben.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Der Whale Activity Index (WAI) analysiert On-Chain Daten in Echtzeit. 
              Erkenne Akkumulation und Distribution, bevor der Markt reagiert.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                 <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 text-base w-full sm:w-auto">
                   Kostenlos starten
                 </Button>
              </Link>
              <Link href="/dashboard">
                 <Button size="lg" variant="outline" className="px-8 h-12 text-base w-full sm:w-auto">
                   Live Demo ansehen
                 </Button>
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-slate-400">
              Analysiert täglich über $5 Mrd. Transaktionsvolumen.
            </p>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section id="features" className="py-20 bg-slate-50 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Professionelle On-Chain Matrix</h2>
              <p className="text-slate-500">
                Wir kombinieren Lautstärke (Activity) mit Richtung (Intent) für präzise Markt-Signale.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">WAI Index</h3>
                <p className="text-slate-500 leading-relaxed">
                  Unser Kern-Algorithmus misst die reine Aktivität der größten Wallets. Ein Sentiment-Indikator (0-100) für Marktvolatilität.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Intent & Flows</h3>
                <p className="text-slate-500 leading-relaxed">
                  Wohin fließt das Geld? Wir tracken Exchange Inflows (Verkaufsdruck) und Outflows (Akkumulation) in Echtzeit.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Live Signale</h3>
                <p className="text-slate-500 leading-relaxed">
                  Erhalte klare "Accumulation" oder "Distribution" Signale basierend auf unserer neuen Matrix-Logik.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* --- CTA SECTION --- */}
        <section className="py-20 bg-slate-900 text-white">
           <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold mb-6">Bereit für professionelle Daten?</h2>
             <p className="text-slate-300 mb-8 max-w-xl mx-auto">
               Schließe dich hunderten Tradern an, die nicht mehr raten, sondern auf On-Chain Fakten setzen.
             </p>
             <Link href="/register">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-10 h-14 text-lg">
                  Jetzt Account erstellen
                </Button>
             </Link>
           </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             {/* Kleiner Hack: Wir nutzen hier einfach Text, oder du importierst das Icon nochmal */}
             <span className="font-bold text-orange-500">₿</span>
             <span className="font-semibold text-slate-700">WAI Project</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-900">Datenschutz</Link>
            <Link href="#" className="hover:text-slate-900">Impressum</Link>
          </div>
          <div className="mt-4 md:mt-0">
            &copy; 2026 WAI Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}