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
      black: '#000',
      white: '#fff',
      primary: {
        10: '#EFF8FD',
        30: '#C5DBF7',
        50: '#B9DFFF',
        200: '#6298EA',
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
      width: {
        4.5: '1.125rem',
        9.5: '2.375rem',
      },
      height: {
        4.5: '1.125rem',
        19: '4.75rem',
      },
      zIndex: {
        dropdown: 1000,
        'dialog-backdrop': 1050,
        dialog: 1055,
        tooltip: 1080,
        toast: 1950,
      },
      lineHeight: {
        3.5: '0.875rem',
        4.5: '1.125rem',
      },
      data: {
        active: 'state="active"',
        inactive: 'state="inactive"',
        enabled: 'disabled="false"',
        disabled: 'disabled="true"',
        loading: 'loading="true"',
        open: 'state="open"',
        closed: 'state="closed"',
        checked: 'state="checked"',
        unchecked: 'state="unchecked"',
      },
      boxShadow: {
        trialCard:
          '0 0 0 0 rgba(99, 99, 99, 0.04), 0 2px 4px 0 rgba(99, 99, 99, 0.04), 0 7px 7px 0 rgba(99, 99, 99, 0.03), 0 15px 9px 0 rgba(99, 99, 99, 0.02), 0 26px 10px 0 rgba(99, 99, 99, 0.01), 0 41px 11px 0 rgba(99, 99, 99, 0.00)',
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
