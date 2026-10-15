const { defineConfig } = require('vitest/config')

module.exports = defineConfig({
    test: {
        globals: true,

        exclude: ['integration/**', '**/node_modules/**'],
        coverage: {
            provider: 'v8',

            include: [
                'src/pedidos.js',
            ],

            reporter: ['text', 'json-summary', 'html'],

            thresholds: {
                lines: 90,
                branches: 90,
            },
        },
    },
})