import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    proxy: {
      // Proxy AI image requests through our origin so the browser doesn't send a
      // cross-origin Referer that triggers Pollinations' Turnstile check.
      '/ai-image': {
        target: 'https://image.pollinations.ai',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/ai-image/, '/prompt'),
      },
    },
  },
  preview: {
    proxy: {
      '/ai-image': {
        target: 'https://image.pollinations.ai',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/ai-image/, '/prompt'),
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        // Don't let the SW intercept the AI image API — let the browser fetch it directly.
        navigateFallbackDenylist: [/^\/?image\.pollinations\.ai/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.hostname === 'image.pollinations.ai',
            handler: 'NetworkOnly',
          },
        ],
      },
      manifest: {
        name: 'The Super Toy Maker',
        short_name: 'ToyMaker',
        description: 'Build, name and animate your own super toys!',
        theme_color: '#ff5fa2',
        background_color: '#fff7e6',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
