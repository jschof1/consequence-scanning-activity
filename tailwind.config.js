/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    listStyleImage: {
      arrow: "url('../public/icons_arrow.svg')",
    },
    extend: {
      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};
