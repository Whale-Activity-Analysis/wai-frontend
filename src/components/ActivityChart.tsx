"use client"

import { useState } from "react";
import { 
  ComposedChart, 
  Line, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Activity as ActivityIcon } from "lucide-react"; 

// --- 1. CUSTOM TOOLTIP KOMPONENTE ---
// Diese Komponente ersetzt das Standard-Popup beim Drüberfahren.
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dateStr = new Date(label).toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short' });
    return (
      // Glasmorphismus-Look (Blur + Transparenz)
      <div className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(249,115,22,0.15)] text-sm">
        <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-2 border-b border-neutral-100 dark:border-neutral-800 pb-1">
            {dateStr}
        </p>
        <div className="space-y-1.5 font-mono">
            {payload.map((entry: any, index: number) => (
                 <div key={index} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2" style={{ color: entry.color }}>
                        {/* Kleiner farbiger Punkt vor dem Namen */}
                        <span className="block h-2 w-2 rounded-full" style={{backgroundColor: entry.color}}></span>
                        <span className="text-neutral-600 dark:text-neutral-400">{entry.name}:</span>
                    </span>
                    <span className="font-bold tabular-nums" style={{ color: entry.color }}>
                        {entry.dataKey === "btc_close" 
                            ? `$${entry.value.toLocaleString()}` 
                            : entry.value.toFixed(1)
                        }
                    </span>
                 </div>
            ))}
        </div>
      </div>
    );
  }
  return null;
};


interface Props {
  data: any[];
}

export default function ActivityChart({ data }: Props) {
  const [showV1, setShowV1] = useState(false); // Legacy standardmäßig aus für cleaneren Look
  const [showV2, setShowV2] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  // Safety Check (unverändert)
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="w-full shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader><CardTitle>Markt-Kontext</CardTitle></CardHeader>
        <CardContent>
          <div className="w-full h-[400px] flex items-center justify-center text-slate-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
            <p>Warte auf Live-Daten...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data].reverse();

  return (
    // Card styling für Dark Mode angepasst
    <Card className="w-full shadow-sm transition-all dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 pb-6 border-b border-neutral-100 dark:border-neutral-800">
        <div>
            <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="h-5 w-5 text-orange-500" />
                Markt-Kontext Analyse
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Vergleiche Wal-Aktivität mit Preis
            </p>
        </div>

        {/* Buttons (Optisch leicht angepasst) */}
        <div className="flex flex-wrap gap-2 bg-neutral-100 dark:bg-neutral-800/50 p-1 rounded-lg">
            <Button 
                variant={showV2 ? "default" : "ghost"} size="sm" onClick={() => setShowV2(!showV2)}
                className={`text-xs ${showV2 ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
            >
                {showV2 ? <Eye className="w-3 h-3 mr-1.5" /> : <EyeOff className="w-3 h-3 mr-1.5 opacity-50" />} WAI v2
            </Button>
            <Button 
                variant={showPrice ? "default" : "ghost"} size="sm" onClick={() => setShowPrice(!showPrice)}
                className={`text-xs ${showPrice ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"}`}
            >
                 {showPrice ? <Eye className="w-3 h-3 mr-1.5" /> : <EyeOff className="w-3 h-3 mr-1.5 opacity-50" />} Price
            </Button>
            <Button 
                variant={showV1 ? "secondary" : "ghost"} size="sm" onClick={() => setShowV1(!showV1)}
                className={`text-xs ${showV1 ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white dashed border-transparent"}`}
            >
                {showV1 ? "v1" : "v1 off"}
            </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
              
              {/* --- 2. DEFINITIONEN FÜR GLOW & GRADIENTS --- */}
              <defs>
                {/* Verlauf für Bitcoin Area (Gelb zu Transparent) */}
                <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
                
                {/* Verlauf für WAI Line Stroke (Optional, macht die Linie selbst interessanter) */}
                 <linearGradient id="waiGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                 </linearGradient>

                {/* Neon Glow Filter (SVG Magie) */}
                <filter id="neonGlow" height="200%" width="200%" x="-50%" y="-50%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" /> {/* Stärke des Blurs */}
                  <feMerge>
                    <feMergeNode in="blur" /> {/* Der unscharfe Schein */}
                    <feMergeNode in="SourceGraphic" /> {/* Die scharfe Linie darüber */}
                  </feMerge>
                </filter>
              </defs>

              {/* Subtileres Grid */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-neutral-200/50 dark:text-neutral-800/50" />
              
              {/* Referenzlinie bei 50 (Neutral) */}
              <ReferenceLine y={50} yAxisId="left" stroke="currentColor" strokeDasharray="3 3" className="text-neutral-300 dark:text-neutral-700" strokeWidth={1} opacity={0.5} label={{ value: "Neutral (50)", position: 'insideTopLeft', fill: '#888', fontSize: 10 }} />

              {/* Achsen mit Monospace Font für Zahlen */}
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#94a3b8'}} // Helles Grau im Dark Mode
                axisLine={false}
                tickLine={false}
                minTickGap={30}
                dy={10}
              />
              
              <YAxis 
                yAxisId="left" 
                domain={[0, 100]} 
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#f97316'}} // Orange für WAI Achse
                axisLine={false}
                tickLine={false}
                dx={-10}
                // label={{ value: 'WAI Score', angle: -90, position: 'insideLeft', fill: '#f97316', fontSize: 12 }}
              />

              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={['auto', 'auto']}
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#eab308'}} // Gelb für Preis Achse
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
                dx={10}
              />

              {/* Fadenkreuz Cursor und Custom Tooltip */}
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '3 3', className: 'text-neutral-400 dark:text-neutral-600' }}
                wrapperStyle={{ outline: 'none' }}
              />

              {/* Bitcoin Area mit Verlauf */}
              {showPrice && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="btc_close"
                    name="Bitcoin Preis"
                    fill="url(#btcGradient)" // Verweis auf den Gradient oben
                    stroke="#eab308"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    animationDuration={700}
                    activeDot={{ r: 4, strokeWidth: 0, fill: '#eab308' }}
                  />
              )}

               {/* Legacy Linie (Subtiler) */}
              {showV1 && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="wai_v1" 
                    name="WAI v1 (Legacy)"
                    stroke="#94a3b8" 
                    strokeWidth={1.5} 
                    dot={false}
                    strokeDasharray="4 4"
                    opacity={0.6}
                    animationDuration={700}
                    activeDot={{ r: 4, strokeWidth: 0, fill: '#94a3b8' }}
                  />
              )}

              {/* DIE NEON LINIE (WAI v2) */}
              {showV2 && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="wai" 
                    name="WAI v2 (Live)"
                    // Hier wird der Neon-Filter angewendet
                    style={{ filter: 'url(#neonGlow)' }}
                    stroke="url(#waiGradient)" // Verlauf auf der Linie selbst
                    strokeWidth={3} 
                    dot={false}
                    activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: 'white' }}
                    animationDuration={700}
                  />
              )}
              
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}