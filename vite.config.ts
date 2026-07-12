import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/App-Ejercicio/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        id: '/App-Ejercicio/',
        name: 'Rutina en casa: guía de ejercicio',
        short_name: 'Rutina en casa',
        description: 'Guía de ejercicio en casa con biblioteca, rutinas guiadas, práctica de ritmo y equipo recomendado.',
        start_url: '/App-Ejercicio/',
        scope: '/App-Ejercicio/',
        display: 'standalone',
        background_color: '#f7f1e8',
        theme_color: '#176f64',
        lang: 'es-MX',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        navigateFallbackDenylist: [/^\/App-Ejercicio\/api\//],
      },
    }),
  ],
});
