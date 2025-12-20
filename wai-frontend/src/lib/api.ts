// src/lib/api.ts

// Basis URL aus der .env Datei laden
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Funktion 1: Neuesten Wert holen
export async function fetchLatestWai() {
  try {
    const res = await fetch(`${API_URL}/api/wai/latest`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch latest data');
    return res.json();
  } catch (error) {
    console.error("API Error fetchLatestWai:", error);
    // Fallback Daten, damit die Seite nicht abstürzt
    return { wai_score: 0, active_whales: 0, timestamp: new Date().toISOString() };
  }
}

// Funktion 2: Historie holen
export async function fetchWaiHistory() {
  try {
    const res = await fetch(`${API_URL}/api/wai/history?limit=30`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch history');
    return res.json();
  } catch (error) {
    console.error("API Error fetchWaiHistory:", error);
    return []; // Leeres Array als Fallback
  }
}