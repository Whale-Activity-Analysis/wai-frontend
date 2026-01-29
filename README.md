🐳 WAI Project - Frontend

Das offizielle Frontend für den Bitcoin Whale Activity Index (WAI). Diese Web-App visualisiert On-Chain-Daten in Echtzeit, um Wal-Aktivitäten (Activity) und deren Absichten (Intent) zu analysieren.
🚀 Features

    Modernes Dashboard: Echtzeit-Übersicht über WAI (Activity) und WII (Intent).

    Interaktive Charts:

        Activity Chart: Vergleich von WAI v2 (Live) vs. v1 (Legacy) vs. Bitcoin Preis.

        Intent Chart: Visualisierung von Exchange Netflows (Inflow/Outflow) und Signalen.

        Toggle-Funktionen: Linien im Chart an-/abschalten.

    Landing Page: Conversion-optimierte Startseite für neue Nutzer.

    Sichere Kommunikation: Vollständige HTTPS-Integration zum Backend via DuckDNS.

    Responsive Design: Optimiert für Desktop und Mobile.

🛠 Tech Stack

    Framework: Next.js 14 (App Router)

    Sprache: TypeScript

    Styling: Tailwind CSS

    UI Komponenten: shadcn/ui

    Charts: Recharts

    Icons: Lucide React

    Hosting: GitHub Pages (Static Export)

⚙️ Installation & Lokale Entwicklung

Stelle sicher, dass du Node.js installiert hast (Version 18+ empfohlen).

    Repository klonen:
    Bash

git clone https://github.com/DEIN-USERNAME/wai-frontend.git
cd wai-frontend

Abhängigkeiten installieren:
Bash

npm install

Umgebungsvariablen setzen: Erstelle eine Datei .env.local im Hauptverzeichnis und füge die Backend-URL hinzu:
Bash

NEXT_PUBLIC_API_URL=https://wai-backend.duckdns.org

Entwicklungsserver starten:
Bash

    npm run dev

    Öffne http://localhost:3000 in deinem Browser.

📦 Deployment

Das Projekt wird automatisch über GitHub Actions auf GitHub Pages deployt.

    Jeder Push auf den main Branch löst den Workflow aus.

    Der Workflow baut die statische Seite (npm run build).

    Wichtig: In den GitHub Repository Settings muss unter Variables (Actions) die Variable NEXT_PUBLIC_API_URL hinterlegt sein.

📂 Projektstruktur

src/
├── app/
│   ├── page.tsx           # Landing Page (Startseite)
│   ├── layout.tsx         # Globales Layout (inkl. Navbar)
│   └── dashboard/         # Das geschützte Dashboard
├── components/
│   ├── ui/                # Wiederverwendbare UI-Elemente (Cards, Buttons...)
│   ├── ActivityChart.tsx  # WAI & Preis Chart
│   ├── IntentChart.tsx    # WII & Netflow Chart
│   └── Navbar.tsx         # Globale Navigation
└── lib/
    └── api.ts             # API-Calls zum Python Backend