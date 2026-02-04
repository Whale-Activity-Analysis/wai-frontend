"use client";

import Link from "next/link";
import { ArrowLeft, Building, Mail, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* --- HEADER (Identisch zur Datenschutz-Seite) --- */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-8">
            <Link href="/">
                <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-orange-500 text-neutral-500 dark:text-neutral-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zur Startseite
                </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                Impressum
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
                Angaben gemäß § 5 TMG
            </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Box 1: Betreiber */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-lg">
                        <Building className="h-6 w-6 text-orange-600 dark:text-orange-500" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                        Betreiber der Website
                    </h2>
                </div>
                
                <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <p className="font-semibold text-neutral-900 dark:text-white">Frank Sinatra</p>
                    <p>Wallstreet 67</p>
                    <p>67679 New York</p>
                    <p>USA</p>
                </div>
            </div>

            {/* Box 2: Kontakt */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                        Kontakt
                    </h2>
                </div>
                
                <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                    <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">E-Mail</span>
                        <a href="mailto:info@wai-project.com" className="text-orange-500 hover:underline">
                            frank.sinatra@gmail.com
                        </a>
                    </div>
                    <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Telefon (Optional)</span>
                        <p>+49 123 456789</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Rechtliche Texte */}
        <div className="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">

            <section>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-neutral-400" />
                    Umsatzsteuer-ID
                </h3>
                <p className="mb-2">
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                </p>
                <p className="font-mono bg-neutral-100 dark:bg-neutral-800 p-2 rounded inline-block border border-neutral-200 dark:border-neutral-700">
                    [DE 123 456 789]
                </p>
            </section>

            <section>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-neutral-400" />
                    Redaktionell verantwortlich
                </h3>
                <p>
                    Maik Löwen<br />
                    Tiger Straße 31<br />
                    12345 Berlin
                </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-8"></div>

            <section>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Haftung für Inhalte</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
                    Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu 
                    überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Haftung für Links</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der 
                    jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Urheberrecht</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
                    Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen 
                    der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">EU-Streitschlichtung</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline ml-1">
                        https://ec.europa.eu/consumers/odr/
                    </a>.<br/>
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
            </section>

        </div>
      </main>
    </div>
  );
}