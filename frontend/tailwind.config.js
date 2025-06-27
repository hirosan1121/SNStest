/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      boxShadow: {
        'glow': '0px 0px 14px -5px #4c4965',
      },
    },
  },
  plugins: [],
}

