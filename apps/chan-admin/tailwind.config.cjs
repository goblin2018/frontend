/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  important: true,
  corePlugins: {
    // preflight: false,
  },

  theme: {
    extend: {
      colors: {
        link: '#1890ff',
        border: '#d9d9d9',
        bg: '#f5f5f5',
        text1: '#242426',
        text2: '#444446',
        text3: '#6c6c70',
        text4: '#aeaeb2',
      },
      fontSize: {
        xs: [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            fontWeight: 400,
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: 400,
          },
        ],
        bold: [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: 500,
          },
        ],
        xl: [
          '1.5rem',
          {
            lineHeight: '2rem',
            fontWeight: 500,
          },
        ],
        '2xl': [
          '2.25rem',
          {
            lineHeight: '3rem',
            fontWeight: 500,
          },
        ],
      },
      width: {
        18: '72px',
        25: '100px',
        30: '120px',
        35: '140px',
        50: '200px',
        60: '240px',
        75: '300px',
        100: '400px',
        125: '500px',
        200: '800px',
      },
      height: {
        25: '100px',
        30: '120px',
        50: '200px',
        200: '800px',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme('bgGradientDeg', {}), {
            10: '10deg',
            105: '105deg',
            115: '115deg',
          }),
        }
      )
    }),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
