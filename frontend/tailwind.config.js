/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Stack Sans Text', 'sans-serif'],
      },
      colors: {
        'deep-green': {
          DEFAULT: '#1a4d2e',
          light: '#2d5f3e',
          dark: '#0f3a1f',
        },
        'cream': {
          DEFAULT: '#f5f0e8',
          light: '#faf8f4',
          dark: '#e8e0d4',
        },
        'emerald': {
          DEFAULT: '#50C878',
          light: '#6dd88f',
          dark: '#3ea860',
        },
        'teal-brown': {
          DEFAULT: '#5f8a7f',
          light: '#7a9d93',
          dark: '#4a6b62',
        },
        'deep-gold': {
          DEFAULT: '#D4AF37',
          light: '#e8c965',
          dark: '#b8941f',
        },
        'gold': {
          DEFAULT: '#FFD700',
          light: '#ffe94d',
          dark: '#ccac00',
        },
        'accent-pink': {
          DEFAULT: '#e8b4b8',
          light: '#f5d0d3',
          dark: '#d89a9f',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #C0C0C0 100%)',
        'gold-shine': 'linear-gradient(135deg, #D4AF37 0%, #E8C965 25%, #F5E6D3 50%, #D4AF37 75%, #B8941F 100%)',
      },
    },
  },
  plugins: [],
}

