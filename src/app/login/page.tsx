"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Bitcoin, Loader2, Github, Mail, AlertCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn"; 

// --- MOCK DATEN FÜR DIE DEMO ---
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin Analyst",
    email: "admin@wai.com",
    password: "password123",
    role: "premium"
  },
  {
    id: "2",
    name: "Demo User",
    email: "user@test.de",
    password: "password",
    role: "free"
  }
];

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // States für die Eingabe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    // Kurze Verzögerung für den "Lade-Effekt" (Demo-Polish)
    setTimeout(() => {
      // Validierung gegen das lokale Array
      const foundUser = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        // Erfolg: Daten speichern und weiterleiten
        localStorage.setItem("user", JSON.stringify(foundUser));
        localStorage.setItem("authToken", "mock-token-" + foundUser.id);
        localStorage.setItem("isLoggedIn", "true");

        router.push("/dashboard");
      } else {
        // Fehler: Nutzer nicht gefunden oder Passwort falsch
        setError("Ungültige E-Mail oder Passwort.");
        setIsLoading(false);
      }
    }, 1000);
  }

  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2 bg-white dark:bg-neutral-950 transition-colors duration-300 min-h-screen">
      
      {/* LINKE SEITE: Formular */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[400px] gap-6">
          
          <FadeIn delay={0.1}>
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                {String(t('welcome_back', 'Willkommen zurück'))}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                {String(t('login_subtitle', 'Melde dich mit deinen Demo-Daten an.'))}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={onSubmit} className="grid gap-4">
              
              {/* Fehlermeldung anzeigen */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-md text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {String(t('email_label', 'Email'))}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-orange-500"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {String(t('password_label', 'Passwort'))}
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-500 underline-offset-4 hover:underline"
                  >
                    {String(t('forgot_password', 'Vergessen?'))}
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder=""
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-orange-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {String(t('signing_in', 'Verifiziere...'))}
                  </>
                ) : (
                  String(t('login_button', 'Login'))
                )}
              </Button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-neutral-950 px-2 text-neutral-500">
                    {String(t('or_continue_with', 'Oder'))}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" type="button" className="dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800">
                    <Github className="mr-2 h-4 w-4" /> Github
                 </Button>
                 <Button variant="outline" type="button" className="dark:bg-neutral-900 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800">
                    <Mail className="mr-2 h-4 w-4" /> Google
                 </Button>
              </div>

            </form>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-4 text-center text-sm">
              <span className="text-neutral-500">{String(t('no_account_text', 'Noch keinen Account?'))}</span>{" "}
              <Link href="/register" className="underline text-orange-600 hover:text-orange-500 dark:text-orange-500 font-medium">
                {String(t('register_now_link', 'Jetzt registrieren'))}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* RECHTE SEITE: Visual */}
      <div className="hidden bg-neutral-100 dark:bg-neutral-900 lg:flex h-auto flex-col justify-center items-center p-12 border-l border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        
        <FadeIn delay={0.2} direction="right">
            <div className="relative z-10 max-w-md">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                    <Bitcoin className="h-6 w-6" />
                </div>
                
                <blockquote className="space-y-6">
                    <p className="text-2xl font-medium leading-relaxed text-neutral-900 dark:text-white">
                    &ldquo;{String(t('testimonial_quote', 'Echt überzeugend – das System erkennt Whale-Bewegungen schneller als jeder Twitter-Bot.'))}&rdquo;
                    </p>
                    <footer className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-orange-200 dark:bg-orange-900/40 flex items-center justify-center text-orange-600 font-bold text-xs">AS</div>
                        <div>
                            <div className="font-semibold text-neutral-900 dark:text-white">Alex S.</div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">Professional Trader</div>
                        </div>
                    </footer>
                </blockquote>
            </div>
        </FadeIn>

        <div className="absolute -bottom-24 -right-24 opacity-10 dark:opacity-5 pointer-events-none">
            <Bitcoin className="h-96 w-96" />
        </div>
      </div>
    </div>
  );
}