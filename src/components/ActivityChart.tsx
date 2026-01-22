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
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import für die Toggle-Buttons
import { Eye, EyeOff } from "lucide-react"; // Icons für Sichtbarkeit

interface Props {
  data: any[];
}

export default function ActivityChart({ data }: Props) {
  // --- STATE FÜR DIE TOGGLES ---
  // Standardmäßig: V2 und Preis sind AN, V1 ist AN (oder aus, wie du magst)
  const [showV1, setShowV1] = useState(true);
  const [showV2, setShowV2] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  // --- SICHERHEITS-CHECK ---
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
        
        {/* TITEL & BESCHREIBUNG (Links) */}
        <div>
            <CardTitle>Markt-Kontext</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Aktiviere/Deaktiviere Linien per Klick:
            </p>
        </div>

        {/* TOGGLE BUTTONS (Rechts) */}
        <div className="flex flex-wrap gap-2">
            
            {/* Toggle: WAI v2 (Live) */}
            <Button 
                variant={showV2 ? "default" : "outline"} 
                size="sm" 
                onClick={() => setShowV2(!showV2)}
                className={showV2 ? "bg-orange-500 hover:bg-orange-600 border-orange-500 text-white" : "text-slate-500"}
            >
                {showV2 ? <Eye className="w-3 h-3 mr-2" /> : <EyeOff className="w-3 h-3 mr-2" />}
                WAI v2
            </Button>

            {/* Toggle: WAI v1 (Legacy) */}
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
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day: '2-digit', month: '2-digit'})}
                tick={{fontSize: 12}}
                minTickGap={30}
              />
              
              {/* Linke Achse: WAI (0-100) - Nur zeigen wenn v1 oder v2 an ist */}
              <YAxis 
                yAxisId="left" 
                domain={[0, 100]} 
                tick={{fontSize: 12}}
                label={{ value: 'Score (0-100)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                hide={!showV1 && !showV2}
              />

              {/* Rechte Achse: Bitcoin Preis - Nur zeigen wenn Preis an ist */}
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
              
              {/* Wir verstecken die Standard-Legende, da wir jetzt eigene Buttons haben */}
              {/* <Legend verticalAlign="top" height={36}/> */}

              {/* 1. BTC Preis (Conditional Rendering) */}
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

              {/* 2. Der alte WAI v1 (Conditional Rendering) */}
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

              {/* 3. Der neue WAI v2 (Conditional Rendering) */}
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