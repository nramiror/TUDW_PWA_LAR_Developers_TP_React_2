import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
