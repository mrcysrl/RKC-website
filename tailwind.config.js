/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'steel-blue': '#1A3D6E',
        'amber': '#F5A800',
        'primary-blue': '#2E6BB0',
        'off-white': '#F8F9FC',
        'white': '#FFFFFF',
        'deep-navy': '#0F1A2E',
        'slate-gray': '#6B7794',
      },
      fontFamily: {
        // We'll add a nice sans-serif stack later, but system fonts are fine for now.
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}