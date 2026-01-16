'use client';

import { useEffect, useState } from "react";
import ActivityChart from "@/components/ActivityChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLatestWai, fetchWaiHistory } from "@/lib/api";
import { Bitcoin, TrendingUp, Activity, DollarSign, Loader2, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const [currentStatus, setCurrentStatus] = useState<any>(null);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        console.log("Starte Datenabruf...");
        
        const [latestData, historyData] = await Promise.all([
          fetchLatestWai(),
          fetchWaiHistory()
        ]);

        console.log("Daten erhalten:", latestData);

        setCurrentStatus(latestData);
        setHistoryData(historyData);
      } catch (err: any) {
        console.error("Fehler im Frontend:", err);
        setError(err.message || "Unbekannter Fehler beim Laden");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
          <p className="text-slate-500">Lade Wal-Daten...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-500" />
            <h2 className="text-lg font-bold text-slate-800">Fehler beim Laden</h2>
          </div>
          <p className="text-slate-600 mb-4">{error}</p>
          <p className="text-xs text-slate-400">
            Tipp: Falls hier "Network Error" steht und du auf GitHub Pages bist, blockiert der Browser wahrscheinlich HTTP-Anfragen (Mixed Content).
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Bitcoin className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Bitcoin Whale Index</h1>
            <p className="text-slate-500">On-Chain Analyse großer Wallet-Bewegungen</p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Karte 1: WAI Score */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Whale Activity Index (WAI)</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentStatus?.wai_score ? currentStatus.wai_score.toFixed(2) : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Sentiment Indikator (0-100)
              </p>
            </CardContent>
          </Card>

          {/* Karte 2: Aktive Wale */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Wale (24h)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentStatus?.active_whales || "--"} 
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Große Wallet-Bewegungen erkannt
              </p>
            </CardContent>
          </Card>

           {/* Karte 3: Timestamp */}
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Letztes Update</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {currentStatus?.timestamp ? new Date(currentStatus.timestamp).toLocaleTimeString() : "--:--"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {currentStatus?.timestamp ? new Date(currentStatus.timestamp).toLocaleDateString() : ""}
              </p>
            </CardContent>
          </Card>
        </div>

{/* Chart Section */}
        {/* WICHTIG: h-[400px] definiert die Höhe! */}
        <div className="grid gap-4 w-full h-[400px]">
           <ActivityChart data={historyData} />
        </div>
        
      </div>
    </main>
  );
}
