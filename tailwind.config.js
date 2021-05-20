module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
        "sans-2": "Catamaran, sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
