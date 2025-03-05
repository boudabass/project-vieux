/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Atkinson Hyperlegible', 'sans-serif'],
      },
      fontSize: {
        base: '18px',
        lg: '20px',
        xl: '22px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '36px',
      },
      colors: {
        primary: '#37a2ea',    // Bleu ciel
        secondary: '#3748ea',  // Bleu royal
        tertiary: '#37ead9',   // Turquoise
        accent: '#ea7f37',     // Orange
        blue: {
          50: '#e6f4fc',
          100: '#cce9f9',
          200: '#99d3f3',
          300: '#66bded',
          400: '#37a2ea', // Primary
          500: '#2b82bb',
          600: '#20618c',
          700: '#16415d',
          800: '#0b202e',
          900: '#051017',
        },
        indigo: {
          50: '#e6e7fc',
          100: '#cccff9',
          200: '#9a9ff3',
          300: '#676fed',
          400: '#3748ea', // Secondary
          500: '#2c39bb',
          600: '#212b8c',
          700: '#161c5d',
          800: '#0b0e2e',
          900: '#050717',
        },
        teal: {
          50: '#e6fcfa',
          100: '#ccf9f5',
          200: '#99f3eb',
          300: '#66ede1',
          400: '#37ead9', // Tertiary
          500: '#2cbbad',
          600: '#218c82',
          700: '#165d56',
          800: '#0b2e2b',
          900: '#051715',
        },
        orange: {
          50: '#fceee6',
          100: '#f9ddcc',
          200: '#f3bb99',
          300: '#ed9a66',
          400: '#ea7f37', // Accent
          500: '#bb662c',
          600: '#8c4c21',
          700: '#5d3316',
          800: '#2e190b',
          900: '#170c05',
        },
      },
    },
  },
  plugins: [],
};