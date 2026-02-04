"use client";

import Link from "next/link";
import { ArrowLeft, Target, Users, ShieldCheck, LineChart, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-8">
            <Link href="/">
                <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-orange-500 text-neutral-500 dark:text-neutral-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zur Startseite
                </Button>
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                Wir bringen Licht ins <span className="text-orange-500">Dark Pool</span>.
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl">
                Das WAI Project wurde mit einem Ziel gegründet: Die Informationsasymmetrie zwischen institutionellen Walen und privaten Tradern zu beenden.
            </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 space-y-24">
        
        {/* --- MISSION SECTION --- */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-800 dark:text-orange-400">
                    Unsere Mission
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    On-Chain Daten sollten nicht nur für Hedgefonds verständlich sein.
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                    Jeden Tag bewegen "Wale" Milliarden an Bitcoin. Diese Transaktionen sind öffentlich auf der Blockchain sichtbar, aber für den normalen Menschen kaum zu interpretieren.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                    Wir haben den <strong>Whale Activity Index (WAI)</strong> entwickelt, um dieses Rauschen in klare Signale zu verwandeln. Wir glauben, dass jeder Trader das Recht hat zu wissen, was hinter den Kulissen passiert.
                </p>
            </div>
            <div className="relative h-[400px] w-full bg-neutral-100 dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                {/* Platzhalter für ein Team-Bild oder Grafik */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-neutral-900/0"></div>
                <LineChart className="h-32 w-32 text-neutral-300 dark:text-neutral-700" />
            </div>
        </section>

        {/* --- VALUES GRID --- */}
        <section>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Unsere Werte</h2>
                <p className="text-neutral-500 dark:text-neutral-400">Das Fundament unserer Analyse.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl w-fit mb-4">
                            <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Präzision</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Wir filtern "Wash Trading" und Börsen-interne Transfers heraus, um nur echte Markt-Bewegungen zu zeigen.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                        <div className="p-3 bg-green-100 dark:bg-green-500/10 rounded-xl w-fit mb-4">
                            <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Transparenz</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Unsere Algorithmen sind keine Blackbox. Wir erklären in unserer Dokumentation genau, wie der WAI berechnet wird.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                        <div className="p-3 bg-purple-100 dark:bg-purple-500/10 rounded-xl w-fit mb-4">
                            <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Community</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Wir bauen dieses Tool für und mit der Community. Feedback fließt direkt in die Entwicklung von Version 3.0 ein.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* --- TEAM / OPEN SOURCE --- */}
        <section className="bg-neutral-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Open Source im Herzen</h2>
                <p className="text-neutral-300 mb-8 text-lg">
                    Das WAI Project startete als kleines GitHub Repo. Heute nutzen es hunderte Trader. 
                    Möchtest du mithelfen oder den Code prüfen?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://github.com/Whale-Activity-Analysis" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-200 w-full sm:w-auto">
                            <Github className="mr-2 h-5 w-5" />
                            GitHub Repository
                        </Button>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                         <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 w-full sm:w-auto">
                            <Twitter className="mr-2 h-5 w-5" />
                            Folge uns auf X
                        </Button>
                    </a>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}