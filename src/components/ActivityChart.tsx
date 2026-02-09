"use client"

import { useState, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
import { Eye, EyeOff, Activity as ActivityIcon, Clock } from "lucide-react"; 

const CustomTooltip = ({ active, payload, label, t, i18n }: any) => {
  if (active && payload && payload.length) {
    const dateStr = new Date(label).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', { 
        weekday: 'short', 
        day: '2-digit', 
        month: 'short' 
    });

    return (
      <div className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-xl text-sm z-50">
        <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-2 border-b border-neutral-100 dark:border-neutral-800 pb-1">
            {dateStr}
        </p>
        <div className="space-y-1.5 font-mono">
            {payload.map((entry: any, index: number) => (
                 <div key={index} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2" style={{ color: entry.color }}>
                        <span className="block h-2 w-2 rounded-full" style={{backgroundColor: entry.color}}></span>
                        <span className="text-neutral-600 dark:text-neutral-400 text-[10px] uppercase">
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
  const { t, i18n } = useTranslation();
  
  // States für Sichtbarkeit
  const [showV1, setShowV1] = useState(false); 
  const [showV2, setShowV2] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  
  // State für Zeitrahmen (Standard 15 Tage)
  const [timeframe, setTimeframe] = useState<number | null>(15);

  // Daten filtern & sortieren
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const reversed = [...data].reverse();
    return timeframe ? reversed.slice(-timeframe) : reversed;
  }, [data, timeframe]);

  if (!data || data.length === 0) {
    return (
      <Card className="w-full shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader><CardTitle>{String(t('market_context_analysis'))}</CardTitle></CardHeader>
        <CardContent>
          <div className="w-full h-[400px] flex items-center justify-center text-slate-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
            <p>{String(t('waiting_for_data'))}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm transition-all dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 overflow-hidden">
      {/* HEADER SECTION */}
      <CardHeader className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                    <ActivityIcon className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                    <CardTitle className="text-base font-bold">
                        {String(t('market_context_analysis', 'Market Context Analysis'))}
                    </CardTitle>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      {String(t('compare_whale_price', 'Whale activity vs. Price'))}
                    </p>
                </div>
            </div>

            {/* VISIBILITY TOGGLES */}
            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/50 p-1 rounded-lg self-start md:self-center">
                <Button 
                    variant="ghost" size="sm" onClick={() => setShowV2(!showV2)}
                    className={`h-7 px-3 text-[10px] uppercase font-bold transition-all ${showV2 ? "text-orange-500 bg-white dark:bg-neutral-700 shadow-sm" : "text-neutral-400"}`}
                >
                    WAI v2
                </Button>
                <Button 
                    variant="ghost" size="sm" onClick={() => setShowPrice(!showPrice)}
                    className={`h-7 px-3 text-[10px] uppercase font-bold transition-all ${showPrice ? "text-yellow-500 bg-white dark:bg-neutral-700 shadow-sm" : "text-neutral-400"}`}
                >
                    Price
                </Button>
                <Button 
                    variant="ghost" size="sm" onClick={() => setShowV1(!showV1)}
                    className={`h-7 px-3 text-[10px] uppercase font-bold transition-all ${showV1 ? "text-neutral-900 dark:text-white bg-white dark:bg-neutral-700 shadow-sm" : "text-neutral-400"}`}
                >
                    v1
                </Button>
            </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {/* SUB-HEADER: TIMEFRAME SELECTOR */}
        <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {timeframe ? `${timeframe} ${t('days_short', 'Days')}` : t('all_time', 'All Time')}
                </span>
            </div>
            
            <div className="flex bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-md border border-neutral-200 dark:border-neutral-700">
                {[7, 15, 30, null].map((tf) => (
                    <button
                        key={tf === null ? 'all' : tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1 text-[9px] font-black rounded uppercase transition-all ${
                            timeframe === tf 
                            ? "bg-orange-500 text-white shadow-md scale-105" 
                            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                    >
                        {tf ? `${tf}d` : 'Max'}
                    </button>
                ))}
            </div>
        </div>

        {/* CHART AREA */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
              data={filteredData} 
              margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.2}/>
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

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-neutral-200/50 dark:text-neutral-800/20" />
              
              <ReferenceLine 
                y={50} 
                yAxisId="left" 
                stroke="currentColor" 
                strokeDasharray="3 3" 
                className="text-neutral-300 dark:text-neutral-700" 
                label={{ 
                    value: `Neutral`, 
                    position: 'insideTopLeft', 
                    fill: '#888', 
                    fontSize: 9,
                    fontWeight: 'bold',
                    dy: -5
                }} 
              />

              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#94a3b8'}} 
                axisLine={false}
                tickLine={false}
                minTickGap={timeframe && timeframe <= 15 ? 10 : 40}
                dy={10}
              />
              
              <YAxis 
                yAxisId="left" 
                domain={[0, 100]} 
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#f97316'}} 
                axisLine={false}
                tickLine={false}
              />

              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={['auto', 'auto']}
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#eab308'}} 
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip 
                content={<CustomTooltip t={t} i18n={i18n} />} 
                cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '3 3', className: 'text-neutral-400 dark:text-neutral-600' }}
              />

              {showPrice && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="btc_close"
                    name={String(t('price', 'Bitcoin Price'))}
                    fill="url(#btcGradient)" 
                    stroke="#eab308"
                    strokeWidth={2}
                    fillOpacity={1}
                    animationDuration={1000}
                    activeDot={{ r: 4, strokeWidth: 0, fill: '#eab308' }}
                  />
              )}

              {showV1 && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="wai_v1" 
                    name="WAI v1"
                    stroke="#94a3b8" 
                    strokeWidth={1.5} 
                    dot={false}
                    strokeDasharray="5 5"
                    opacity={0.5}
                    animationDuration={1000}
                  />
              )}

              {showV2 && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="wai" 
                    name="WAI v2"
                    style={{ filter: 'url(#neonGlow)' }}
                    stroke="url(#waiGradient)" 
                    strokeWidth={3} 
                    dot={false}
                    activeDot={{ r: 5, stroke: '#f97316', strokeWidth: 2, fill: 'white' }}
                    animationDuration={1000}
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