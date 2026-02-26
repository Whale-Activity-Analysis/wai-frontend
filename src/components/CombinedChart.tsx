"use client"

import { useState, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Clock as ClockIcon } from "lucide-react"; 

const CustomTooltip = ({ active, payload, label, t, i18n }: any) => {
  if (active && payload && payload.length) {
    const dateStr = new Date(label).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', { 
      day: '2-digit', 
      month: 'short' 
    });

    return (
      <div className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-xl text-sm z-50">
        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
            {dateStr}
        </p>
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-orange-500">
                    <span className="block h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]"></span>
                    WAI Index:
                </span>
                <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                    {payload.find((p: any) => p.dataKey === 'wai')?.value.toFixed(0)}
                </span>
            </div>
            <div className="flex items-center justify-between gap-4">
                 <span className="flex items-center gap-2 text-blue-500">
                    <span className="block h-2 w-2 rounded-sm bg-blue-500"></span>
                    {String(t('volume_label', 'Volumen'))}:
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

function CombinedChart({ data }: Props) {
  const { t, i18n } = useTranslation();
  const [timeframe, setTimeframe] = useState<number | null>(15);

  // Daten filtern & sortieren
  const filteredData = useMemo(() => {
    let chartData = [];
    if (Array.isArray(data)) chartData = data;
    else if (data && Array.isArray(data.items)) chartData = data.items;
    else if (data && Array.isArray(data.data)) chartData = data.data;

    const reversed = [...chartData].reverse();
    return timeframe ? reversed.slice(-timeframe) : reversed;
  }, [data, timeframe]);

  return (
    <Card className="w-full shadow-sm transition-all dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 overflow-hidden">
      <CardHeader className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Layers className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                    <CardTitle className="text-base font-bold">
                        {String(t('volume_chart_title', 'Markt-Analyse (Index vs. Volumen)'))}
                    </CardTitle>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        {String(t('volume_chart_subtitle', 'Korrelation zwischen Wal-Aktivität (Linie) und Volumen (Balken).'))}
                    </p>
                </div>
            </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* SUB-HEADER: TIMEFRAME SELECTOR */}
        <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2 text-neutral-400">
                <ClockIcon className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {timeframe ? `${timeframe} ${t('days_short', 'Tage')}` : t('all_time', 'Max')}
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

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart 
                data={filteredData} 
                margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="combinedVolGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>

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
                tickFormatter={(str) => new Date(str).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', {day: '2-digit', month: '2-digit'})}
                scale="band" 
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
                minTickGap={timeframe && timeframe <= 15 ? 10 : 40}
                dy={10}
              />
              
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                domain={[0, 100]} 
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#f97316'}}
                axisLine={false}
                tickLine={false}
              />

              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#3b82f6'}}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} 
                axisLine={false}
                tickLine={false}
              />

              <Tooltip 
                content={<CustomTooltip t={t} i18n={i18n} />} 
                cursor={{fill: 'transparent'}} 
              />
              
              <Bar 
                yAxisId="right"
                dataKey="volume" 
                name={String(t('volume_label', 'Volumen (BTC)'))} 
                fill="url(#combinedVolGradient)" 
                barSize={20}
                radius={[4, 4, 0, 0]}
              />

              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="wai" 
                name="WAI Index"
                stroke="#f97316" 
                strokeWidth={3} 
                dot={false} 
                activeDot={{ r: 6, fill: '#fff', stroke: '#f97316', strokeWidth: 2 }}
                style={{ filter: 'url(#glowCombined)' }} 
                animationDuration={1500}
              />
              
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(CombinedChart);