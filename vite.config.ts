import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true,
      clientPort: 5173,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
    host: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});