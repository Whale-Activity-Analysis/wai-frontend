// src/lib/api.ts

// WICHTIG: Fallback auf 127.0.0.1 statt localhost, da Node.js manchmal Probleme mit localhost hat
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Funktion 1: Neuesten Wert holen
export async function fetchLatestWai() {
  const url = `${API_URL}/api/wai/latest`;
  // console.log("Fetching URL:", url); // Einkommentieren zum Debuggen

  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      // Optional: Timeout setzen, damit es nicht ewig hängt
      signal: AbortSignal.timeout(5000) 
    });

    if (!res.ok) {
      throw new Error(`Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(`❌ FEHLER bei fetchLatestWai (${url}):`, error);
    
    // Fallback Daten, damit die Seite nicht abstürzt (aber du siehst Nullen)
    return { wai_score: 0, active_whales: 0, timestamp: new Date().toISOString() };
  }
}

// Funktion 2: Historie holen
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
    console.error(`❌ FEHLER bei fetchWaiHistory (${url}):`, error);
    
    // Leeres Array als Fallback, damit der Chart nicht crasht
    return []; 
  }
}