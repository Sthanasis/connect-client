/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    setupFiles: 'src/setupTests.js',
  },
  server: {
    port: 3000,
    proxy: {
      '/api/': 'http://localhost:5063/api/',
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: '@drawer',
        replacement: resolve(__dirname, './src/drawer'),
      },
    ],
  },
  build: {
    target: 'esnext',
  },
});
