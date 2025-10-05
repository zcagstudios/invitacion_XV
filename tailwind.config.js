/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Tangerine"', 'cursive'],
        elegant: ['"Cinzel"', 'serif'],
        sans: ['"Lora"', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FFFBF0',
          100: '#FFF5DC',
          200: '#FFEDB8',
          300: '#FFE180',
          400: '#FFD54F',
          500: '#FFC107',
          600: '#D4AF37',
          700: '#B8860B',
          800: '#9C6F00',
          900: '#6B5200',
        },
        royal: {
          50: '#EBF4FF',
          100: '#D6E9FF',
          200: '#B3D4FF',
          300: '#80BFFF',
          400: '#4169E1',
          500: '#2E5090',
          600: '#1E3A8A',
          700: '#172B6B',
          800: '#0F1D4A',
          900: '#0A1230',
        },
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#7C3AED',
          700: '#6B21A8',
          800: '#581C87',
          900: '#3B0764',
        },
        rose: {
          50: '#FFF5F7',
          100: '#FFE4E9',
          200: '#FFCCD5',
          300: '#FFB3C1',
          400: '#FF8FA3',
          500: '#FF6B8A',
          600: '#E91E63',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
