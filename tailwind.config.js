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
        dark: '#212121',
        light: '#ffffff',
        primary: '#1c87df',
        secondary: '#d5e6ec',
        accent: '#0037ff',
      },
    },
  },
  plugins: [],
};
