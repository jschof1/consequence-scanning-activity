import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import json from '@rollup/plugin-json';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), nodePolyfills(),  json({
    compact: true
  }),],
  base: '/', // correct path for GitHub Pages
  build: {
    outDir: './docs', // output directory
    // emptyOutDir: true, // uncomment if outDir is inside root (if needed)
  },

})