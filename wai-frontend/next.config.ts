/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // WICHTIG: Erzwingt eine statische HTML-Version
  
  // WICHTIG: Ersetze 'wai-frontend' mit deinem EXAKTEN Repo-Namen auf GitHub
  basePath: '/wai-frontend', 
  
  images: {
    unoptimized: true, // WICHTIG: Next.js Image-Optimierung geht nicht auf GitHub Pages
  },
};

export default nextConfig;
