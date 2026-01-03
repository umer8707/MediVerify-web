/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#007AFF',
        'deep-blue': '#0051D5',
        'light-blue': '#5AC8FA',
        'success-green': '#34C759',
        'alert-red': '#FF3B30',
        'warning-orange': '#FF9500',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}



