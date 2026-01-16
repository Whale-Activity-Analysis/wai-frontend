"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: any; 
}

export default function ActivityChart({ data }: Props) {
  
  // 1. Daten auspacken (dein Fix von vorhin)
  let chartData = [];
  if (Array.isArray(data)) {
    chartData = data;
  } else if (data && Array.isArray(data.items)) {
    chartData = data.items;
  } else if (data && Array.isArray(data.data)) {
    chartData = data.data;
  }

  // 2. WICHTIG: Daten umdrehen, damit die Zeit von links nach rechts läuft
  // Wir kopieren das Array mit [...], damit das Original nicht verändert wird
  const sortedData = [...chartData].reverse();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>WAI Trendverlauf</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              
              {/* Hier 'date' statt 'timestamp' */}
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => {
                  try { return new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'}) }
                  catch { return str }
                }}
                tick={{fontSize: 12}}
              />
              
              <YAxis domain={[0, 100]} tick={{fontSize: 12}} />
              
              <Tooltip 
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              
              <Line 
                type="monotone" 
                dataKey="wai"  
                stroke="#f97316" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
                name="WAI Index"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}