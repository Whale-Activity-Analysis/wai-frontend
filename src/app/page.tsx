import ActivityChart from "@/components/ActivityChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLatestWai, fetchWaiHistory } from "@/lib/api"; // Unsere neuen Funktionen
import { Bitcoin, TrendingUp, Activity, DollarSign } from "lucide-react"; // Krypto Icons

export default async function DashboardPage() {
  // Parallel Daten laden für maximale Geschwindigkeit
  const latestDataPromise = fetchLatestWai();
  const historyDataPromise = fetchWaiHistory();

  const [currentStatus, historyData] = await Promise.all([
    latestDataPromise, 
    historyDataPromise
  ]);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header - Jetzt im Finance Look */}
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
          
          {/* Karte 1: Der WAI Score */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Whale Activity Index (WAI)</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentStatus.wai_score ? currentStatus.wai_score.toFixed(2) : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Sentiment Indikator (0-100)
              </p>
            </CardContent>
          </Card>

          {/* Karte 2: Transaktionen / Wale (Anpassbar je nach echter API Response) */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Wale (24h)</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentStatus.active_whales || "--"} 
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Große Wallet-Bewegungen erkannt
              </p>
            </CardContent>
          </Card>

           {/* Karte 3: Letztes Update */}
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Letztes Update</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {currentStatus.timestamp ? new Date(currentStatus.timestamp).toLocaleTimeString() : "--:--"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {currentStatus.timestamp ? new Date(currentStatus.timestamp).toLocaleDateString() : ""}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="grid gap-4">
           {/* Wir geben die History-Daten an die Chart Komponente weiter */}
           <ActivityChart data={historyData} />
        </div>
        
      </div>
    </main>
  );
}