/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'apple-dark': '#1d1d1f',
        'apple-light': '#f5f5f7',
        'apple-blue': '#007aff',
        'apple-gray-100': '#fafafa',
        'apple-gray-200': '#f0f0f0',
        'apple-gray-300': '#d2d2d7',
        'apple-gray-400': '#86868b',
        'apple-gray-500': '#6e6e73',
        'apple-gray-600': '#515154',
        'apple-gray-700': '#424245',
        'apple-gray-800': '#1d1d1f',
        'apple-gray-900': '#000000',
      },
      fontFamily: {
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}