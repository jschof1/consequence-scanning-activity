import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/consequence-scanning-activity/', // correct path for GitHub Pages
  build: {
    outDir: './docs', // output directory
    // emptyOutDir: true, // uncomment if outDir is inside root (if needed)
  },
    kit: {
      adapter: adapter(),
      vite: () => ({
        css: {
          postcss: {
            plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
              require('daisyui'),
            ],
          },
        },
      }),
    },
});
