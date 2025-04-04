import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
const path = require('path')

export default defineConfig({
    plugins: [react()],
    build: { // to output your build into build dir the same as Webpack
        outDir: 'build',
    },
    server: {
        open: true,
        port: 3000,
    },
    resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.jsx',
        css: true,
        reporters: ['verbose'],
        coverage: {
          reporter: ['text', 'json', 'html'],
          include: ['src/**/*'],
          exclude: [],
        }
      }
});