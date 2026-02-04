"use client"

import { memo } from "react"; // <--- MEMO IMPORT
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
import { Signal } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl shadow-xl text-sm z-50">
        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
            {new Date(label).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
        </p>
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-indigo-500">
                    <span className="block h-2 w-2 rounded-full bg-indigo-500"></span>
                    WII Score:
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">
                    {payload.find((p: any) => p.dataKey === 'wii')?.value.toFixed(0)}
                </span>
            </div>
            <div className="flex items-center justify-between gap-4">
                 <span className="flex items-center gap-2 text-neutral-500">
                    <span className="block h-2 w-2 rounded-sm bg-neutral-500"></span>
                    Netflow:
                </span>
                <span className={`font-bold tabular-nums ${payload.find((p: any) => p.dataKey === 'exchange_netflow')?.value < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.round(payload.find((p: any) => p.dataKey === 'exchange_netflow')?.value).toLocaleString()} ₿
                </span>
            </div>
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
  if (!data || data.length === 0) return null;

  const sortedData = [...data].reverse();

  return (
    <Card className="w-full shadow-sm transition-all dark:bg-neutral-900/50 backdrop-blur-sm dark:border-neutral-800 overflow-hidden">
      <CardHeader className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="flex items-center gap-2">
                    <Signal className="h-5 w-5 text-indigo-500" />
                    Whale Intent & Exchange Netflow
                </CardTitle>
                <CardDescription className="mt-1">
                   Netflow &lt; 0 (Grün) = Akkumulation | Netflow &gt; 0 (Rot) = Distribution
                </CardDescription>
            </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
              
              <defs>
                 <linearGradient id="wiiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                 </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-neutral-200/50 dark:text-neutral-800/30" />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
                minTickGap={30}
                dy={10}
              />

              <YAxis 
                yAxisId="left"
                domain={[0, 100]}
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#6366f1'}}
                axisLine={false}
                tickLine={false}
                label={{ value: 'WII Score', angle: -90, position: 'insideLeft', fill: '#6366f1', fontSize: 10, dx: 10 }}
              />

              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(val) => val >= 1000 || val <= -1000 ? `${(val / 1000).toFixed(0)}k` : val}
                tick={{fontSize: 11, fontFamily: 'monospace', fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />

              <ReferenceLine y={75} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} label={{ value: "Distribution", fill: "#ef4444", fontSize: 10, position: 'insideBottomLeft' }} />
              <ReferenceLine y={25} yAxisId="left" stroke="#22c55e" strokeDasharray="3 3" opacity={0.5} label={{ value: "Accumulation", fill: "#22c55e", fontSize: 10, position: 'insideTopLeft' }} />

              <Bar yAxisId="right" dataKey="exchange_netflow" radius={[2, 2, 0, 0]} maxBarSize={40} isAnimationActive={false}>
                {sortedData.map((entry, index) => (
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
                // PERFORMANCE: "dot={false}" statt fester Dots, rendert hunderte SVG Nodes weniger
                dot={false} 
                activeDot={{ r: 6, fill: '#fff', stroke: '#6366f1', strokeWidth: 2 }}
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