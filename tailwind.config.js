/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#0F172A', // Deep Slate
        surface: '#1E293B',
        text: '#F8FAFC',
        accent: '#64748B',
      },
    },
  },
  plugins: [],
};
