/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Elementos Feng Shui
        water: { dark: '#1a365d', light: '#3182ce' },
        wood: { dark: '#22543d', light: '#48bb78' },
        fire: { dark: '#9b2c2c', light: '#f56565' },
        earth: { dark: '#744210', light: '#d69e2e' },
        metal: { dark: '#4a5568', light: '#a0aec0' },
        // UI
        ink: '#0f0f0f',
        rice: '#f5f0e8',
        gold: '#c9a227',
        jade: '#00a86b',
        cinnabar: '#e34234',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
