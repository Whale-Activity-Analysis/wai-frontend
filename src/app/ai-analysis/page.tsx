"use client";

import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";
import LocalAnalyst from "@/components/LocalAnalyst"; 
import { fetchWaiHistory } from "@/lib/api";
import { BrainCircuit, Loader2, AlertCircle } from "lucide-react";

export default function AIAnalysisPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>("");

  
  useEffect(() => {
    async function load() {
      try {
        const res = await fetchWaiHistory();
        console.log("AI PAGE RAW DATA:", res); // F12 Check

        // --- ROBUSTE DATEN-FINDUNG ---
        // Wir suchen das Array, egal wie das Backend es verpackt hat
        let cleanData: any[] = [];

        if (Array.isArray(res)) {
            cleanData = res;
        } else if (res && Array.isArray(res.data)) {
            cleanData = res.data;
        } else if (res && Array.isArray(res.items)) {
            cleanData = res.items;
        } else if (res && Array.isArray(res.history)) {
            cleanData = res.history;
        }

        if (cleanData.length === 0) {
            setDebugInfo(`Backend antwortete, aber kein Array gefunden. Format: ${JSON.stringify(res).substring(0, 100)}...`);
        } else {
            setHistory(cleanData);
        }

      } catch (e: any) {
        console.error(e);
        setDebugInfo(`API Fehler: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <FadeIn>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-500/10 rounded-xl">
                    <BrainCircuit className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">AI Deep Dive</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        Lass künstliche Intelligenz Muster in den Wal-Daten finden.
                    </p>
                </div>
            </div>
        </FadeIn>

        {/* Content */}
        <FadeIn delay={0.2}>
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                </div>
            ) : history.length > 0 ? (
                // Hier übergeben wir die gefundenen Daten
                <LocalAnalyst data={history} />
            ) : (
                // FEHLER-ANZEIGE FALLS LEER
                <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl text-center">
                    <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Keine Daten empfangen</h3>
                    <p className="text-neutral-500 max-w-md mx-auto mt-2 mb-4">
                        Das Backend hat keine lesbaren Historien-Daten geliefert.
                    </p>
                    {debugInfo && (
                        <div className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded text-xs font-mono text-left w-full max-w-lg overflow-auto text-red-500">
                            DEBUG: {debugInfo}
                        </div>
                    )}
                </div>
            )}
        </FadeIn>

      </div>
    </main>
  );
}