/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fly-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, -1500px, 0)',
            transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },
          '60%': {
            opacity: '1',
            transform: 'translate3d(0, 25px, 0)',
          },
          '75%': {
            transform: 'translate3d(0, -10px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, 5px, 0)',
          },
          '100%': {
            transform: 'none',
          },
        },
      },
      animation: {
        flyindown: 'fly-in-down 0.25s',
      },
    },
  },
  plugins: [],
};
