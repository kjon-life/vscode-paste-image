import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000,
    include: ['tests/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/out/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: ['**/node_modules/**', '**/tests/**'],
      all: true,
      clean: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});