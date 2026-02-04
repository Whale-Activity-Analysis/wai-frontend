"use client"

import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react"; // Icon für Combined/Layers

// --- CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-xl text-sm z-50">
        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
            {new Date(label).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
        </p>
        <div className="space-y-2">
            
            {/* WAI INDEX (Orange) */}
            <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-orange-500">
                    <span className="block h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"></span>
                    WAI Index:
                </span>
                <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                    {payload.find((p: any) => p.dataKey === 'wai')?.value.toFixed(0)}
                </span>
            </div>

            {/* VOLUMEN (Blau) */}
            <div className="flex items-center justify-between gap-4">
                 <span className="flex items-center gap-2 text-blue-500">
                    <span className="block h-2 w-2 rounded-sm bg-blue-500"></span>
                    Volumen:
                </span>
                <span className="font-bold tabular-nums text-neutral-700 dark:text-neutral-300">
                    {Math.round(payload.find((p: any) => p.dataKey === 'volume')?.value).toLocaleString()} <span className="text-xs font-normal text-neutral-500">BTC</span>
                </span>
            </div>
        </div>
      </div>
    );
  }
  return null;
};

interface Props {
  data: any;
}

export default function CombinedChart({ data }: Props) {
  let chartData = [];
  if (Array.isArray(data)) chartData = data;
  else if (data && Array.isArray(data.items)) chartData = data.items;
  else if (data && Array.isArray(data.data)) chartData = data.data;

  // Umdrehen (alt -> neu)
  const sortedData = [...chartData].reverse();

  return (
    <Card className="w-full shadow-sm transition-all dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 overflow-hidden">
      <CardHeader className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                    Markt-Analyse (Index vs. Volumen)
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                    Korrelation zwischen Wal-Aktivität (Linie) und Volumen (Balken).
                </p>
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
              
              <defs>
                {/* Verlauf für Volumen-Balken (Blau) */}
                <linearGradient id="combinedVolGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>

                {/* Glow Filter für die WAI Linie */}
                <filter id="glowCombined" height="200%" width="200%" x="-50%" y="-50%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-neutral-200/50 dark:text-neutral-800/30" />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                scale="band" 
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              
              {/* Linke Y-Achse: WAI Index (0-100) */}
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                domain={[0, 100]} 
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#f97316'}}
                axisLine={false}
                tickLine={false}
                label={{ value: 'WAI Index', angle: -90, position: 'insideLeft', fill: '#f97316', fontSize: 10, dx: 10 }}
              />

              {/* Rechte Y-Achse: Volumen (BTC) */}
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#3b82f6'}}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} 
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              
              {/* VOLUMEN BALKEN (Hintergrund) */}
              <Bar 
                yAxisId="right"
                dataKey="volume" 
                name="Volumen (BTC)" 
                fill="url(#combinedVolGradient)" 
                barSize={20}
                radius={[4, 4, 0, 0]}
              />

              {/* WAI LINIE (Vordergrund, mit Glow) */}
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="wai" 
                name="WAI Index"
                stroke="#f97316" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6, fill: '#fff', stroke: '#f97316', strokeWidth: 2 }}
                style={{ filter: 'url(#glowCombined)' }} // Neon Effekt
                animationDuration={1500}
              />
              
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}