/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      screens: {
        xsm: '420px',
        touch: { raw: '(hover: none)' },
      },
    },
  },
};
