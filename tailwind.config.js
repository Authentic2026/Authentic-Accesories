/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7f4',
          100: '#dceee6',
          200: '#b8ddd0',
          300: '#85c4ad',
          400: '#4fa585',
          500: '#2d8568',
          600: '#0B3D2E',
          700: '#093225',
          800: '#07281e',
          900: '#051e17',
        },
        accent: '#D4AF37',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
