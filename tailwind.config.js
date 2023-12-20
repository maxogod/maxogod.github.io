/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#388fc7',
        'secondary': '#125199',
        'tertiary': '#073d7a',
        'quaternary': '#012042',

        'light-background-p1': '#388fc7',
        'light-background-p2': '#125199',
        'light-background-p3': '#073d7a',
        'light-background-p4': '#012042',

        'dark-background-p1': '#1a425c',
        'dark-background-p2': '#0f2d40',
        'dark-background-p3': '#0b2333',
        'dark-background-p4': '#051621',

        'light-primary': '#f8f8f8',
        'light-secondary': '#f8f8f8',

        'dark-primary': '#f8f8f8',
        'dark-secondary': '#f8f8f8',

        'light-text': '#f8f8f8',

        'dark-text': '#f8f8f8',
      },
    },
  },
  plugins: [],
}

