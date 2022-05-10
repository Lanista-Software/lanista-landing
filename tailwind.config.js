const color = require('./colors')

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      'content/**/*.md',
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `sections/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
      `./safelist.txt`,
    ],
  },
  theme: {
    extend: {
      colors: {
        orange: color.orange,
        white: color.white,
        black: color.black,
        section: '#FFFFFF0A',
        heading: '#FFFFFFCC',
        // "heading-color": color.info[800],
        // bodyColor: color.info[600],
        // borderColor:color.info[200],
        // sectionColor: color.info[100],
        // backgroundColor:color.info[50],
        dark: color.info[800],
        light: color.info[50],
        warning: color.warning,
        danger: color.danger,
        primary: color.primary,
        success: color.success,
        info: color.info,
        secondary: color.secondary,
      },
      boxShadow: {
        DEFAULT: '0px 0px 16px rgba(0,0,0,0.1)',
        sm: '0px 4px 6px rgba(0,0,0,0.08)',
        md: '0px 6px 12px rgba(0,0,0,0.08)',
        lg: '0px 12px 24px rgba(0,0,0,0.08)',
        xl: '0px 20px 32px rgba(0,0,0,0.12)', // xlg olmamalı XL olmalı.
      },
      fontSize: {
        '2xs': '.625rem', // 2xs olmalı
      },
      borderRadius: {
        '2xs': '0.125rem',
        xs: '.25rem',
        sm: '.375rem',
        md: '.5rem',
        lg: '.625rem',
        xl: '.75rem', // xl olmalı
        '2xl': '1rem', // olmamalı 2xl olmalı.
      },
      lineHeight: {
        3.5: '0.875rem', // button da kullanildi deigecek mi ?
        4.5: '1.125rem', // button da kullanildi deigecek mi ?
      },
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       color: theme('colors.info.500'),
      //       '[class~="lead"]': { color: theme('colors.info.800') },
      //       a: { color: theme('colors.info.600') },
      //       strong: { color: theme('colors.info.600') },
      //       'ul > li::before': { backgroundColor: theme('colors.info.700') },
      //       hr: { borderColor: theme('colors.info.800') },
      //       blockquote: {
      //         color: theme('colors.info.100'),
      //         borderLeftColor: theme('colors.info.800'),
      //       },
      //       h1: { color: theme('colors.info.800') },
      //       h2: { color: theme('colors.info.800') },
      //       h3: { color: theme('colors.info.800') },
      //       h4: { color: theme('colors.info.800') },
      //       code: { color: theme('colors.info.500') },
      //       'a code': { color: theme('colors.info.500') },
      //       thead: {
      //         color: theme('colors.info.500'),
      //         borderBottomColor: theme('colors.info.700'),
      //       },
      //       'tbody tr': { borderBottomColor: theme('colors.info.800') },
      //     },
      //   }
      // })
    },
    colors: color,
    fontFamily: {
      inter: ['"Inter"', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      textColor: ['visited', 'disabled', 'hover'],
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
      ringColor: ['disabled'],
      ringWidth: ['disabled'],
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // require('@tailwindcss/typography'),
    // require('tailwind-safelist-generator')({
    //   path: 'safelist.txt',
    //   patterns: [
    //     'bg-{colors}',
    //     'divide-{colors}',
    //     'hover:bg-{colors}',
    //     'focus:bg-{colors}',
    //     'disabled:bg-{colors}',
    //     'text-{colors}',
    //     'hover:text-{colors}',
    //     'focus:text-{colors}',
    //     'visited:text-{colors}',
    //     'disabled:text-{colors}',
    //     'border-{colors}',
    //     'hover:border-{colors}',
    //     'focus:border-{colors}',
    //     'disabled:border-{colors}',
    //     'outline-{colors}',
    //     'hover:outline-{colors}',
    //     'focus:outline-{colors}',
    //     'disabled:outline-{colors}',
    //     'ring-{colors}',
    //     'hover:ring-{colors}',
    //     'focus:ring-{colors}',
    //     'disabled:ring-{colors}',
    //     'rounded-{borderRadius}'
    //   ],
    // }),
  ],
}
