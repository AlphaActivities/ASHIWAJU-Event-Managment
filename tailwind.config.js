/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5EF',
        beige: '#EFE8DA',
        ink: '#151515',
        gold: '#C99524',
        'gold-light': '#D4A84A',
        'gold-dark': '#B07D1A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
