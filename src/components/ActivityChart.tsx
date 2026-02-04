"use client"

import { useState } from "react";
import { 
  ComposedChart, 
  Line, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react"; 

interface Props {
  data: any[];
}

export default function ActivityChart({ data }: Props) {
  // --- STATE ---
  const [showV1, setShowV1] = useState(true);
  const [showV2, setShowV2] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  // --- SAFETY CHECK ---
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="w-full shadow-sm">
        <CardHeader>
           <CardTitle>Markt-Kontext</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px] flex items-center justify-center text-slate-400 border border-dashed rounded-lg">
            <p>Warte auf Live-Daten...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data].reverse();

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 pb-6">
        <div>
            <CardTitle>Markt-Kontext</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Aktiviere/Deaktiviere Linien per Klick:
            </p>
        </div>

        <div className="flex flex-wrap gap-2">
            {/* Toggle: WAI v2 */}
            <Button 
                variant={showV2 ? "default" : "outline"} 
                size="sm" 
                onClick={() => setShowV2(!showV2)}
                className={showV2 ? "bg-orange-500 hover:bg-orange-600 border-orange-500 text-white" : "text-slate-500"}
            >
                {showV2 ? <Eye className="w-3 h-3 mr-2" /> : <EyeOff className="w-3 h-3 mr-2" />}
                WAI v2
            </Button>

            {/* Toggle: WAI v1 */}
            <Button 
                variant={showV1 ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setShowV1(!showV1)}
                className={showV1 ? "bg-slate-200 text-slate-700" : "text-slate-400 dashed border-slate-300"}
            >
                {showV1 ? <Eye className="w-3 h-3 mr-2" /> : <EyeOff className="w-3 h-3 mr-2" />}
                v1 (Legacy)
            </Button>

             {/* Toggle: Bitcoin Preis */}
             <Button 
                variant={showPrice ? "outline" : "outline"} 
                size="sm" 
                onClick={() => setShowPrice(!showPrice)}
                className={showPrice ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "text-slate-400"}
            >
                {showPrice ? <Eye className="w-3 h-3 mr-2" /> : <EyeOff className="w-3 h-3 mr-2" />}
                BTC Preis
            </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* HIER: Höhe auf 400px reduziert, damit es nicht zu riesig wird */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 12}}
                minTickGap={30}
              />
              
              <YAxis 
                yAxisId="left" 
                domain={[0, 100]} 
                tick={{fontSize: 12}}
                label={{ value: 'Score (0-100)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                hide={!showV1 && !showV2}
              />

              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={['auto', 'auto']}
                tick={{fontSize: 12}}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                stroke="#eab308"
                hide={!showPrice}
              />

              <Tooltip 
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />

              {showPrice && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="btc_close"
                    name="Bitcoin Preis ($)"
                    fill="#fef08a"
                    stroke="#eab308"
                    fillOpacity={0.2}
                    animationDuration={500}
                  />
              )}

              {showV1 && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="wai_v1" 
                    name="WAI v1 (Legacy)"
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    dot={false}
                    strokeDasharray="5 5"
                    animationDuration={500}
                  />
              )}

              {showV2 && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="wai" 
                    name="WAI v2 (Live)"
                    stroke="#f97316" 
                    strokeWidth={3} 
                    dot={{ r: 3, fill: '#f97316' }}
                    activeDot={{ r: 6 }}
                    animationDuration={500}
                  />
              )}
              
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}