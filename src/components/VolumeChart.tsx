"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: any;
}

export default function VolumeChart({ data }: Props) {
  let chartData = [];
  if (Array.isArray(data)) chartData = data;
  else if (data && Array.isArray(data.items)) chartData = data.items;
  else if (data && Array.isArray(data.data)) chartData = data.data;

  // Umdrehen (alt -> neu)
  const sortedData = [...chartData].reverse();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bewegtes BTC Volumen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 12}}
              />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                formatter={(value: number) => [`${value.toLocaleString()} BTC`, 'Volumen']}
              />
              <Bar dataKey="whale_tx_volume_btc" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}