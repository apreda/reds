import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Only load environment variables that start with VITE_
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      // Only expose VITE_ prefixed env vars to the client
      'process.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY),
      // Add any other VITE_ prefixed env vars you need here
    }
  }
})
