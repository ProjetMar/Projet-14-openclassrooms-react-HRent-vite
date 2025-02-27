// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }), // Utilise Brotli (meilleure compression)
  ],
  build: {
    cssCodeSplit: true, // Divise le CSS en plusieurs fichiers pour éviter les gros fichiers bloquants
  }
});
