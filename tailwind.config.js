/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka"', '"Comic Sans MS"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      colors: {
        candy: {
          pink: '#ff5fa2',
          yellow: '#ffd84d',
          blue: '#4dc6ff',
          green: '#7ee36b',
          purple: '#b06bff',
          cream: '#fff7e6',
        },
      },
      boxShadow: {
        toy: '0 8px 0 0 rgba(0,0,0,0.15)',
        pop: '0 6px 0 0 rgba(0,0,0,0.2)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        bob: 'bob 2.4s ease-in-out infinite',
        spinSlow: 'spinSlow 6s linear infinite',
        spinFast: 'spinSlow 1s linear infinite',
        sparkle: 'sparkle 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
