import { mergeConfig, defineProject } from 'vitest/config'
import shared from '../../vitest.shared'

export default mergeConfig(
  shared,
  defineProject({
    test: {
      name: 'ui',
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      setupFiles: ['vitest.setup.ts'],
    },
  }),
)