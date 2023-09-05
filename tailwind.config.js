/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ebGaramond: ["EB Garamond", "serif"]
      }
    },
    screens: {
      'sm': {'max': '900px'}
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
