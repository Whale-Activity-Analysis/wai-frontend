"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next"; // Lokalisierung importiert
import { Button } from "@/components/ui/button";
import { TrendingUp, Zap, BarChart3, ArrowRight } from "lucide-react"; 
import FadeIn from "@/components/FadeIn";

export default function LandingPage() {
  const { t } = useTranslation(); // Hook initialisiert

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      <main className="flex-1">
        
        {/* --- HERO SECTION --- */}
        <section className="py-20 md:py-32 bg-white dark:bg-neutral-950 transition-colors duration-300 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            
            {/* 1. Badge */}
            <FadeIn delay={0.1}>
                <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-800 dark:text-orange-400 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2"></span>
                {String(t('hero_badge', 'v2.0 Algorithmus jetzt live'))}
                </div>
            </FadeIn>
            
            {/* 2. Headline */}
            <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
                {String(t('hero_title_part1', 'Verstehe, was die'))} <span className="text-orange-500">{String(t('hero_title_highlight', 'Bitcoin Wale'))}</span> {String(t('hero_title_part2', 'wirklich vorhaben.'))}
                </h1>
            </FadeIn>
            
            {/* 3. Subtext */}
            <FadeIn delay={0.3}>
                <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {String(t('hero_subtitle', 'Der Whale Activity Index (WAI) analysiert On-Chain Daten in Echtzeit. Erkenne Akkumulation und Distribution, bevor der Markt reagiert.'))}
                </p>
            </FadeIn>
            
            {/* 4. Buttons */}
            <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 text-base w-full sm:w-auto">
                        {String(t('get_started', 'Kostenlos starten'))}
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="px-8 h-12 text-base w-full sm:w-auto border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        {String(t('view_demo', 'Live Demo ansehen'))}
                    </Button>
                </Link>
                </div>
            </FadeIn>
            
            {/* 5. Footer Text */}
            <FadeIn delay={0.5}>
                <p className="mt-8 text-sm text-neutral-400 dark:text-neutral-500">
                {String(t('hero_footer_stats', 'Analysiert täglich über $5 Mrd. Transaktionsvolumen.'))}
                </p>
            </FadeIn>
          </div>
        </section>

        {/* --- FEATURES SECTION WITH LEFT TIMELINE --- */}
<section id="features" className="py-24 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
  <div className="container mx-auto px-4">
    
    <FadeIn>
      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          {String(t('features_title', 'Professionelle On-Chain Matrix'))}
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg">
          {String(t('features_subtitle', 'Drei Schritte zur präzisen Markt-Analyse.'))}
        </p>
      </div>
    </FadeIn>

    {/* Timeline Container */}
    <div className="relative max-w-4xl mx-auto pl-8 md:pl-12">
      
      {/* Der vertikale Zeitstrahl auf der linken Seite */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">
        {/* Mitlaufender oranger Balken (optional mit Framer Motion scaleY) */}
        <div className="absolute top-0 left-0 w-full bg-orange-500 rounded-full h-full origin-top transition-transform duration-700" />
      </div>

      <div className="space-y-24">
        
        {/* Feature 1 */}
        <div className="relative">
          {/* Beweglicher Kreis / Pointer */}
          <div className="absolute -left-[37px] md:-left-[53px] top-8 w-6 h-6 bg-orange-500 rounded-full border-4 border-white dark:border-neutral-950 shadow-[0_0_15px_rgba(249,115,22,0.6)] z-20" />
          
          <FadeIn direction="right" delay={0.1}>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {String(t('feature_1_title', 'WAI Index'))}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {String(t('feature_1_desc', 'Unser Kern-Algorithmus misst die reine Aktivität der größten Wallets. Ein Sentiment-Indikator (0-100) für Marktvolatilität.'))}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Feature 2 */}
        <div className="relative">
          <div className="absolute -left-[37px] md:-left-[53px] top-8 w-6 h-6 bg-orange-500 rounded-full border-4 border-white dark:border-neutral-950 shadow-[0_0_15px_rgba(249,115,22,0.6)] z-20" />
          
          <FadeIn direction="right" delay={0.2}>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {String(t('feature_2_title', 'Intent & Flows'))}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {String(t('feature_2_desc', 'Wohin fließt das Geld? Wir tracken Exchange Inflows (Verkaufsdruck) und Outflows (Akkumulation) in Echtzeit.'))}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Feature 3 */}
        <div className="relative">
          <div className="absolute -left-[37px] md:-left-[53px] top-8 w-6 h-6 bg-orange-500 rounded-full border-4 border-white dark:border-neutral-950 shadow-[0_0_15px_rgba(249,115,22,0.6)] z-20" />
          
          <FadeIn direction="right" delay={0.3}>
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {String(t('feature_3_title', 'Live Signale'))}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {String(t('feature_3_desc', 'Erhalte klare "Accumulation" oder "Distribution" Signale basierend auf unserer neuen Matrix-Logik.'))}
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </div>
  </div>
</section>
        
        {/* --- CTA SECTION --- */}
        <section className="py-20 bg-neutral-900 dark:bg-neutral-900 text-white border-t border-transparent dark:border-neutral-800">
           <FadeIn direction="up">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6 text-white">
                    {String(t('cta_title', 'Bereit für professionelle Daten?'))}
                </h2>
                <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
                    {String(t('cta_subtitle', 'Schließe dich hunderten Tradern an, die nicht mehr raten, sondern auf On-Chain Fakten setzen.'))}
                </p>
                <Link href="/register">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-10 h-14 text-lg border-none">
                        {String(t('cta_button', 'Jetzt Account erstellen'))} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
           </FadeIn>
        </section>

      </main>
    </div>
  );
}