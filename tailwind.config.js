const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      primary: {
        500: '#0D5AFD',
      },
      neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        600: '#4B5563',
        900: '#0F172A',
      },
      red: {
        400: '#F13232',
      },
    },
    extend: {
      lineHeight: {
        3.5: '0.875rem',
      },
      data: {
        enabled: 'disabled="false"',
        disabled: 'disabled="true"',
        loading: 'loading="true"',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('pseudos', ['&::before', '&::after'])
    }),
  ],
}
