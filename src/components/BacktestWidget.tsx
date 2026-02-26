"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBacktestStats } from "@/lib/api";
import { Loader2, Calculator, Activity, AlertTriangle } from "lucide-react";

// NEU: Die Komponente erwartet jetzt den isPremium Status
export default function BacktestWidget({ isPremium }: { isPremium: boolean }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [signal, setSignal] = useState("wii_accumulation");
  const [horizon, setHorizon] = useState(7);

  useEffect(() => {
    // 🛑 NEU: DIE API-SPERRE!
    // Wenn der Nutzer kein Premium hat, brechen wir hier sofort ab.
    // So verhindern wir API-Spam im Hintergrund.
    if (!isPremium) {
      setLoading(false);
      return; 
    }

    async function loadData() {
      setLoading(true);
      setError(false);
      
      const result = await fetchBacktestStats(signal, horizon);
      
      if (result) {
        setData(result);
      } else {
        setError(true);
        setData(null);
      }
      setLoading(false);
    }
    loadData();
  }, [signal, horizon, isPremium]); 

  return (
    <Card className="w-full shadow-sm bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      <CardHeader className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
              <Calculator className="h-5 w-5 text-indigo-500" />
              Interaktiver Strategie-Backtester
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Simuliere die Performance unserer WII-Signale in der Vergangenheit.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-20">
            <select 
              value={signal} 
              onChange={(e) => setSignal(e.target.value)}
              className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 cursor-pointer"
            >
              <option value="wii_accumulation">Akkumulation (WII &gt; 70)</option>
              <option value="wii_strong_accumulation">Starke Akkum. (WII &gt; 85)</option>
              <option value="wii_selling">Verkaufsdruck (WII &lt; 30)</option>
              <option value="wii_strong_selling">Starker Verkauf (WII &lt; 15)</option>
            </select>

            <select 
              value={horizon} 
              onChange={(e) => setHorizon(Number(e.target.value))}
              className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 cursor-pointer"
            >
              <option value={3}>3 Tage</option>
              <option value={7}>7 Tage</option>
              <option value={14}>14 Tage</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 min-h-[300px] relative flex flex-col justify-center">
        
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        )}

        {/* Platzhalter-Skelett für Free-Nutzer hinter dem Blur-Effekt */}
        {!isPremium && (
           <div className="h-full w-full flex-1 bg-neutral-50/50 dark:bg-neutral-800/20 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-700"></div>
        )}

        {error && !loading && isPremium && (
          <div className="flex flex-col items-center justify-center text-center p-6 text-neutral-500 animate-in fade-in duration-300">
             <AlertTriangle className="h-10 w-10 text-orange-500/50 mb-3" />
             <p className="font-semibold text-neutral-700 dark:text-neutral-300">Keine Daten verfügbar</p>
             <p className="text-sm mt-1 max-w-sm">Für diese Kombination aus Signal und Zeitfenster gibt es aktuell nicht genug historische Daten für einen verlässlichen Backtest.</p>
          </div>
        )}

        {data && !loading && !error && isPremium && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* KPI GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 mb-1">Win Rate</p>
                <p className={`text-2xl font-bold ${data.performance?.win_rate >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                  {data.performance?.win_rate?.toFixed(1) || 0}%
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">{data.prediction_stats?.correct_predictions || 0} von {data.total_signals || 0} korrekt</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 mb-1">Avg Return</p>
                <p className={`text-2xl font-bold ${data.performance?.avg_return >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {data.performance?.avg_return > 0 ? '+' : ''}{data.performance?.avg_return?.toFixed(2) || 0}%
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">Bei korrekt: {data.prediction_stats?.avg_return_when_correct?.toFixed(2) || 0}%</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 mb-1">Sharpe Ratio</p>
                <p className={`text-2xl font-bold ${data.performance?.sharpe_ratio >= 1 ? 'text-green-600' : data.performance?.sharpe_ratio >= 0 ? 'text-yellow-600' : 'text-red-500'}`}>
                  {data.performance?.sharpe_ratio?.toFixed(2) || 0}
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">Risk/Reward Metrik</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 mb-1">Max Drawdown</p>
                <p className="text-2xl font-bold text-red-500">
                  {data.performance?.max_drawdown?.toFixed(2) || 0}%
                </p>
                <p className="text-[10px] text-neutral-400 mt-1">Schlechtester Fall</p>
              </div>
            </div>

            {/* INTERPRETATION BEREICH */}
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-5">
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4" /> AI Interpretation
              </h4>
              <div className="space-y-2 text-sm text-indigo-800 dark:text-indigo-200/80">
                <p><strong>Gesamt-Bewertung:</strong> {data.interpretation?.overall_assessment || "N/A"}</p>
                <p><strong>Empfehlung:</strong> {data.interpretation?.recommendation || "N/A"}</p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs opacity-80 pt-3 border-t border-indigo-200/50 dark:border-indigo-500/30">
                  <p>• Win Rate: {data.interpretation?.win_rate_assessment || "N/A"}</p>
                  <p>• Return: {data.interpretation?.return_assessment || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}