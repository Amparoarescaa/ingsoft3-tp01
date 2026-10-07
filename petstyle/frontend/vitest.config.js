import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
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