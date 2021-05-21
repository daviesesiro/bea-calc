module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
        "sans-2": "Catamaran, sans-serif",
      },
      backgroundImage: {
        "person-gradient":
          "radial-gradient(43.09% 211.56% at 85.74% 93.81%, #34A3A3 0%, #003778 100%);",
        "send-transaction":
          "linear-gradient(282.67deg, #F44E4A 13.94%, #DD231E 47%, #D0110C 75.1%);",
        "receive-transaction":
          "linear-gradient(282.67deg, #448A16 13.94%, #408215 47%, #224A08 75.1%);",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "active", "focus", "disabled"],
    },
  },
  plugins: [],
};
