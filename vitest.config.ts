import { defineConfig, mergeConfig } from 'vitest/config'
import shared from './vitest.shared'

const nodeProject = (name: string, include: string[]) =>
    mergeConfig(
        shared,
        defineConfig({
            test: { name, include, environment: 'node' },
        })
    )

const jsdomProject = (name: string, include: string[]) =>
    mergeConfig(
        shared,
        defineConfig({
            plugins: [],
            test: { name, include, environment: 'jsdom' },
        })
    )

export default defineConfig({
    test: {
        projects: [
            nodeProject('api', ['apps/api/**/*.{spec,test}.ts']),
            jsdomProject('ui', ['apps/ui/**/*.{spec,test}.tsx?']),
            nodeProject('workflows', ['apps/workflows/**/*.{spec,test}.ts']),
            nodeProject('algorithms', [
                'packages/reputation-algorithms/**/*.{spec,test}.ts',
            ]),
        ],
        reporters: ['default'],
    },
})
