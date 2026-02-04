"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bitcoin, Loader2, ArrowRight, Github, Mail } from "lucide-react";
import FadeIn from "@/components/FadeIn"; 

export default function LoginPage() {
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
    // FIX: "lg:min-h-[600px]" und "xl:min-h-[800px]" entfernt.
    // Stattdessen "h-full", damit es sich einfach in den Layout-Container einpasst.
    <div className="w-full h-full lg:grid lg:grid-cols-2 bg-white dark:bg-neutral-950 transition-colors duration-300">
      
      {/* LINKE SEITE: Formular */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          
          <FadeIn delay={0.1}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Willkommen zurück</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                Gib deine E-Mail ein, um dich anzumelden.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={onSubmit} className="grid gap-4">
              
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

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Passwort
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-500 underline-offset-4 hover:underline"
                  >
                    Vergessen?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-orange-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Anmelden...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

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
            <div className="mt-4 text-center text-sm">
              Noch keinen Account?{" "}
              <Link href="/register" className="underline text-orange-600 hover:text-orange-500 dark:text-orange-500">
                Jetzt registrieren
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* RECHTE SEITE: Visual / Trust */}
      {/* h-auto sorgt dafür, dass es sich der Höhe der linken Seite anpasst */}
      <div className="hidden bg-neutral-100 dark:bg-neutral-900 lg:flex h-auto flex-col justify-center items-center p-12 border-l border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        
        <FadeIn delay={0.2} direction="right">
            <div className="relative z-10 max-w-md">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <Bitcoin className="h-6 w-6" />
                </div>
                
                <blockquote className="space-y-6">
                    <p className="text-2xl font-medium leading-relaxed text-neutral-900 dark:text-white">
                    &ldquo;Seit wir den WAI nutzen, konnten wir Akkumulationsphasen 3 Tage früher erkennen als mit herkömmlichen Indikatoren.&rdquo;
                    </p>
                    <footer className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
                        <div>
                            <div className="font-semibold text-neutral-900 dark:text-white">Alex M.</div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">Institutional Trader</div>
                        </div>
                    </footer>
                </blockquote>
            </div>
        </FadeIn>

        <div className="absolute -bottom-24 -right-24 opacity-10 dark:opacity-5">
            <Bitcoin className="h-96 w-96" />
        </div>
      </div>
    </div>
  );
}