const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'rgba-blue': 'rgba(44, 107, 174, 0.901)',
      }
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'light',
    }),
  ],
};
