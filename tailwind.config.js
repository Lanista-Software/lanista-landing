import { luiPlugin } from "@lui-ui/lui-tailwindcss";
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [
  //   "./components/**/*.{js,vue,ts}",
  //   "./layouts/**/*.vue",
  //   "./pages/**/*.vue",
  //   "./plugins/**/*.{js,ts}",
  //   "./app.vue",
  //   "./error.vue",
  // ],
  theme: {
    extend: {
      colors: {
        'white': colors.white,
        'black': colors.black,
        headingText: colors.slate[900],
        bodyText: colors.slate[800],
        borderColor: colors.slate[200],
        mutedText: colors.slate[600],
        disabledText: colors.slate[400],
        labelText: colors.slate[500],
        inputBg: colors.slate[50],
        bgColor: colors.white,
        primary: {
          50: '#EBF2FA',
          100: '#C2D9EF',
          200: '#9ABFE5',
          300: '#71A6DA',
          400: '#498CD0',
          500: '#2F73B6',
          600: '#25598E',
          700: '#1A4065',
          800: '#10273E',
          900: '#040B11',
          950: '#02060A',
        },
        warning: colors.amber,
        secondary: colors.slate,
        danger: {
          50: '#FEF4F5',
          100: '#FBE2E4',
          200: '#F7BEC3',
          300: '#F299A1',
          400: '#EE7580',
          500: '#E9515E',
          600: '#E31F30',
          700: '#B31724',
          800: '#81101A',
          900: '#500A10',
          950: '#2A0509', // Red için 950 tonu eklendi
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16', // Green için 950 tonu eklendi
        },
        info: colors.cyan,
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [
    luiPlugin(),
    require('@tailwindcss/typography'),
  ],
};
