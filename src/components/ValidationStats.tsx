"use client"

import { useTranslation } from "react-i18next"; // Lokalisierung importiert
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

// --- INTERFACES ---
interface ReturnStats {
  avg_return_pct: number;
  sample_size: number;
  win_rate_pct?: number;
  decline_rate_pct?: number;
}

interface SignalGroup {
  count: number;
  signal: string;
  returns: {
    [key: string]: ReturnStats;
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
  const { t } = useTranslation();

  if (!data || !data.accumulation) {
    return (
        <Card className="w-full h-[300px] flex items-center justify-center text-slate-400 border-dashed bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
            {String(t('no_validation_data', 'Keine Validierungsdaten verfügbar'))}
        </Card>
    );
  }

  const timeframes = ["3d", "7d", "14d"];
  
  const chartData = timeframes.map(tf => {
    const accStats = data.accumulation.returns[tf];
    const accReturn = accStats?.avg_return_pct || 0;
    const accWinRate = accStats?.win_rate_pct || 0;

    const sellStats = data.selling_pressure.returns[tf];
    const sellReturn = sellStats?.avg_return_pct || 0;
    const sellSuccessRate = sellStats?.decline_rate_pct || 0;
    
    return {
      // "Tage" bzw "Days" übersetzen
      name: tf.replace("d", ` ${String(t('days_short', 'Tage'))}`), 
      raw_tf: tf,
      acc_return: accReturn,
      sell_return: sellReturn,
      acc_win: accWinRate,
      sell_win: sellSuccessRate, 
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white dark:bg-neutral-900 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl text-sm">
          <p className="font-bold mb-2 text-neutral-700 dark:text-neutral-200">{label} {String(t('performance', 'Performance'))}</p>
          
          <div className="mb-3">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <TrendingUp className="h-3 w-3" /> {String(t('signal_accumulation', 'Accumulation'))}
            </div>
            <div className="grid grid-cols-2 gap-x-4 pl-5 text-xs text-neutral-500 dark:text-neutral-400">
                <span>{String(t('avg_return', 'Avg Return'))}:</span>
                <span className={d.acc_return >= 0 ? "text-green-600 font-mono" : "text-red-500 font-mono"}>
                    {d.acc_return.toFixed(2)}%
                </span>
                <span>{String(t('win_rate', 'Win Rate'))}:</span>
                <span className="font-mono">{d.acc_win}%</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                <TrendingDown className="h-3 w-3" /> {String(t('signal_selling_pressure', 'Selling Pressure'))}
            </div>
            <div className="grid grid-cols-2 gap-x-4 pl-5 text-xs text-neutral-500 dark:text-neutral-400">
                <span>{String(t('avg_return', 'Avg Return'))}:</span>
                <span className={d.sell_return >= 0 ? "text-green-600 font-mono" : "text-red-500 font-mono"}>
                    {d.sell_return.toFixed(2)}%
                </span>
                <span>{String(t('drop_rate', 'Drop Rate'))}:</span>
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
                    {String(t('signal_validation_title', 'Signal Validierung (Backtest)'))}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                    <div className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
                        <Info className="h-3 w-3 mr-1.5" />
                        {/* Marketing Message kommt oft direkt aus der API, falls nicht: t() nutzen */}
                        {data.marketing_message}
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-end">
                <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    <Calendar className="mr-1.5 h-3 w-3" />
                    {data.date_range.end} - {data.date_range.start}
                </span>
                <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                    Total: {data.data_points} {String(t('signals_count', 'Signale'))}
                </span>
            </div>
        </div>
      </CardHeader>

      <CardContent>
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
              
              <ReferenceLine y={0} stroke="#666" strokeWidth={1} />

              <Bar name={String(t('acc_return_legend', 'Accumulation (Avg Return)'))} dataKey="acc_return" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar name={String(t('sell_return_legend', 'Selling (Avg Return)'))} dataKey="sell_return" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
             {chartData.map((item) => (
                 <div key={item.raw_tf} className="flex flex-col items-center">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{item.name}</span>
                    
                    <div className="w-full flex justify-between px-2 md:px-6">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-neutral-400 mb-1">{String(t('buy_win_rate', 'Buy Win Rate'))}</span>
                            <div className="relative flex items-center justify-center">
                                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-neutral-100 dark:text-neutral-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                    <path className={`${item.acc_win > 50 ? 'text-green-500' : 'text-neutral-400'} transition-all duration-1000`} strokeDasharray={`${item.acc_win}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                </svg>
                                <span className="absolute text-[10px] font-bold text-neutral-700 dark:text-neutral-300">{item.acc_win}%</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-neutral-400 mb-1">{String(t('sell_accuracy', 'Sell Accuracy'))}</span>
                            <div className="relative flex items-center justify-center">
                                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-neutral-100 dark:text-neutral-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
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