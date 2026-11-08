/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          900: '#09283a',
          800: '#123b52',
          700: '#1d5269',
          600: '#376b82',
          500: '#5f879a',
          400: '#86a9b9',
          300: '#b6ccd6',
        },
        sand: {
          50: '#f4f8fa',
          100: '#e8f0f4',
          200: '#cfdee6',
          300: '#a9c2cf',
        },
        clay: {
          400: '#a8cddd',
          500: '#78abc1',
          600: '#477f9b',
        },
        moss: {
          500: '#167995',
          600: '#0d607d',
          700: '#08465e',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(9,40,58,0.06), 0 8px 30px rgba(9,40,58,0.08)',
        cardFocus: '0 0 0 3px rgba(22,121,149,0.30), 0 8px 30px rgba(9,40,58,0.10)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out both',
        scaleIn: 'scaleIn 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
