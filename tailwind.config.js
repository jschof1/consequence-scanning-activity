/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {listStyleImage: {
      arrow: "url('/icons_arrow.svg')",
    },
  },
  },
  plugins: [],
}

