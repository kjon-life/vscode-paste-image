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
      reporter: ['text', 'json', 'html', 'lcov', 'json-summary', 'cobertura'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: ['**/node_modules/**', '**/tests/**'],
      all: true,
      clean: true,
      reportOnFailure: true,
      thresholds: {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});