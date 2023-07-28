/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        dark: '#1f1f1f',
        light: '#dae5fb',
        primary: '#103994',
        secondary: '#bed1f8',
        accent: '#1652d4',
      },
    },
  },
  plugins: [],
};
