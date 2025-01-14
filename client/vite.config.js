import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server
        changeOrigin: true, // Helps with CORS issues
        secure: false, // Allow self-signed certificates if needed
        // Optional path rewrite if needed
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
