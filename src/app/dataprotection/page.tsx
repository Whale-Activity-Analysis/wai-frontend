"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next"; // Lokalisierung importiert
import { ArrowLeft, Shield, Lock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DataProtectionPage() {
  const { t, i18n } = useTranslation(); // Hook initialisiert

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Header-Bereich nur für diese Seite */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-8">
            <Link href="/">
                <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-orange-500 text-neutral-500 dark:text-neutral-400">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {String(t('back_to_home', 'Zurück zur Startseite'))}
                </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                {String(t('privacy_policy_title', 'Datenschutzerklärung'))}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400">
                {String(t('status', 'Stand'))}: {new Date().toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' })}
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
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{String(t('overview', 'Überblick'))}</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        {String(t('privacy_intro_text_part1', 'Der Schutz deiner persönlichen Daten ist uns sehr wichtig. Aktuell befindet sich das'))} 
                        <strong> WAI Project</strong> {String(t('privacy_intro_text_part2', 'in einer Beta/Demo-Phase. Wir speichern momentan'))} 
                        <strong> {String(t('no_personal_data', 'keine persönlichen Nutzerdaten'))}</strong> {String(t('privacy_intro_text_part3', '(keine E-Mail-Adressen, keine Passwörter, keine Zahlungsdaten), da es noch keine Login-Funktion gibt. Diese Seite dient der Information über die grundsätzliche Datenverarbeitung beim Besuch der Website.'))}
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-12 text-neutral-700 dark:text-neutral-300">

            {/* Sektion 1 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    1. {String(t('responsible_party', 'Verantwortliche Stelle'))}
                </h2>
                <p className="mb-4 leading-relaxed">
                    {String(t('responsible_party_desc', 'Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:'))}
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
                    2. {String(t('hosting_logs_title', 'Hosting & Server-Log-Dateien'))}
                </h2>
                <p className="mb-4 leading-relaxed">
                    {String(t('hosting_desc_text', 'Unsere Website wird bei einem externen Dienstleister gehostet (Vercel Inc.). Wenn du unsere Website besuchst, erfasst der Webserver automatisch Daten, die dein Browser übermittelt (Server-Log-Dateien).'))}
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4 text-neutral-600 dark:text-neutral-400">
                    <li>{String(t('log_browser', 'Browsertyp und Browserversion'))}</li>
                    <li>{String(t('log_os', 'Verwendetes Betriebssystem'))}</li>
                    <li>{String(t('log_referrer', 'Referrer URL (die zuvor besuchte Seite)'))}</li>
                    <li>{String(t('log_ip', 'IP-Adresse des zugreifenden Rechners (ggf. anonymisiert)'))}</li>
                    <li>{String(t('log_time', 'Uhrzeit der Serveranfrage'))}</li>
                </ul>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">
                    {String(t('log_legal_note', 'Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.'))}
                </p>
            </section>

            {/* Sektion 3 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-orange-500" />
                    3. {String(t('cookies_storage_title', 'Cookies & Lokaler Speicher'))}
                </h2>
                <p className="mb-4 leading-relaxed">
                    {String(t('cookies_desc_text', 'Unsere Website verwendet teilweise sogenannte Cookies oder den "Local Storage" deines Browsers. Diese richten auf deinem Rechner keinen Schaden an und enthalten keine Viren.'))}
                </p>
                <div className="mb-4">
                    <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{String(t('usage_on_this_page', 'Einsatz auf dieser Seite:'))}</h3>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>
                            <strong>{String(t('theme_settings_title', 'Theme-Einstellungen:'))}</strong> {String(t('theme_settings_desc', 'Wir speichern deine Präferenz für den Dark Mode / Light Mode im Local Storage (`theme`), damit die Seite beim nächsten Besuch noch genauso aussieht.'))}
                        </li>
                        <li>
                            <strong>{String(t('demo_status_title', 'Demo-Status:'))}</strong> {String(t('demo_status_desc', 'In der Dashboard-Demo speichern wir temporär, ob du den "Premium-Switch" aktiviert hast, um die Funktionalität zu demonstrieren. Dies geschieht rein lokal in deinem Browser.'))}
                        </li>
                    </ul>
                </div>
            </section>

            {/* Sektion 4 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    4. {String(t('analytics_title', 'Analyse-Tools und Tools von Drittanbietern'))}
                </h2>
                <p className="mb-4 leading-relaxed">
                    {String(t('analytics_desc_text1', 'Aktuell setzen wir'))} <strong>{String(t('no_tracking_tools', 'keine'))}</strong> {String(t('analytics_desc_text2', 'Tracking-Tools wie Google Analytics oder Facebook Pixel ein. Wir analysieren das Nutzerverhalten nicht personenbezogen.'))}
                </p>
                <p className="leading-relaxed">
                    {String(t('charts_desc_text', 'Für die Darstellung von Charts nutzen wir Bibliotheken, die lokal in deinem Browser ausgeführt werden. Es werden keine Chart-Daten an Dritte gesendet.'))}
                </p>
            </section>

            {/* Sektion 5 */}
            <section>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                    5. {String(t('your_rights_title', 'Deine Rechte'))}
                </h2>
                <p className="mb-4 leading-relaxed">
                    {String(t('your_rights_desc_text', 'Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten (sofern vorhanden), deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.'))}
                </p>
                <p className="text-sm bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 p-4 rounded-lg text-orange-800 dark:text-orange-200">
                    {String(t('no_accounts_disclaimer', 'Da wir aktuell keine Nutzer-Accounts anbieten, speichern wir keine persönlichen Daten, die wir dir zuordnen könnten.'))}
                </p>
            </section>

        </div>
      </main>
    </div>
  );
}