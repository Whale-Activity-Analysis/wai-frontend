import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp, Zap, BarChart3, ArrowRight } from "lucide-react"; 
import FadeIn from "@/components/FadeIn"; // <--- Importieren

export default function LandingPage() {
  return (
    // Hintergrund: Neutral statt Slate
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* HEADER kommt aus layout.tsx */}

      <main className="flex-1">
        
        {/* --- HERO SECTION --- */}
        <section className="py-20 md:py-32 bg-white dark:bg-neutral-950 transition-colors duration-300 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            
            {/* 1. Badge (Startet sofort) */}
            <FadeIn delay={0.1}>
                <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-800 dark:text-orange-400 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2"></span>
                v2.0 Algorithmus jetzt live
                </div>
            </FadeIn>
            
            {/* 2. Headline (0.1s später) */}
            <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
                Verstehe, was die <span className="text-orange-500">Bitcoin Wale</span> wirklich vorhaben.
                </h1>
            </FadeIn>
            
            {/* 3. Subtext (0.2s später) */}
            <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Der Whale Activity Index (WAI) analysiert On-Chain Daten in Echtzeit. 
                Erkenne Akkumulation und Distribution, bevor der Markt reagiert.
                </p>
            </FadeIn>
            
            {/* 4. Buttons (0.3s später) */}
            <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 text-base w-full sm:w-auto">
                        Kostenlos starten
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="px-8 h-12 text-base w-full sm:w-auto border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        Live Demo ansehen
                    </Button>
                </Link>
                </div>
            </FadeIn>
            
            {/* 5. Footer Text (0.4s später) */}
            <FadeIn delay={0.5}>
                <p className="mt-8 text-sm text-neutral-400 dark:text-neutral-500">
                Analysiert täglich über $5 Mrd. Transaktionsvolumen.
                </p>
            </FadeIn>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section id="features" className="py-20 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            
            <FadeIn>
                <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Professionelle On-Chain Matrix</h2>
                <p className="text-neutral-500 dark:text-neutral-400">
                    Wir kombinieren Lautstärke (Activity) mit Richtung (Intent) für präzise Markt-Signale.
                </p>
                </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 - Delay 0.2 */}
              <FadeIn delay={0.2} className="h-full">
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all h-full">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">WAI Index</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Unser Kern-Algorithmus misst die reine Aktivität der größten Wallets. Ein Sentiment-Indikator (0-100) für Marktvolatilität.
                    </p>
                </div>
              </FadeIn>

              {/* Feature 2 - Delay 0.4 */}
              <FadeIn delay={0.4} className="h-full">
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all h-full">
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Intent & Flows</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Wohin fließt das Geld? Wir tracken Exchange Inflows (Verkaufsdruck) und Outflows (Akkumulation) in Echtzeit.
                    </p>
                </div>
              </FadeIn>

              {/* Feature 3 - Delay 0.6 */}
              <FadeIn delay={0.6} className="h-full">
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all h-full">
                    <div className="h-12 w-12 bg-purple-100 dark:bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Live Signale</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Erhalte klare "Accumulation" oder "Distribution" Signale basierend auf unserer neuen Matrix-Logik.
                    </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* --- CTA SECTION --- */}
        <section className="py-20 bg-neutral-900 dark:bg-neutral-900 text-white border-t border-transparent dark:border-neutral-800">
           <FadeIn direction="up">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Bereit für professionelle Daten?</h2>
                <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
                Schließe dich hunderten Tradern an, die nicht mehr raten, sondern auf On-Chain Fakten setzen.
                </p>
                <Link href="/register">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-10 h-14 text-lg border-none">
                    Jetzt Account erstellen <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
           </FadeIn>
        </section>

      </main>
      
      {/* Footer kommt jetzt global aus layout.tsx */}
    </div>
  );
}