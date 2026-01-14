// src/app/types/index.ts

// Antwort für /api/wai/latest
export type WaiLatestResponse = {
  wai_score: number;       // Der Index (0-100)
  timestamp: string;       // Zeitstempel
  bitcoin_price?: number;  // Optional, falls das Backend das liefert
  active_whales?: number;  // Anzahl aktiver Wal-Adressen
  volume_usd?: number;     // Bewegtes Volumen
};

// Antwort für /api/wai/history (Liste von Objekten)
export type WaiHistoryItem = {
  timestamp: string;
  wai_score: number;
};

// Antwort für /api/wai/statistics
export type WaiStatsResponse = {
  mean: number;
  median: number;
  min: number;
  max: number;
};