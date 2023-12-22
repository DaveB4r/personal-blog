const { nextui } = require("@nextui-org/react");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme: "dark"
  }),
  plugin(function ({ addBase, theme }) {
    addBase({
      'h1': { fontSize: theme('fontSize.4xl') },
      'h2': { fontSize: theme('fontSize.3xl') },
      'h3': { fontSize: theme('fontSize.2xl') },
      'a': { color: 'rgb(0 112 240)' },
      'ul': { listStyle: 'auto'}
    })
  })
  ],
}

