"use client"

import { useState, memo } from "react";
import { useTranslation } from "react-i18next"; // <--- Lokalisierung importiert
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

const CustomTooltip = ({ active, payload, label, t, i18n }: any) => {
  if (active && payload && payload.length) {
    // Dynamisches Datumsformat basierend auf der aktuellen Sprache
    const dateStr = new Date(label).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', { 
        weekday: 'short', 
        day: '2-digit', 
        month: 'short' 
    });

    return (
      <div className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(249,115,22,0.15)] text-sm">
        <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-2 border-b border-neutral-100 dark:border-neutral-800 pb-1">
            {dateStr}
        </p>
        <div className="space-y-1.5 font-mono">
            {payload.map((entry: any, index: number) => (
                 <div key={index} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2" style={{ color: entry.color }}>
                        <span className="block h-2 w-2 rounded-full" style={{backgroundColor: entry.color}}></span>
                        <span className="text-neutral-600 dark:text-neutral-400">
                            {/* Falls der Name übersetzbar sein soll, nutzen wir den Key oder den Default */}
                            {entry.name}:
                        </span>
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

function ActivityChart({ data }: Props) {
  const { t, i18n } = useTranslation(); // Hook initialisiert
  const [showV1, setShowV1] = useState(false); 
  const [showV2, setShowV2] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="w-full shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader><CardTitle>{String(t('market_context_analysis', 'Markt-Kontext'))}</CardTitle></CardHeader>
        <CardContent>
          <div className="w-full h-[400px] flex items-center justify-center text-slate-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
            <p>{String(t('waiting_for_data', 'Warte auf Live-Daten...'))}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data].reverse();

  return (
    <Card className="w-full shadow-sm transition-all dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 pb-6 border-b border-neutral-100 dark:border-neutral-800">
        <div>
            <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="h-5 w-5 text-orange-500" />
                {String(t('market_context_analysis', 'Markt-Kontext Analyse'))}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {String(t('compare_whale_price', 'Vergleiche Wal-Aktivität mit Preis'))}
            </p>
        </div>

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
                 {showPrice ? <Eye className="w-3 h-3 mr-1.5" /> : <EyeOff className="w-3 h-3 mr-1.5 opacity-50" />} {String(t('price', 'Price'))}
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
              
              <defs>
                <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
                
                 <linearGradient id="waiGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                 </linearGradient>

                <filter id="neonGlow" height="200%" width="200%" x="-50%" y="-50%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" /> 
                  <feMerge>
                    <feMergeNode in="blur" /> 
                    <feMergeNode in="SourceGraphic" /> 
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-neutral-200/50 dark:text-neutral-800/50" />
              
              <ReferenceLine 
                y={50} 
                yAxisId="left" 
                stroke="currentColor" 
                strokeDasharray="3 3" 
                className="text-neutral-300 dark:text-neutral-700" 
                strokeWidth={1} 
                opacity={0.5} 
                label={{ 
                    value: `${String(t('signal_neutral', 'Neutral'))} (50)`, 
                    position: 'insideTopLeft', 
                    fill: '#888', 
                    fontSize: 10 
                }} 
              />

              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#94a3b8'}} 
                axisLine={false}
                tickLine={false}
                minTickGap={30}
                dy={10}
              />
              
              <YAxis 
                yAxisId="left" 
                domain={[0, 100]} 
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#f97316'}} 
                axisLine={false}
                tickLine={false}
                dx={-10}
              />

              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={['auto', 'auto']}
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#eab308'}} 
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
                dx={10}
              />

              <Tooltip 
                content={<CustomTooltip t={t} i18n={i18n} />} // <--- t und i18n an CustomTooltip übergeben
                cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '3 3', className: 'text-neutral-400 dark:text-neutral-600' }}
                wrapperStyle={{ outline: 'none' }}
              />

              {showPrice && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="btc_close"
                    name={String(t('price', 'Bitcoin Preis'))}
                    fill="url(#btcGradient)" 
                    stroke="#eab308"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    animationDuration={700}
                    activeDot={{ r: 4, strokeWidth: 0, fill: '#eab308' }}
                  />
              )}

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

              {showV2 && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="wai" 
                    name="WAI v2 (Live)"
                    style={{ filter: 'url(#neonGlow)' }}
                    stroke="url(#waiGradient)" 
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

export default memo(ActivityChart);