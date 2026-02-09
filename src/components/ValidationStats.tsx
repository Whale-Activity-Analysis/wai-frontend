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
// HIER: Badge Import entfernt, da du die Datei nicht hast!
import { Calendar, Target } from "lucide-react";

interface ValidationData {
  data_points: number;
  date_range: { start: string; end: string };
  accumulation: SignalStats;
  selling_pressure: SignalStats;
}

interface SignalStats {
  count: number;
  signal: string;
  returns: {
    [key: string]: { 
      avg_return_pct: number;
      win_rate_pct: number;
      sample_size: number;
    }
  }
}

interface Props {
  data: ValidationData;
}

export default function ValidationStats({ data }: Props) {
  if (!data || !data.accumulation) {
    return (
        <Card className="w-full h-[300px] flex items-center justify-center text-slate-400 border-dashed">
            Keine Validierungsdaten verfügbar
        </Card>
    );
  }

  // Daten Transformation
  const timeframes = ["3d", "7d", "14d"];
  const chartData = timeframes.map(tf => {
    const accReturn = data.accumulation?.returns[tf]?.avg_return_pct || 0;
    const sellReturn = data.selling_pressure?.returns[tf]?.avg_return_pct || 0;
    
    return {
      name: tf.replace("d", " Tage"), 
      raw_tf: tf,
      acc_return: accReturn,
      sell_return: sellReturn,
      acc_win: data.accumulation?.returns[tf]?.win_rate_pct || 0,
      sell_win: data.selling_pressure?.returns[tf]?.win_rate_pct || 0,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-neutral-900 p-3 border dark:border-neutral-800 rounded-lg shadow-lg text-sm">
          <p className="font-bold mb-2 text-slate-700 dark:text-slate-200">{label} Performance</p>
          
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Accumulation:</span>
            <span className="font-mono font-bold">{payload[0].value.toFixed(2)}% ROI</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 pl-4 mb-2">
            Win Rate: {payload[0].payload.acc_win}%
          </div>

          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-1">
             <span className="w-2 h-2 rounded-full bg-red-500"></span>
             <span>Selling Pressure:</span>
             <span className="font-mono font-bold">{payload[1]?.value.toFixed(2)}% ROI</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 pl-4">
            Win Rate: {payload[1]?.payload.sell_win}%
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full shadow-sm bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-white">
                    <Target className="h-5 w-5 text-orange-500" />
                    Signal Validierung (Backtest)
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                    Performance nach Signal-Trigger (Durchschnittliche Rendite)
                </p>
            </div>
            
            {/* Metadaten Badges (Jetzt als einfache SPANS gelöst) */}
            <div className="flex flex-wrap gap-2">
                {/* Ersatz für Badge variant="outline" */}
                <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    <Calendar className="mr-1 h-3 w-3" />
                    {data.date_range.end} bis {data.date_range.start}
                </span>
                
                {/* Ersatz für Badge variant="secondary" */}
                <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    N = {data.data_points} Signale
                </span>
            </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* CHART BEREICH */}
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888888" />
              <YAxis 
                tickFormatter={(val) => `${val}%`} 
                tick={{ fontSize: 12 }} 
                domain={['auto', 'auto']} 
                stroke="#888888"
              />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              <Legend />
              
              <ReferenceLine y={0} stroke="#94a3b8" />

              <Bar name="Accumulation (Buy)" dataKey="acc_return" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar name="Selling Pressure (Sell)" dataKey="sell_return" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* WIN RATE TABELLE */}
        <div className="grid grid-cols-3 gap-4 mt-6 border-t border-neutral-100 dark:border-neutral-800 pt-4">
             {chartData.map((item) => (
                 <div key={item.raw_tf} className="text-center">
                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-2">{item.name}</p>
                    <div className="flex justify-center gap-4 text-sm">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-400">Win Rate Buy</span>
                            <span className={`font-bold ${item.acc_win > 50 ? 'text-green-600 dark:text-green-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                {item.acc_win}%
                            </span>
                        </div>
                        <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-400">Win Rate Sell</span>
                             <span className={`font-bold ${item.sell_win > 50 ? 'text-green-600 dark:text-green-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
                                {item.sell_win}%
                            </span>
                        </div>
                    </div>
                 </div>
             ))}
        </div>

      </CardContent>
    </Card>
  );
}