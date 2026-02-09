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
  ReferenceLine,
  Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal, Clock } from "lucide-react"; // <--- Clock kommt von hier!

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
                        {entry.dataKey === "exchange_netflow" 
                            ? `${Math.round(entry.value).toLocaleString()} ₿` 
                            : entry.value.toFixed(0)
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

function IntentChart({ data }: Props) {
  const { t, i18n } = useTranslation();
  const [timeframe, setTimeframe] = useState<number | null>(15);

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const reversed = [...data].reverse();
    return timeframe ? reversed.slice(-timeframe) : reversed;
  }, [data, timeframe]);

  if (!data || data.length === 0) return null;

  return (
    <Card className="w-full shadow-sm transition-all dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 overflow-hidden">
      <CardHeader className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Signal className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                    <CardTitle className="text-base font-bold">
                        {String(t('intent_chart_title', 'Whale Intent & Exchange Netflow'))}
                    </CardTitle>
                    <CardDescription className="text-[10px] uppercase tracking-widest font-bold mt-0.5">
                       {String(t('intent_chart_desc', 'Netflow < 0 (Grün) = Akkumulation | Netflow > 0 (Rot) = Distribution'))}
                    </CardDescription>
                </div>
            </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {/* Zeitrahmen-Leiste (Placement korrigiert) */}
        <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {timeframe ? `${timeframe} ${t('days_short', 'Tage')}` : t('all_time', 'Max')}
                </span>
            </div>
            
            <div className="flex bg-neutral-100 dark:bg-neutral-800/80 p-0.5 rounded-md border border-neutral-200 dark:border-neutral-700 shadow-inner">
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
                 <linearGradient id="wiiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                 </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-neutral-200/50 dark:text-neutral-800/20" />
              
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
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#6366f1'}}
                axisLine={false}
                tickLine={false}
              />

              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(val) => val >= 1000 || val <= -1000 ? `${(val / 1000).toFixed(0)}k` : val}
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip 
                content={<CustomTooltip t={t} i18n={i18n} />} 
                cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '3 3', className: 'text-neutral-400 dark:text-neutral-600' }}
              />

              <ReferenceLine 
                y={75} 
                yAxisId="left" 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
                opacity={0.5} 
                label={{ value: String(t('signal_selling_pressure', 'Dist')), fill: "#ef4444", fontSize: 9, fontWeight: 'bold', position: 'insideBottomLeft', dy: -5 }} 
              />
              <ReferenceLine 
                y={25} 
                yAxisId="left" 
                stroke="#22c55e" 
                strokeDasharray="3 3" 
                opacity={0.5} 
                label={{ value: String(t('signal_accumulation', 'Acc')), fill: "#22c55e", fontSize: 9, fontWeight: 'bold', position: 'insideTopLeft', dy: 5 }} 
              />

              <Bar yAxisId="right" dataKey="exchange_netflow" radius={[2, 2, 0, 0]} maxBarSize={40} isAnimationActive={false}>
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.exchange_netflow < 0 ? '#22c55e' : '#ef4444'} 
                    opacity={0.8}
                  />
                ))}
              </Bar>

              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="wii" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={false} 
                activeDot={{ r: 5, fill: 'white', stroke: '#6366f1', strokeWidth: 2 }}
                animationDuration={1000}
              />

            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(IntentChart);