import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Server configuration for development
  server: {
    host: true, // Force DNS resolution
    port: 5173,
    // Proxy API requests to avoid CORS issues in development
    proxy: {
      '/wp-json': {
        target: 'https://rkcindustrialph.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/wp-json/, '/wp-json')
      }
    }
  },
  
  // Build configuration
  build: {
    // Generate source maps for debugging
    sourcemap: true,
    // Optimize chunk size - FIXED: manualChunks as function
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks
          if (id.includes('node_modules')) {
            // React and React DOM in their own chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor';
            }
            // Everything else in a separate vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})