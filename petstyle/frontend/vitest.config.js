import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'e2e/**',
            'playwright-report/**',
            'playwright-results/**',
            'test-results/**',
        ],

        coverage: {
            provider: 'v8',

            include: [
                'src/logica/**/*.js',
                'src/servicios/pedidos.js',
            ],

            reporter: ['text', 'json-summary', 'html'],

            thresholds: {
                lines: 90,
                branches: 90,
            },
        },
    },
})