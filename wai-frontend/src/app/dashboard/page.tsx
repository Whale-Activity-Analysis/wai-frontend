import ActivityChart from "@/components/ActivityChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhaleData } from "@/app/types";
import { Activity, Waves } from "lucide-react"; // Icons

// Simulierter API Call (Später durch echten fetch ersetzen)
async function getWhaleData(): Promise<WhaleData[]> {
  // Hier würdest du normalerweise machen:
  // const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/data', { cache: 'no-store' });
  // return res.json();

  // Mock Daten für jetzt:
  return [
    { timestamp: "2023-10-01", activityScore: 20, whaleCount: 2 },
    { timestamp: "2023-10-02", activityScore: 45, whaleCount: 5 },
    { timestamp: "2023-10-03", activityScore: 80, whaleCount: 12 },
    { timestamp: "2023-10-04", activityScore: 65, whaleCount: 8 },
    { timestamp: "2023-10-05", activityScore: 90, whaleCount: 15 },
  ];
}

export default async function Home() {
  const data = await getWhaleData();
  
  // Berechne aktuellen Score (letzter Eintrag)
  const currentStatus = data[data.length - 1];

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Waves className="h-10 w-10 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Whale Activity Index</h1>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktueller Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStatus.activityScore} / 100</div>
              <p className="text-xs text-muted-foreground">
                Basierend auf Echtzeitdaten
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gesichtete Wale</CardTitle>
              <Waves className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStatus.whaleCount}</div>
              <p className="text-xs text-muted-foreground">
                In den letzten 24 Stunden
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <ActivityChart data={data} />
        
      </div>
    </main>
  );
}