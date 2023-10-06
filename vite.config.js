import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: 'https://github.com/jschof1/consequence-scanning-activity/',  // replace <REPO> with your repo name
})
