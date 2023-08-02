/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'cool': '-2px 2px 0px 0px rgba(199, 199, 199, 1)',
      },
    },
  },
  daisyui: {
    themes: [
      'black'
    ],
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
}

