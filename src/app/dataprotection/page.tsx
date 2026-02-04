"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DataProtectionPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Header-Bereich nur für diese Seite */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-8">
            <Link href="/">
                <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-orange-500 text-neutral-500 dark:text-neutral-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zur Startseite
                </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                Datenschutzerklärung
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
                Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
            </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Intro Box */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm mb-12">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Überblick</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        Der Schutz deiner persönlichen Daten ist uns sehr wichtig. Aktuell befindet sich das 
                        <strong> WAI Project</strong> in einer Beta/Demo-Phase. Wir speichern momentan 
                        <strong> keine persönlichen Nutzerdaten</strong> (keine E-Mail-Adressen, keine Passwörter, keine Zahlungsdaten), 
                        da es noch keine Login-Funktion gibt. Diese Seite dient der Information über die grundsätzliche Datenverarbeitung beim Besuch der Website.
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-12 text-neutral-700 dark:text-neutral-300">

            {/* Sektion 1 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    1. Verantwortliche Stelle
                </h2>
                <p className="mb-4 leading-relaxed">
                    Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                </p>
                <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg text-sm font-mono border border-neutral-200 dark:border-neutral-700">
                    <p>WAI Group</p>
                    <p>Wallstreet 67</p>
                    <p>67679</p>
                    <p>frank.sinatra@gmail.com</p>
                </div>
            </section>

            {/* Sektion 2 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <Server className="h-5 w-5 text-orange-500" />
                    2. Hosting & Server-Log-Dateien
                </h2>
                <p className="mb-4 leading-relaxed">
                    Unsere Website wird bei einem externen Dienstleister gehostet (Vercel Inc.). 
                    Wenn du unsere Website besuchst, erfasst der Webserver automatisch Daten, die dein Browser übermittelt (Server-Log-Dateien).
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4 text-neutral-600 dark:text-neutral-400">
                    <li>Browsertyp und Browserversion</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL (die zuvor besuchte Seite)</li>
                    <li>IP-Adresse des zugreifenden Rechners (ggf. anonymisiert)</li>
                    <li>Uhrzeit der Serveranfrage</li>
                </ul>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, 
                    der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
                </p>
            </section>

            {/* Sektion 3 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-orange-500" />
                    3. Cookies & Lokaler Speicher
                </h2>
                <p className="mb-4 leading-relaxed">
                    Unsere Website verwendet teilweise sogenannte Cookies oder den "Local Storage" deines Browsers. 
                    Diese richten auf deinem Rechner keinen Schaden an und enthalten keine Viren.
                </p>
                <div className="mb-4">
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Einsatz auf dieser Seite:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>
                            <strong>Theme-Einstellungen:</strong> Wir speichern deine Präferenz für den Dark Mode / Light Mode im Local Storage (`theme`), 
                            damit die Seite beim nächsten Besuch noch genauso aussieht.
                        </li>
                        <li>
                            <strong>Demo-Status:</strong> In der Dashboard-Demo speichern wir temporär, ob du den "Premium-Switch" aktiviert hast, 
                            um die Funktionalität zu demonstrieren. Dies geschieht rein lokal in deinem Browser.
                        </li>
                    </ul>
                </div>
            </section>

            {/* Sektion 4 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    4. Analyse-Tools und Tools von Drittanbietern
                </h2>
                <p className="mb-4 leading-relaxed">
                    Aktuell setzen wir <strong>keine</strong> Tracking-Tools wie Google Analytics oder Facebook Pixel ein. 
                    Wir analysieren das Nutzerverhalten nicht personenbezogen.
                </p>
                <p className="leading-relaxed">
                    Für die Darstellung von Charts nutzen wir Bibliotheken, die lokal in deinem Browser ausgeführt werden. 
                    Es werden keine Chart-Daten an Dritte gesendet.
                </p>
            </section>

            {/* Sektion 5 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    5. Deine Rechte
                </h2>
                <p className="mb-4 leading-relaxed">
                    Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten (sofern vorhanden), 
                    deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
                </p>
                <p className="text-sm bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 p-4 rounded-lg text-orange-800 dark:text-orange-200">
                    Da wir aktuell keine Nutzer-Accounts anbieten, speichern wir keine persönlichen Daten, die wir dir zuordnen könnten.
                </p>
            </section>

        </div>
      </main>
    </div>
  );
}