/**
 * ESLint 9.30.0 – monorepo root
 * All common rules live here; each app/package can extend/override.
 */
module.exports = {
    root: true,
    env: { es2023: true, node: true },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: [
            './tsconfig.base.json',
            './apps/*/tsconfig*.json',
            './packages/*/tsconfig*.json',
        ],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['node_modules', 'dist', 'coverage', '*.d.ts'],
    /* --------------------------------------------------------------------- */
    overrides: [
        /* React ─ apps/ui ---------------------------------------------------- */
        {
            files: ['apps/ui/**/*.{ts,tsx}'],
            env: { browser: true },
            parserOptions: { project: ['./apps/ui/tsconfig*.json'] },
            plugins: ['react', 'react-hooks'],
            extends: [
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:prettier/recommended',
            ],
            settings: { react: { version: 'detect' } },
        },
        /* NestJS ─ apps/api --------------------------------------------------- */
        {
            files: ['apps/api/**/*.ts'],
            parserOptions: { project: ['./apps/api/tsconfig*.json'] },
            plugins: ['@nestjs'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@nestjs/recommended',
                'plugin:prettier/recommended',
            ],
        },
        /* Node-only TS (workflows & packages) -------------------------------- */
        {
            files: ['apps/workflows/**/*.ts', 'packages/**/*.ts'],
            parserOptions: {
                project: [
                    './apps/workflows/tsconfig*.json',
                    './packages/*/tsconfig*.json',
                ],
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:prettier/recommended',
            ],
        },
        /* Plain JS / config files ------------------------------------------- */
        {
            files: ['**/*.{js,cjs,mjs}'],
            env: { node: true },
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
        },
    ],
    rules: { 'prettier/prettier': 'error' },
}
