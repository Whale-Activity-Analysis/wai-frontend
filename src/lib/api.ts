// src/lib/api.ts

// URL Konfiguration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://wai-backend.duckdns.org';

// 1. Neuesten WAI Wert holen
export async function fetchLatestWai() {
  const url = `${API_URL}/api/wai/latest`;
  // console.log("Versuche Fetch von:", url); 

  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000) 
    });

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }
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

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchWaiHistory:`, error);
    return []; 
  }
}
  // src/lib/api.ts

// ... (API_URL Definition und andere Funktionen)

// NEU: Validierungs-Statistiken (Backtest)
export async function fetchValidationStats() {
  const url = `${API_URL}/api/wai/validation`;
  
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchValidationStats:`, error);
    return null; // Return null bei Fehler, damit wir im UI "Keine Daten" anzeigen können
  }
}


