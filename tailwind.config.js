/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: '#fff',
        },
        dark: {
          700: '#4d4c4e',
          800: '#1f1f1f',
          900: '#121111',
        },
        violet: {
          'gradient-right': '#af60fe',
          'gradient-left': '#8009f6',
          dark: '#1b0d28',
        },
        blank: '#e5e5f2',
        ming: '#38767f',
        keppel: '#34a48e',
        eastBay: '#3c3c6c',
        amethystSmoke: '#a9a2c1',
        kimberly: '#7c769e',
        nepal: '#94acbc',
        hoki: '#5c8494',
      },
      fontFamily: {
        Beau: ['PF BeauSans Pro', 'Poppins', 'sans-serif'],
        Gilroy: ['Gilroy', 'Poppins', 'sans-serif'],
        Poppins: ['Poppins', 'Gilroy', 'sans-serif'],
      },
      borderRadius: {
        clay: '12px',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-claymorphism'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
