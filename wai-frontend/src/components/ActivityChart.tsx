"use client" // Wichtig: Macht dies zur Client Component

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhaleData } from "@/app/types";

interface Props {
  data: WhaleData[];
}

export default function ActivityChart({ data }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Historische Wal-Aktivität</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(str) => new Date(str).toLocaleDateString()}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="activityScore" 
                stroke="#2563eb" 
                strokeWidth={2} 
                name="Activity Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}