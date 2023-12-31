/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    keyframes: {
      'pulse-scale': {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.05)' },
      },
    },
    animation: {
      'pulse-scale': 'pulse-scale 3s infinite',
    },
  },
  plugins: [],

}