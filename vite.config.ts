import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => ({
  plugins: [react()],
  // Development requests must stay same-origin, including with an older absolute URL in .env.
  define: command === 'serve' ? {
    'import.meta.env.VITE_GUILLOTINE_URL': JSON.stringify('/api/com.enonic.app.guillotine:graphql'),
  } : undefined,
  server: {
    proxy: {
      '/api': {
        target: loadEnv(mode, '.', 'ENONIC_').ENONIC_URL || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
}))
