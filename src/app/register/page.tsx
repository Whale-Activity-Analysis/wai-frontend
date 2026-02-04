"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bitcoin, Loader2, Github, Mail, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Simulation
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard"); 
    }, 1500);
  }

  return (
    // Fluid Layout ohne feste Höhen, verhindert Scrollbalken
    <div className="w-full h-full lg:grid lg:grid-cols-2 bg-white dark:bg-neutral-950 transition-colors duration-300">
      
      {/* LINKE SEITE: Register Formular */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          
          <FadeIn delay={0.1}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Konto erstellen</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                Starten Sie Ihre 14-tägige kostenlose Testphase.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={onSubmit} className="grid gap-4">
              
              {/* Name Input */}
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Vollständiger Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Max Mustermann"
                  required
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-orange-500"
                />
              </div>

              {/* Email Input */}
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-orange-500"
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-orange-500"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-2" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Erstelle Account...
                  </>
                ) : (
                  "Kostenlos registrieren"
                )}
              </Button>

              {/* Terms Text */}
              <p className="px-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
                Mit der Registrierung akzeptieren Sie unsere{" "}
                <Link href="/dataprotection" className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-200">
                  Datenschutzrichtlinien
                </Link>{" "}
                und{" "}
                <Link href="/imprint" className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-200">
                  AGB
                </Link>
                .
              </p>

              {/* Divider */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-neutral-950 px-2 text-neutral-500">
                    Oder weiter mit
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" type="button" disabled={isLoading} className="dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800">
                    <Github className="mr-2 h-4 w-4" /> Github
                 </Button>
                 <Button variant="outline" type="button" disabled={isLoading} className="dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800">
                    <Mail className="mr-2 h-4 w-4" /> Google
                 </Button>
              </div>

            </form>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-2 text-center text-sm">
              Bereits einen Account?{" "}
              <Link href="/login" className="underline text-orange-600 hover:text-orange-500 dark:text-orange-500">
                Hier einloggen
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* RECHTE SEITE: Benefits (Nur Desktop) */}
      <div className="hidden bg-neutral-100 dark:bg-neutral-900 lg:flex h-auto flex-col justify-center items-center p-12 border-l border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        
        <FadeIn delay={0.2} direction="right">
            <div className="relative z-10 max-w-md space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                        Warum WAI Pro?
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-orange-500 shrink-0" />
                            <span className="text-neutral-600 dark:text-neutral-300">
                                <strong>Echtzeit Wal-Daten:</strong> Keine Verzögerung bei großen Transaktionen.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-orange-500 shrink-0" />
                            <span className="text-neutral-600 dark:text-neutral-300">
                                <strong>Smart Alerts:</strong> Push-Nachrichten bei Akkumulation oder Abverkauf.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-orange-500 shrink-0" />
                            <span className="text-neutral-600 dark:text-neutral-300">
                                <strong>API Zugang:</strong> Integriere unsere Daten direkt in deine Trading-Bots.
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">
                        "Die beste Investition für mein Trading-Setup dieses Jahr. Die Datenqualität ist unschlagbar."
                    </p>
                    <div className="mt-2 text-xs font-bold text-neutral-900 dark:text-white">
                        — Thomas K., Pro Trader
                    </div>
                </div>
            </div>
        </FadeIn>

        {/* Abstrakte Deko */}
        <div className="absolute -top-24 -right-24 opacity-10 dark:opacity-5 rotate-180">
            <Bitcoin className="h-96 w-96" />
        </div>
      </div>
    </div>
  );
}