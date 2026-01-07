import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Forces IPv4 (Fixes "Refused to connect" on Windows)
    port: 5555,        // A high, random port (Fixes "Port Reserved" issues)
    strictPort: true,
  },
})