"use client"

import { useState, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock } from "lucide-react"; 

const CustomTooltip = ({ active, payload, label, i18n }: any) => {
  if (active && payload && payload.length) {
    const dateStr = new Date(label).toLocaleDateString(i18n.language === 'de' ? 'de-DE' : 'en-US', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    });

    return (
      <div className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-xl text-sm z-50">
        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            {dateStr}
        </p>
        <div className="flex items-center gap-3">
            <span className="block h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></span>
            <span className="text-lg font-bold tabular-nums text-neutral-900 dark:text-white">
                {Math.round(payload[0].value).toLocaleString()}
                <span className="text-xs font-normal text-neutral-500 ml-1">BTC</span>
            </span>
        </div>
      </div>
    );
  }
  return null;
};

interface Props {
  data: any;
}

function VolumeChart({ data }: Props) {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // State für Zeitrahmen (Standard 15 Tage)
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
    <Card className="w-full shadow-sm dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 transition-all hover:shadow-md">
      <CardHeader className="pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                {String(t('volume_chart_title_short', 'On-Chain Volumen'))}
            </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* SUB-HEADER: TIMEFRAME SELECTOR */}
        <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="h-3.5 w-3.5" />
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

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={filteredData} 
                margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
                onMouseMove={(state: any) => {
                    if (state.isTooltipActive) {
                        setActiveIndex(state.activeTooltipIndex);
                    } else {
                        setActiveIndex(null);
                    }
                }}
                onMouseLeave={() => setActiveIndex(null)}
            >
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0.2}/>
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
                tick={{fontSize: 10, fontFamily: 'monospace', fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
              />
              
              <Tooltip 
                cursor={{fill: 'transparent'}} 
                content={<CustomTooltip i18n={i18n} />} 
              />
              
              <Bar dataKey="volume" animationDuration={1000} radius={[4, 4, 0, 0]}>
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === activeIndex ? '#d8b4fe' : 'url(#purpleGradient)'} 
                    style={{ transition: 'all 0.2s ease' }} 
                    stroke={index === activeIndex ? '#fff' : 'none'}
                    strokeWidth={index === activeIndex ? 2 : 0}
                  />
                ))}
              </Bar>

            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(VolumeChart);