/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#130529',
        second: '#ff269e'
      },
      fontFamily: {
        Beau: ['PF BeauSans Pro', 'Poppins', 'sans-serif'],
        Poppins: ['Poppins', 'PF BeauSans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
