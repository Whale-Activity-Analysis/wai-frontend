"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Bitcoin, Loader2, Github, Mail, AlertCircle, User } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // States für das Formular
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    // Einfache Validierung
    if (password.length < 6) {
      setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      setIsLoading(false);
      return;
    }

    // Demo-Verzögerung
    setTimeout(() => {
      // Wir erstellen ein neues User-Objekt
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: name,
        email: email,
        role: "free", // Standardrolle für neue User
        createdAt: new Date().toISOString(),
      };

      // Im localStorage speichern (damit das Dashboard diese Daten anzeigen kann)
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("authToken", "mock-token-" + newUser.id);

      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  }

  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2 bg-white dark:bg-neutral-950 transition-colors duration-300 min-h-screen">
      
      {/* LINKE SEITE: Visual (getauscht für Abwechslung) */}
      <div className="hidden bg-neutral-100 dark:bg-neutral-900 lg:flex h-auto flex-col justify-center items-center p-12 border-r border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        
        <FadeIn delay={0.2} direction="left">
            <div className="relative z-10 max-w-md">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <User className="h-6 w-6" />
                </div>
                
                <blockquote className="space-y-6">
                    <p className="text-2xl font-medium leading-relaxed text-neutral-900 dark:text-white">
                    &ldquo;{String(t('register_quote', 'Werde Teil von über 10.000 Tradern, die den Markt mit KI-Präzision analysieren.'))}&rdquo;
                    </p>
                    <div className="flex -space-x-2">
                        {[1,2,3,4].map((i) => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-neutral-900 bg-neutral-300 dark:bg-neutral-700" />
                        ))}
                        <div className="flex h-8 items-center justify-center rounded-full bg-orange-500 px-2 text-[10px] font-bold text-white border-2 border-white dark:border-neutral-900">
                            +10k
                        </div>
                    </div>
                </blockquote>
            </div>
        </FadeIn>
      </div>

      {/* RECHTE SEITE: Formular */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          
          <FadeIn delay={0.1}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                {String(t('create_account', 'Account erstellen'))}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                Starte jetzt deine 7-tägige Testphase.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={onSubmit} className="grid gap-4">
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name</label>
                <input
                  type="text"
                  placeholder="Max Mustermann"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Passwort</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-2" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Kostenlos registrieren"
                )}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-200 dark:border-neutral-800" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-neutral-950 px-2 text-neutral-500">Oder weiter mit</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" type="button" className="dark:bg-neutral-900 dark:border-neutral-800"><Github className="mr-2 h-4 w-4" /> Github</Button>
                 <Button variant="outline" type="button" className="dark:bg-neutral-900 dark:border-neutral-800"><Mail className="mr-2 h-4 w-4" /> Google</Button>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-4 text-center text-sm">
              <span className="text-neutral-500">Bereits einen Account?</span>{" "}
              <Link href="/login" className="underline text-orange-600 font-medium">
                Login
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}