import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: loadEnv(mode, '.', 'ENONIC_').ENONIC_URL || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
}))
