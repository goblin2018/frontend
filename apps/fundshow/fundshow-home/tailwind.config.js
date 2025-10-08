module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-white': 'rgba(255,255,255,0.85)',
        'text-white2': 'rgba(255,255,255,0.65)',
        'white-disabled': 'rgba(255,255,255,0.25)',
        'black-disabled': 'rgba(0,0,0,0.25)',
        'text-black': 'rgba(0,0,0,0.85)',
        'text-black2': 'rgba(0,0,0,0.65)',
        'bg-gray': '#f4f4f4',
        'bg-light': 'rgba(0,0,0,0.08)',
        'border-gray': 'rgba(0,0,0,0.15)',
        'border-dark': 'rgba(255,255,255,0.45)',
        orange: {
          100: '#fff7e8',
          200: '#feebc7',
          300: '#fddc9a',
          400: '#fccb6b',
          500: '#fbbc3e',
          600: '#faad14',
          700: '#d59311',
          800: '#b27b0e',
          900: '#8f630b'
        }
      },
      width: {
        30: '120px'
      },
      height: {
        18: '72px'
      },
      keyframes: {
        // 'flip-vertically': {
        //   ''
        // }
      },
      // animation: {
      //   'flip-vertically': 'rotate-180 5s linear'
      // }
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding'
      },
      transitionDuration: {
        0: '0ms',
        2000: '2000ms'
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    }
  ]
}
