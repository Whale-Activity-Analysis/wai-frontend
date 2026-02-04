"use client";

import { useState, useEffect } from "react";
import * as webllm from "@mlc-ai/web-llm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Loader2, Sparkles, BrainCircuit, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Wir nutzen Phi-3.5 Mini (Microsoft) - sehr starkes, effizientes Modell
const selectedModel = "Phi-3.5-mini-instruct-q4f16_1-MLC"; 

interface Props {
  data: any[];
}

export default function LocalAnalyst({ data }: Props) {
  const [engine, setEngine] = useState<webllm.MLCEngineInterface | null>(null);
  const [progress, setProgress] = useState(0); 
  const [progressText, setProgressText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const initAI = async () => {
    setIsLoading(true);
    try {
      const initProgressCallback = (report: webllm.InitProgressReport) => {
        // Berechne Fortschritt grob für die UI
        const p = report.progress; 
        setProgress(p * 100);
        setProgressText(report.text);
      };

      const newEngine = await webllm.CreateMLCEngine(
        selectedModel,
        { initProgressCallback: initProgressCallback }
      );
      
      setEngine(newEngine);
      setIsModelLoaded(true);
      await analyzeData(newEngine); 
    } catch (err) {
      console.error(err);
      setResponse("Fehler: Dein Browser unterstützt WebGPU nicht oder der Speicher ist voll.");
      setIsLoading(false);
    }
  };

  const analyzeData = async (aiEngine: webllm.MLCEngineInterface) => {
    setIsLoading(true);
    
    // Daten vorbereiten (Letzte 10 Tage für mehr Kontext)
    const recentData = data.slice(0, 10).map(d => ({
      d: d.date,
      score: d.wai,
      sig: d.wii_signal,
      flow: d.exchange_netflow,
      price: d.btc_close
    }));

    const prompt = `
      Du bist ein professioneller Krypto-Analyst. Analysiere diese Bitcoin-Daten der letzten 10 Tage (JSON):
      ${JSON.stringify(recentData)}

      Legende:
      - score: Whale Activity Index (0-100). Hoch = Viel Aktivität.
      - flow: Netflow. Negativ = Bullish (Auscashen), Positiv = Bearish (Einzahlen).
      - sig: Signal (accumulation, distribution).

      AUFGABE:
      Schreibe eine kurze, prägnante Marktanalyse auf Deutsch.
      1. Was machen die Wale gerade? (Kaufen/Verkaufen?)
      2. Wie korreliert das mit dem Preis?
      3. Kurzes Fazit: Bullish oder Bearish?
      
      Antworte direkt und ohne Floskeln.
    `;

    try {
      const reply = await aiEngine.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3, // Weniger kreativ, mehr faktenbasiert
        max_tokens: 400,
      });

      setResponse(reply.choices[0].message.content || "Keine Antwort erhalten.");
    } catch (e) {
      setResponse("Fehler bei der Generierung.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* --- INFO BOX VOR DEM START --- */}
      {!isModelLoaded && !isLoading && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900">
            <CardContent className="pt-6 flex gap-4 items-start">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <BrainCircuit className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                    <h3 className="font-bold text-orange-900 dark:text-orange-100">Lokale KI-Analyse</h3>
                    <p className="text-sm text-orange-800/80 dark:text-orange-200/70 mt-1 mb-4">
                        Wir laden eine echte KI (Phi-3.5) direkt in deinen Browser. 
                        Deine Daten werden <strong>nicht</strong> an OpenAI gesendet. Alles läuft 100% privat auf deinem Gerät.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-orange-700/60 dark:text-orange-300/50 mb-4">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Erster Download ca. 1.5 GB. Bitte WLAN nutzen.</span>
                    </div>
                    <Button onClick={initAI} className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Modell laden & Starten
                    </Button>
                </div>
            </CardContent>
        </Card>
      )}

      {/* --- LOADING SCREEN --- */}
      {isLoading && !isModelLoaded && (
        <Card>
            <CardContent className="pt-10 pb-10 text-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-orange-500 mx-auto" />
                <div>
                    <h3 className="font-semibold">Lade KI-Modell...</h3>
                    <p className="text-sm text-muted-foreground">{progressText}</p>
                </div>
                {/* Einfacher Progress Bar Fallback */}
                <div className="w-full max-w-sm mx-auto h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs text-neutral-400">Das passiert nur beim ersten Mal.</p>
            </CardContent>
        </Card>
      )}

      {/* --- ERGEBNIS ANSICHT --- */}
      {(isModelLoaded || response) && (
         <Card className="border-neutral-200 dark:border-neutral-800 shadow-md">
            <CardHeader className="border-b border-neutral-100 dark:border-neutral-800">
                <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-orange-500" />
                    AI Markt-Einschätzung
                </CardTitle>
                <CardDescription>Basierend auf deinen WAI-Daten der letzten 10 Tage.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                {isLoading ? (
                    <div className="flex items-center gap-2 text-neutral-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>KI analysiert die Charts...</span>
                    </div>
                ) : (
                    <div className="prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            {response}
                        </div>
                    </div>
                )}
            </CardContent>
            {/* Footer Buttons */}
            {!isLoading && (
                 <div className="p-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                    <Button variant="outline" onClick={() => analyzeData(engine!)} size="sm">
                        Neu Analysieren
                    </Button>
                 </div>
            )}
         </Card>
      )}
    </div>
  );
}