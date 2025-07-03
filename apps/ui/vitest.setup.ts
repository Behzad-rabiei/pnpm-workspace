// apps/ui/vitest.setup.ts
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// example: global fetch mock for UI tests
if (!globalThis.fetch) {
  // eslint-disable-next-line @typescript-eslint/require-await
  globalThis.fetch = vi.fn(async () => new Response('{}')) as any
}