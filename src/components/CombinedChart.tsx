"use client"

import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: any;
}

export default function CombinedChart({ data }: Props) {
  let chartData = [];
  if (Array.isArray(data)) chartData = data;
  else if (data && Array.isArray(data.items)) chartData = data.items;
  else if (data && Array.isArray(data.data)) chartData = data.data;

  // Umdrehen (alt -> neu) für korrekte Zeitachse
  const sortedData = [...chartData].reverse();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Markt-Analyse (Index vs. Volumen)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                scale="band" 
                tick={{fontSize: 12}}
              />
              
              {/* Linke Y-Achse für den Index (0-100) */}
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                domain={[0, 100]} 
                tick={{fontSize: 12}}
                label={{ value: 'WAI Index', angle: -90, position: 'insideLeft' }}
              />

              {/* Rechte Y-Achse für das Volumen (BTC) */}
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{fontSize: 12}}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} 
              />

              <Tooltip 
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Legend />

              {/* KORREKTUR: dataKey auf "volume" gesetzt, damit es zur API passt */}
              <Bar 
                yAxisId="right"
                dataKey="volume" 
                name="Volumen (BTC)" 
                fill="#bfdbfe" 
                barSize={20}
                radius={[4, 4, 0, 0]}
              />

              {/* Der Index als Linie */}
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="wai" 
                name="WAI Index"
                stroke="#f97316" 
                strokeWidth={3} 
                dot={false}
              />
              
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}