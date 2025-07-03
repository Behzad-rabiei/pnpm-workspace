// vitest.shared.ts (root)
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

// settings common to every project
export default defineConfig({
  test: {
    globals: true,
    // Allow "src" absolute imports
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    // Use Istanbul for coverage (same report for all projects)
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      exclude: ['**/dist/**', '**/node_modules/**'],
    },
  },
})