/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8eb',
          100: '#ffefc6',
          200: '#fedc88',
          300: '#fec34a',
          400: '#fda71e',
          500: '#f5820b',
          600: '#d95f06',
          700: '#b44109',
          800: '#92330e',
          900: '#782b0f',
        },
        kashi: {
          gold: '#FFB800',
          amber: '#E65100',
          deepRed: '#8B0000',
          gangaBlue: '#0284C7',
          midnight: '#0F172A',
          cardDark: '#1E293B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        devanagari: ['Rozha One', 'Yatra One', 'serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'kashi-hero': 'linear-gradient(to right, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.75))',
      }
    },
  },
  plugins: [],
}
