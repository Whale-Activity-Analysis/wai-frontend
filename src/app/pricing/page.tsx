"use client";

import Link from "next/link";
import { Check, X, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingPage() {
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
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                    Transparente Preise für <span className="text-orange-500">jedes Level</span>
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    Starte kostenlos mit Basis-Metriken oder hol dir den vollen Informationsvorsprung der Wale.
                </p>
            </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* --- FREE PLAN --- */}
            <Card className="flex flex-col border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all bg-white dark:bg-neutral-900">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">Starter</CardTitle>
                    <CardDescription className="text-neutral-500 dark:text-neutral-400">
                        Perfekt, um den Markt zu beobachten.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-neutral-900 dark:text-white">0€</span>
                        <span className="text-neutral-500 dark:text-neutral-400 ml-2">/ Monat</span>
                    </div>
                    
                    <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                            Activity Index (WAI) Live
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                            Bitcoin Preis Overlay
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                            Exchange Netflow (24h)
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                            Basis On-Chain Volumen
                        </li>
                        {/* Nicht enthalten */}
                        <li className="flex items-center text-neutral-400 dark:text-neutral-600">
                            <X className="h-4 w-4 mr-2 shrink-0" />
                            Whale Intent (WII) Score
                        </li>
                        <li className="flex items-center text-neutral-400 dark:text-neutral-600">
                            <X className="h-4 w-4 mr-2 shrink-0" />
                            Smart Signals (Buy/Sell)
                        </li>
                        <li className="flex items-center text-neutral-400 dark:text-neutral-600">
                            <X className="h-4 w-4 mr-2 shrink-0" />
                            Erweiterte Chart-Tools
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Link href="/register" className="w-full">
                        <Button variant="outline" className="w-full border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white">
                            Kostenlos starten
                        </Button>
                    </Link>
                </CardFooter>
            </Card>

            {/* --- PRO PLAN (PREMIUM) --- */}
            <Card className="flex flex-col border-orange-500 dark:border-orange-500 shadow-xl relative bg-white dark:bg-neutral-900 scale-100 md:scale-105 z-10">
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Am Beliebtesten
                </div>

                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">Pro Trader</CardTitle>
                    <CardDescription className="text-neutral-500 dark:text-neutral-400">
                        Für alle, die den Markt schlagen wollen.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-neutral-900 dark:text-white">29€</span>
                        <span className="text-neutral-500 dark:text-neutral-400 ml-2">/ Monat</span>
                    </div>
                    
                    <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                        <li className="flex items-center">
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-1 rounded-full mr-2">
                                <Check className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                            </div>
                            <strong>Alles aus Starter</strong>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-orange-500 mr-2 shrink-0" />
                            <span>Whale Intent Index (WII)</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-orange-500 mr-2 shrink-0" />
                            <span>Smart Signals (Akkumulation/Distribution)</span>
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-orange-500 mr-2 shrink-0" />
                            Erweiterte Flow-Charts
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-orange-500 mr-2 shrink-0" />
                            Volle Historie (kein Limit)
                        </li>
                        <li className="flex items-center">
                            <Check className="h-4 w-4 text-orange-500 mr-2 shrink-0" />
                            Priorisierter Support
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Link href="/register?plan=pro" className="w-full">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6">
                            Jetzt Upgraden
                        </Button>
                    </Link>
                </CardFooter>
            </Card>

        </div>

        {/* --- FAQ SECTION (Optional) --- */}
        <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">
                Häufig gestellte Fragen
            </h2>
            <div className="grid gap-6">
                <div className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <h3 className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-orange-500" />
                        Kann ich jederzeit kündigen?
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Ja, das Abonnement ist monatlich kündbar. Es gibt keine versteckten Kosten oder lange Vertragslaufzeiten.
                    </p>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <h3 className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
                        <HelpCircle className="h-4 w-4 text-orange-500" />
                        Welche Zahlungsmethoden werden akzeptiert?
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, Amex) sowie PayPal. Krypto-Zahlungen folgen bald.
                    </p>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}