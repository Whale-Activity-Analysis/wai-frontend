'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; 
import { useRouter } from "next/navigation"; // Importiert für Redirect
import { useTranslation } from "react-i18next";
import PremiumWrapper from "@/components/PremiumWrapper"; 
import FadeIn from "@/components/FadeIn"; 
import NumberTicker from "@/components/NumberTicker"; 

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// --- KOMPONENTEN ---
import ValidationStats from "@/components/ValidationStats";
import { fetchLatestWai, fetchWaiHistory, fetchValidationStats } from "@/lib/api";
import { 
  Bitcoin, TrendingUp, Activity, Loader2, ArrowRightLeft, Signal, LineChart, 
  Lock, LockOpen, Target, LogOut 
} from "lucide-react";

// --- DYNAMIC IMPORTS ---
const ActivityChart = dynamic(() => import("@/components/ActivityChart"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
});

const CombinedChart = dynamic(() => import("@/components/CombinedChart"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
});

const IntentChart = dynamic(() => import("@/components/IntentChart"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded-xl" />
});

export default function DashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();
  
  const [currentWai, setCurrentWai] = useState<any>(null);
  const [fullHistory, setFullHistory] = useState<any[]>([]);
  const [validationData, setValidationData] = useState<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false); 
  const [user, setUser] = useState<any>(null); // State für User-Daten
  const [btcData, setBtcData] = useState<{ price: number; change24h: number } | null>(null);
  const [chartsReady, setChartsReady] = useState(false);

  // 1. AUTH CHECK & INITIAL PREMIUM STATE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || !storedUser) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    
    // Setze Premium-Status basierend auf der Rolle in der JSON/LocalStorage
    if (userData.role === "premium") {
      setIsPremium(true);
    }

    const timer = setTimeout(() => {
      setChartsReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [router]);

  // 2. DATA LOADING
  useEffect(() => {
    async function loadData() {
      try {
        const [latestData, historyResponse, validationResponse] = await Promise.all([
          fetchLatestWai(),
          fetchWaiHistory(),
          fetchValidationStats()
        ]);
        
        setCurrentWai(latestData);
        setFullHistory(historyResponse.data || historyResponse);
        setValidationData(validationResponse);
        
        if ((historyResponse.data || historyResponse).length > 0 && btcData === null) {
            setBtcData({ price: (historyResponse.data || historyResponse)[0].btc_close, change24h: 0 });
        }
      } catch (err: any) { 
          setError(err.message); 
      } finally { 
          setIsLoading(false); 
      }
    }
    loadData();
  }, []); 

  // 3. BTC TICKER
  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT");
        if (!res.ok) throw new Error("Err");
        const data = await res.json();
        if (data && data.lastPrice) {
            setBtcData({ price: parseFloat(data.lastPrice), change24h: parseFloat(data.priceChangePercent) });
        }
      } catch (e) { console.error(e); }
    };
    fetchTicker();
    const intervalId = setInterval(fetchTicker, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const currentWiiStatus = fullHistory.length > 0 ? fullHistory[0] : null;
  const isPositive = btcData ? btcData.change24h >= 0 : true;

  if (isLoading) return <main className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950"><Loader2 className="h-10 w-10 animate-spin text-orange-500" /></main>;
  if (error) return <main className="min-h-screen flex items-center justify-center text-red-500 bg-neutral-50 dark:bg-neutral-950">{error}</main>;

  const hoverEffect = "hover:scale-[1.01] hover:shadow-xl transition-all duration-300 ease-out cursor-default transform-gpu";

  return (
    <main className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 p-6 md:p-12 relative transition-colors duration-300">
      
      {/* Simulation Toggle & User Info */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white dark:bg-neutral-900 p-2 pr-4 rounded-full shadow-2xl border border-neutral-200 dark:border-neutral-800">
        <div className={`p-2 rounded-full ${isPremium ? 'bg-orange-100 dark:bg-orange-500/20' : 'bg-neutral-100 dark:bg-neutral-800'}`}>
           {isPremium ? <LockOpen className="h-5 w-5 text-orange-600" /> : <Lock className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />}
        </div>
        <div className="flex flex-col mr-2">
            <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Account: {user?.name}</span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">{isPremium ? "Premium Access" : "Free Tier"}</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => setIsPremium(!isPremium)} className="h-8 text-xs">Toggle</Button>
        <div className="w-[1px] h-6 bg-neutral-200 dark:bg-neutral-800 mx-1" />
        <Button size="sm" variant="ghost" onClick={handleLogout} className="h-8 w-8 p-0 text-neutral-500 hover:text-red-500">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER */}
        <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-100 dark:bg-orange-500/10 rounded-xl shadow-sm">
                        <Bitcoin className="h-8 w-8 text-orange-600 dark:text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                          {String(t('whale_index_title', 'Whale Index'))}
                        </h1>
                        <p className="text-neutral-500 dark:text-neutral-400">
                          {user ? `Willkommen zurück, ${user.name.split(' ')[0]}` : String(t('whale_index_subtitle'))}
                        </p>
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <div className="flex items-center justify-end gap-2 text-sm text-neutral-400 mb-1">
                        <span className="flex items-center gap-2">
                            {String(t('bitcoin_live', 'Bitcoin Live'))}
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        </span>
                        {btcData && (
                            <span className={`ml-2 px-1.5 py-0.5 rounded text-xs font-bold flex items-center ${
                                isPositive ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                            }`}>
                                {isPositive ? "+" : ""}{btcData.change24h.toFixed(2)}%
                            </span>
                        )}
                    </div>
                    <div className={`text-2xl font-mono font-medium transition-colors duration-300 ${!btcData ? "text-neutral-700 dark:text-neutral-200" : isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {btcData && typeof btcData.price === 'number' ? <NumberTicker value={btcData.price} prefix="$" decimals={2} /> : "..."}
                    </div>
                </div>
            </div>
        </FadeIn>

        {/* KPI KARTEN */}
        <div className="space-y-6">
            <FadeIn delay={0.1}>
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" /> 
                    {String(t('live_status', 'Live Marktstatus'))}
                </h2>
            </FadeIn>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* 1. Activity */}
                <FadeIn delay={0.1} className="h-full">
                    <Card className={`shadow-sm h-full flex flex-col justify-between dark:bg-neutral-900 dark:border-neutral-800 ${hoverEffect}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{String(t('activity_wai', 'WAI Activity'))}</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center">
                                {currentWai?.wai !== undefined ? <NumberTicker value={currentWai.wai} decimals={0} /> : "0"}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{String(t('score_label', 'On-Chain Aktivität'))}</p>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* 2. Intent */}
                <FadeIn delay={0.2} className="h-full">
                    <Card className={`shadow-sm h-full overflow-hidden relative flex flex-col dark:bg-neutral-900 dark:border-neutral-800 ${hoverEffect}`}>
                        <PremiumWrapper isPremium={isPremium} featureName="Intent Index">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{String(t('intent_wii', 'WII Intent'))}</CardTitle>
                                <Signal className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center">
                                    {currentWiiStatus?.wii !== undefined ? <NumberTicker value={currentWiiStatus.wii} decimals={0} /> : "--"}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{String(t('intent_label', 'Kauf-/Verkaufsabsicht'))}</p>
                            </CardContent>
                        </PremiumWrapper>
                    </Card>
                </FadeIn>

                {/* 3. Signal */}
                <FadeIn delay={0.3} className="h-full">
                    <Card className={`shadow-sm h-full overflow-hidden relative flex flex-col dark:bg-neutral-900 dark:border-neutral-800 ${hoverEffect}`}>
                        <PremiumWrapper isPremium={isPremium} featureName="Signal Phase">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{String(t('signal_phase', 'Markt Phase'))}</CardTitle>
                                <LineChart className="h-4 w-4 text-neutral-400" />
                            </CardHeader>
                            <CardContent>
                                <div className={`text-xl font-bold capitalize truncate ${
                                    currentWiiStatus?.wii_signal === 'accumulation' ? 'text-green-600 dark:text-green-400' : 
                                    currentWiiStatus?.wii_signal === 'selling_pressure' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                                }`}>
                                    {currentWiiStatus?.wii_signal ? String(t(`signal_${currentWiiStatus.wii_signal}`, currentWiiStatus.wii_signal.replace('_', ' '))) : "--"}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{String(t('matrix_interpretation', 'Strategische Einordnung'))}</p>
                            </CardContent>
                        </PremiumWrapper>
                    </Card>
                </FadeIn>

                {/* 4. Netflow */}
                <FadeIn delay={0.4} className="h-full">
                    <Card className={`shadow-sm h-full flex flex-col justify-between dark:bg-neutral-900 dark:border-neutral-800 ${hoverEffect}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{String(t('netflow_24h', 'Exchange Netflow'))}</CardTitle>
                            <ArrowRightLeft className="h-4 w-4 text-neutral-400" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-xl font-bold flex items-center ${
                                (currentWiiStatus?.exchange_netflow || 0) < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                                {currentWiiStatus?.exchange_netflow !== undefined ? <><NumberTicker value={Math.abs(currentWiiStatus.exchange_netflow)} decimals={0} /><span className="ml-1 text-sm font-normal">BTC</span></> : "--"}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {(currentWiiStatus?.exchange_netflow || 0) < 0 ? String(t('outflow_bullish', 'Outflow (Bullish)')) : String(t('inflow_bearish', 'Inflow (Bearish)'))}
                            </p>
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </div>

        {/* CHARTS SEKTION */}
        <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn direction="left" delay={0.2}>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">{String(t('intent_flow_analysis', 'Intent Flow Analyse'))}</h3>
                    <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"> 
                        <PremiumWrapper isPremium={isPremium} featureName="Erweiterte Chart-Analyse">
                            {fullHistory.length > 0 && chartsReady ? (
                                <IntentChart data={fullHistory} />
                            ) : (
                                <div className="h-[400px] w-full flex items-center justify-center italic text-neutral-400">Loading Chart...</div>
                            )}
                        </PremiumWrapper>
                    </div>
                </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">{String(t('market_context_analysis', 'Market Context'))}</h3>
                    <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {fullHistory.length > 0 && chartsReady ? (
                            <ActivityChart data={fullHistory} />
                        ) : (
                            <div className="h-[400px] w-full flex items-center justify-center italic text-neutral-400">Loading Chart...</div>
                        )}
                    </div>
                </div>
            </FadeIn>
        </div>

        {/* VOLUME & VALIDATION */}
        <div className="grid gap-8">
            <FadeIn delay={0.3}>
                <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">{String(t('volume_history', 'On-Chain Volumen Historie'))}</h3>
                    <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {fullHistory.length > 0 && chartsReady ? (
                            <CombinedChart data={fullHistory} />
                        ) : (
                            <div className="h-[400px] w-full flex items-center justify-center italic text-neutral-400">Loading Chart...</div>
                        )}
                    </div>
                </div>
            </FadeIn>

            <FadeIn delay={0.4}>
                <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-500" />
                        <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-300">{String(t('model_validation_title', 'Modell Validierung (Live Performance)'))}</h3>
                    </div>
                    <div className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {validationData ? (
                            <ValidationStats data={validationData} />
                        ) : (
                            <div className="h-[300px] w-full animate-pulse bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center" />
                        )}
                    </div>
                </div>
            </FadeIn>
        </div>

      </div>
    </main>
  );
}