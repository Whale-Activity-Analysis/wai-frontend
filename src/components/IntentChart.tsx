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
  Legend,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: any[];
}

export default function IntentChart({ data }: Props) {
  // Sortierung sicherstellen (alt -> neu)
  const sortedData = [...data].reverse();

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Whale Intent & Exchange Netflow</CardTitle>
        <p className="text-xs text-muted-foreground">
          Netflow &lt; 0 (Grün) = Akkumulation | Netflow &gt; 0 (Rot) = Distribution
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 12}}
              />
              
              {/* Linke Achse: WII Score (0-100) */}
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                domain={[0, 100]} 
                tick={{fontSize: 12}}
                label={{ value: 'WII Score', angle: -90, position: 'insideLeft', fill: '#64748b' }}
              />

              {/* Rechte Achse: Netflow (BTC) */}
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{fontSize: 12}}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              />

              <Tooltip 
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />

              {/* WII Signal Zonen Referenzlinien */}
              <ReferenceLine y={75} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft',  value: 'Distribution', fontSize: 10, fill: '#ef4444' }} />
              <ReferenceLine y={25} yAxisId="left" stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'insideBottomLeft', value: 'Accumulation', fontSize: 10, fill: '#22c55e' }} />

              {/* Netflow Balken: Wir nutzen Cell Farben logik im Custom Shape wäre zu komplex, 
                  daher Trick: Wir verlassen uns auf die Balkenfarbe. 
                  Wir visualisieren hier Netflow. 
                  In Krypto: Negativer Netflow (Outflow) ist GUT (Grün). Positiver ist SCHLECHT (Rot).
              */}
              <Bar 
                yAxisId="right"
                dataKey="exchange_netflow" 
                name="Netflow (BTC)" 
                barSize={20}
                fill="#94a3b8" // Fallback Farbe
              >
                {sortedData.map((entry, index) => (
                    <cell 
                        key={`cell-${index}`} 
                        // Wenn Netflow < 0 (Outflow) -> Grün, sonst Rot
                        fill={entry.exchange_netflow < 0 ? '#22c55e' : '#ef4444'} 
                    />
                ))}
              </Bar>

              {/* WII Linie */}
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="wii" 
                name="WII (Intent)"
                stroke="#6366f1" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#6366f1' }}
              />
              
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}