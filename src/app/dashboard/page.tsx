'use client';

import { useEffect, useState } from "react";
import ActivityChart from "@/components/ActivityChart";
import CombinedChart from "@/components/CombinedChart";
import IntentChart from "@/components/IntentChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLatestWai, fetchWaiHistory } from "@/lib/api"; 
import { Bitcoin, TrendingUp, Activity, DollarSign, Loader2, AlertCircle, ArrowRightLeft, Signal, LineChart } from "lucide-react";

export default function DashboardPage() {
  const [currentWai, setCurrentWai] = useState<any>(null);
  const [fullHistory, setFullHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("Starte Datenabruf...");
        const [latestData, historyResponse] = await Promise.all([
          fetchLatestWai(),
          fetchWaiHistory()
        ]);
        setCurrentWai(latestData);
        const realHistoryArray = historyResponse.data || historyResponse;
        setFullHistory(realHistoryArray);
      } catch (err: any) {
        console.error("Fehler im Frontend:", err);
        setError(err.message || "Unbekannter Fehler beim Laden");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const currentWiiStatus = fullHistory.length > 0 ? fullHistory[0] : null;

  if (isLoading) return <main className="min-h-screen flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-orange-500" /></main>;
  if (error) return <main className="min-h-screen flex items-center justify-center text-red-500">{error}</main>;

  return (
    <main className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      {/* Container mit etwas mehr Breite für große Screens */}
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
            <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-xl shadow-sm">
                <Bitcoin className="h-8 w-8 text-orange-600" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bitcoin Whale Index</h1>
                <p className="text-slate-500">On-Chain Matrix: Activity vs. Intent</p>
            </div>
            </div>
            {/* Kleines Price Badge oben rechts */}
            {currentWiiStatus?.btc_close && (
                <div className="text-right hidden md:block">
                    <p className="text-sm text-slate-400">Bitcoin Preis</p>
                    <p className="text-2xl font-mono font-medium text-slate-700">
                        ${currentWiiStatus.btc_close.toLocaleString()}
                    </p>
                </div>
            )}
        </div>

        {/* --- SEKTION 1: KPI KARTEN --- */}
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-500" /> 
                Live Markt-Status
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Karte: WAI */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Activity (WAI)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">
                            {currentWai?.wai !== undefined ? currentWai.wai.toFixed(0) : "0"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">0-100 Score</p>
                    </CardContent>
                </Card>

                {/* Karte: WII */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Intent (WII)</CardTitle>
                        <Signal className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">
                            {currentWiiStatus?.wii !== undefined ? currentWiiStatus.wii.toFixed(0) : "--"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Pump vs Dump Absicht</p>
                    </CardContent>
                </Card>

                {/* Karte: Signal */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Signal Phase</CardTitle>
                        <LineChart className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-xl font-bold capitalize truncate ${
                             currentWiiStatus?.wii_signal === 'accumulation' ? 'text-green-600' : 
                             currentWiiStatus?.wii_signal === 'selling_pressure' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                            {currentWiiStatus?.wii_signal ? currentWiiStatus.wii_signal.replace('_', ' ') : "--"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Matrix Interpretation</p>
                    </CardContent>
                </Card>

                {/* Karte: Netflow */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Netflow (24h)</CardTitle>
                        <ArrowRightLeft className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-xl font-bold ${
                            (currentWiiStatus?.exchange_netflow || 0) < 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                             {currentWiiStatus?.exchange_netflow !== undefined ? 
                                `${(currentWiiStatus.exchange_netflow).toLocaleString()} ₿` : "--"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {(currentWiiStatus?.exchange_netflow || 0) < 0 ? "Outflow (Bullish)" : "Inflow (Bearish)"}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* --- SEKTION 2: DEEP DIVE CHARTS --- */}
        <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Chart Links: Intent Analysis (WII) */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-700">Intent & Flow Analyse</h3>
                <div className="h-[450px]">
                    {fullHistory.length > 0 ? <IntentChart data={fullHistory} /> : null}
                </div>
            </div>

            {/* Chart Rechts: Market Context (WAI + BTC Price) */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-700">Markt-Kontext (WAI v2 vs Price)</h3>
                <div className="h-[450px]">
                     {fullHistory.length > 0 ? <ActivityChart data={fullHistory} /> : null}
                </div>
            </div>

        </div>

        {/* --- SEKTION 3: VOLUME CHART (Breit unten drunter) --- */}
        <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium text-slate-700">On-Chain Volumen Historie</h3>
            <div className="h-[350px]">
                 {fullHistory.length > 0 && <CombinedChart data={fullHistory} />}
            </div>
        </div>
        
      </div>
    </main>
  );
}