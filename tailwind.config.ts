/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      aspectRatio: {
        '9/16': '9 / 16',
      },
      borderRadius: {
        '5xl': '32px',
        '6xl': '40px',
      },
      colors: {
        primary: '#FFFCF9',
        'primary-dark': '#070707',
        secondary: '#070707',
        'secondary-dark': '#FFFCF9',
        background: '#E9E9E9',
        'background-dark': '#1F1F1F',
        accent: '#6328E2',
        'accent-dark': '#8B58F8',
        foreground: '#3F96FE',
        'foreground-dark': '#58A4FE',
        input: '#EDEDED',
        'input-dark': '#171717',
        fadeText: '#575757',
        'fadeText-dark': '#999999',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
