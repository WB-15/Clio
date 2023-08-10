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
        50: '#B9DFFF',
        500: '#0D5AFD',
        600: '#135EFD',
        700: '#0044E4',
        900: '#0021C9',
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
      green: {
        50: '#EBF4EE',
        100: '#C7E0CE',
        200: '#74B185',
        500: '#53B270',
      },
      red: {
        50: '#FBF0F0',
        100: '#FAC7CC',
        300: '#D96566',
        600: '#F13232',
        900: '#EB0404',
      },
    },
    extend: {
      height: {
        19: '76px',
      },
      zIndex: {
        toast: 1950,
      },
      lineHeight: {
        3.5: '0.875rem',
        4.5: '1.125rem',
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
      addVariant('group-hocus', ':merge(.group):is(:hover,:focus) &')
      addVariant('pseudos', ['&::before', '&::after'])
    }),
  ],
}
