const plugin = require('tailwindcss/plugin')
const colors = require('./config/colors')

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  important: false,
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: {
        default: '1rem',
      },
    },
    fontFamily: {
      // sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      blue: colors.blue,
      green: colors.green,
      red: colors.red,
      yellow: colors.yellow,
      teal: colors.teal,
      purple: colors.purple,
      primary: '#2B50C0',
      'primary-2': '#EAEDF9',
      error: colors.red[300],
      success: colors.green[300],
      warning: colors.yellow[300],
      info: colors.purple[300],
      light: {
        100: colors.neutral[10],
        200: colors.neutral[20],
        300: colors.neutral[30],
        400: colors.neutral[40],
        500: colors.neutral[50],
        600: colors.neutral[60],
        700: colors.neutral[70],
        800: colors.neutral[80],
        900: colors.neutral[90],
      },
      dark: {
        100: colors.neutral[100],
        200: colors.neutral[200],
        300: colors.neutral[300],
        400: colors.neutral[400],
        500: colors.neutral[500],
        600: colors.neutral[600],
        700: colors.neutral[700],
        800: colors.neutral[800],
        900: colors.neutral[900],
      },
      neutral: {
        1: colors.white,
        2: '#FAFAFA',
        3: '#F5F5F5',
        4: '#F0F0F0',
        5: '#D9D9D9',
        6: '#BFBFBF',
        7: '#8C8C8C',
        10: '#262626',
        11: '#1F1F1F',
        12: '#141414',
        13: '#000000',
      },
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
    },
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(({ addBase, addUtilities }) => {
      addBase({
        body: {
          color: colors.neutral[800],
        },
        h2: {
          fontSize: '30px',
          lineHeight: '40px',
        },
        h3: {
          fontSize: '24px',
          lineHeight: '32px',
        },
        h4: {
          fontSize: '20px',
          lineHeight: '28px',
        },
        h5: {
          fontSize: '16px',
          lineHeight: '24px',
        },
      })

      addUtilities({
        '.fbc': {
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
        },
      })
    }),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    // enabled: false,
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    // These options are passed through directly to PurgeCSS
    options: {},
  },
}
