import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import json from '@rollup/plugin-json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),   json({
    compact: true
  }),],
  base: '/consequence-scanning-activity/', // correct path for GitHub Pages
  build: {
    outDir: './docs', // output directory
    // emptyOutDir: true, // uncomment if outDir is inside root (if needed)
  }
})