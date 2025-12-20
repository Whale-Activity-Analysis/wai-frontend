import ActivityChart from "@/components/ActivityChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLatestWai, fetchWaiHistory } from "@/lib/api"; 
import { Bitcoin, TrendingUp, Activity, DollarSign } from "lucide-react"; 
import VolumeChart from "@/components/VolumeChart";
import CombinedChart from "@/components/CombinedChart";

export default async function DashboardPage() {
  // Wir holen uns die Historie, da wir wissen, dass die funktioniert
  const historyResponse = await fetchWaiHistory();

  // Daten extrahieren:
  // Die API liefert { count: 19, data: [...] }
  // Wir nehmen das Array aus "data".
  const historyData = historyResponse.data || [];
  
  // Der aktuellste Eintrag ist der erste in der Liste (Index 0), laut deinem JSON
  const currentStatus = historyData.length > 0 ? historyData[0] : {};

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
          
          {/* Karte 1: WAI Index */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Whale Activity Index (WAI)</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* Hier prüfen wir auf 'wai_index' */}
                {currentStatus.wai_index !== undefined ? currentStatus.wai_index : "--"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Sentiment Indikator (0-100)
              </p>
            </CardContent>
          </Card>

          {/* Karte 2: Whale TX Count */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Whale Transaktionen</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* Hier prüfen wir auf 'whale_tx_count' */}
                {currentStatus.whale_tx_count !== undefined ? currentStatus.whale_tx_count : "--"} 
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Große Bewegungen (&gt;100 BTC)
              </p>
            </CardContent>
          </Card>

           {/* Karte 3: Datum */}
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Datenstand</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                 {/* Hier prüfen wir auf 'date' */}
                {currentStatus.date ? new Date(currentStatus.date).toLocaleDateString() : "--"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Täglicher Abschluss
              </p>
            </CardContent>
          </Card>
        </div>

{/* Chart Section */}
        <div className="grid gap-4">
           <ActivityChart data={historyResponse} />
           {/* Das neue Volumen-Chart */}
           <VolumeChart data={historyResponse} />
           {/* Das neue Volumen-Chart */}
           <CombinedChart data={historyResponse} />
        </div>
        


      </div>
    </main>
  );
}