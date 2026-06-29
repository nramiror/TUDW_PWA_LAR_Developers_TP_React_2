import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Fuerza a Vite a tratar todo como una Single Page Application redireccionando al index.html
  appType: 'spa', 
  
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext', // Asegúrate de que apunte a una versión moderna
  },
  server: {
    port: 5173,
    strictPort: true, // Evita que si el puerto se ocupa te mande a otro ramdom (ej: 5174) rompiendo la sesión de cookies/CORS
  },

  test: {
    environment: 'jsdom',
    setupFiles: './src/utils/setupTests.js',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov'],
      exclude: [
        'node_modules/',
        'src/utils/setupTests.js',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
      ],
      all: false,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
})