import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command}) => ({
  plugins: [react()],
  // Development requests must stay same-origin, including with an older absolute URL in .env.
  define: command === 'serve' ? {
    'import.meta.env.VITE_GUILLOTINE_URL': JSON.stringify('/api/com.enonic.app.guillotine:graphql'),
  } : undefined,
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
}))
