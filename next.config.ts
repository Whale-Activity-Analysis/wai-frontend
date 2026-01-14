/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Zwingend für GitHub Pages
  
  // WICHTIG: Wenn dein Repo "wai-frontend" heißt, muss das hier stehen.
  // Wenn dein Repo "whale-activity-analysis.github.io" heißt, lass diese Zeile weg!
  basePath: '/wai-frontend', 
  
  images: {
    unoptimized: true, // Zwingend, sonst blockiert Next.js Bilder
  },
};

export default nextConfig;
