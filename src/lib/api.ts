// src/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://wai-backend.duckdns.org';

// 1. Neuesten WAI Wert holen
export async function fetchLatestWai() {
  const url = `${API_URL}/api/wai/latest`;
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000) 
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchLatestWai:`, error);
    return { wai_score: 0, active_whales: 0, timestamp: new Date().toISOString() };
  }
}

// 2. WAI Historie holen
export async function fetchWaiHistory() {
  const url = `${API_URL}/api/wai/history?limit=30`;
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchWaiHistory:`, error);
    return []; 
  }
}

// 3. Validierungs-Statistiken (Backtest) holen
export async function fetchValidationStats() {
  const url = `${API_URL}/api/wai/validation`;
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchValidationStats:`, error);
    return null;
  }
}

// 4. Momentum holen
export async function fetchMomentumStats() {
  const url = `${API_URL}/api/wai/momentum?limit=10`;
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchMomentumStats:`, error);
    return null;
  }
}

// 5. Confidence holen
export async function fetchConfidenceStats() {
  const url = `${API_URL}/api/wai/confidence?limit=10`;
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchConfidenceStats:`, error);
    return null;
  }
}

// 6. Backtest Stats holen (Interaktiv)
export async function fetchBacktestStats(signal: string = 'wii_accumulation', horizon: number = 7) {
  const url = `${API_URL}/api/wai/backtest?signal=${signal}&horizon=${horizon}`;
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(8000) // Backtests können manchmal minimal länger dauern
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchBacktestStats:`, error);
    return null;
  }
}