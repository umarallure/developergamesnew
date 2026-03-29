/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'dark-bg': '#07080C',
        'dark-card': '#0F1117',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-smooth': 'spin 2s linear infinite',
        'spin-reverse': 'reverse-spin 1.5s linear infinite',
        'pulse-smooth': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        'reverse-spin': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.4' },
          '50%': { transform: 'translateY(-20px) scale(1.2)', opacity: '0.8' },
        },
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
