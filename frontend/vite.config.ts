import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Kuuntele kaikkia verkkoliittymiä
    port: 5173,
    watch: {
      usePolling: true, // docker hot reaload
    },
    proxy: {
      "/api": {
        target: "http://backend:3000", // docker servicen nimi
        changeOrigin: true,
        secure: false,
      }
    }
  }
})