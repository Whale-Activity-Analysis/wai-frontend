"use client"

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Target, TrendingDown, TrendingUp, Info } from "lucide-react";

// --- 1. INTERFACES AN DAS NEUE JSON ANGEPASST ---

interface ReturnStats {
  avg_return_pct: number;
  sample_size: number;
  win_rate_pct?: number;      // Nur bei Accumulation vorhanden
  decline_rate_pct?: number;  // Nur bei Selling vorhanden
}

interface SignalGroup {
  count: number;
  signal: string;
  returns: {
    [key: string]: ReturnStats; // "3d", "7d", "14d"
  };
}

interface ValidationData {
  data_points: number;
  date_range: { start: string; end: string };
  accumulation: SignalGroup;
  selling_pressure: SignalGroup;
  neutral: SignalGroup;
  marketing_message: string;
}

interface Props {
  data: ValidationData;
}

export default function ValidationStats({ data }: Props) {
  // Sicherheits-Check
  if (!data || !data.accumulation) {
    return (
        <Card className="w-full h-[300px] flex items-center justify-center text-slate-400 border-dashed bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
            Keine Validierungsdaten verfügbar
        </Card>
    );
  }

  // --- 2. DATEN TRANSFORMATION ---
  const timeframes = ["3d", "7d", "14d"];
  
  const chartData = timeframes.map(tf => {
    // Accumulation Daten
    const accStats = data.accumulation.returns[tf];
    const accReturn = accStats?.avg_return_pct || 0;
    const accWinRate = accStats?.win_rate_pct || 0;

    // Selling Daten
    const sellStats = data.selling_pressure.returns[tf];
    const sellReturn = sellStats?.avg_return_pct || 0;
    // Bei Selling nutzen wir decline_rate_pct als "Erfolgsquote"
    const sellSuccessRate = sellStats?.decline_rate_pct || 0;
    
    return {
      name: tf.replace("d", " Tage"), 
      raw_tf: tf,
      
      // Werte für den Chart (Balken)
      acc_return: accReturn,
      sell_return: sellReturn,
      
      // Werte für Tooltip & Tabelle
      acc_win: accWinRate,
      sell_win: sellSuccessRate, 
    };
  });

  // --- 3. CUSTOM TOOLTIP ---
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white dark:bg-neutral-900 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl text-sm">
          <p className="font-bold mb-2 text-neutral-700 dark:text-neutral-200">{label} Performance</p>
          
          {/* Accumulation */}
          <div className="mb-3">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <TrendingUp className="h-3 w-3" /> Accumulation
            </div>
            <div className="grid grid-cols-2 gap-x-4 pl-5 text-xs text-neutral-500 dark:text-neutral-400">
                <span>Avg Return:</span>
                <span className={d.acc_return >= 0 ? "text-green-600 font-mono" : "text-red-500 font-mono"}>
                    {d.acc_return.toFixed(2)}%
                </span>
                <span>Win Rate:</span>
                <span className="font-mono">{d.acc_win}%</span>
            </div>
          </div>

          {/* Selling */}
          <div>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                <TrendingDown className="h-3 w-3" /> Selling Pressure
            </div>
            <div className="grid grid-cols-2 gap-x-4 pl-5 text-xs text-neutral-500 dark:text-neutral-400">
                <span>Avg Return:</span>
                <span className={d.sell_return >= 0 ? "text-green-600 font-mono" : "text-red-500 font-mono"}>
                    {d.sell_return.toFixed(2)}%
                </span>
                <span>Drop Rate:</span>
                <span className="font-mono">{d.sell_win}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full shadow-sm bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
                <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Target className="h-5 w-5 text-orange-500" />
                    Signal Validierung (Backtest)
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                    {/* --- MARKETING MESSAGE BADGE --- */}
                    <div className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
                        <Info className="h-3 w-3 mr-1.5" />
                        {data.marketing_message}
                    </div>
                </div>
            </div>
            
            {/* Metadaten */}
            <div className="flex flex-wrap gap-2 justify-end">
                <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    <Calendar className="mr-1.5 h-3 w-3" />
                    {data.date_range.end} - {data.date_range.start}
                </span>
                <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    Total: {data.data_points} Signale
                </span>
            </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* CHART BEREICH */}
        <div className="h-[320px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" strokeOpacity={0.2} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#888' }} stroke="#888888" />
              <YAxis 
                tickFormatter={(val) => `${val}%`} 
                tick={{ fontSize: 12, fill: '#888' }} 
                domain={['auto', 'auto']} 
                stroke="#888888"
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              <Legend verticalAlign="top" height={36} />
              
              {/* Nulllinie */}
              <ReferenceLine y={0} stroke="#666" strokeWidth={1} />

              <Bar name="Accumulation (Avg Return)" dataKey="acc_return" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar name="Selling (Avg Return)" dataKey="sell_return" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* --- DETAIL TABELLE (ACCURACY) --- */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
             {chartData.map((item) => (
                 <div key={item.raw_tf} className="flex flex-col items-center">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{item.name}</span>
                    
                    <div className="w-full flex justify-between px-2 md:px-6">
                        {/* WIN RATE LINKS */}
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-neutral-400 mb-1">Buy Win Rate</span>
                            <div className="relative flex items-center justify-center">
                                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                                    {/* Kreis Hintergrund */}
                                    <path className="text-neutral-100 dark:text-neutral-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    {/* Kreis Fortschritt (Grün) */}
                                    <path className={`${item.acc_win > 50 ? 'text-green-500' : 'text-neutral-400'} transition-all duration-1000`} strokeDasharray={`${item.acc_win}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <span className="absolute text-[10px] font-bold text-neutral-700 dark:text-neutral-300">{item.acc_win}%</span>
                            </div>
                        </div>

                        {/* DROP RATE RECHTS */}
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-neutral-400 mb-1">Sell Accuracy</span>
                            <div className="relative flex items-center justify-center">
                                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-neutral-100 dark:text-neutral-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    {/* Kreis Fortschritt (Rot) */}
                                    <path className={`${item.sell_win > 50 ? 'text-red-500' : 'text-neutral-400'} transition-all duration-1000`} strokeDasharray={`${item.sell_win}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <span className="absolute text-[10px] font-bold text-neutral-700 dark:text-neutral-300">{item.sell_win}%</span>
                            </div>
                        </div>
                    </div>
                 </div>
             ))}
        </div>

      </CardContent>
    </Card>
  );
}