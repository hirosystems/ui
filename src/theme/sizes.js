const largeSizes = {
  full: '100%',
  '3xs': '14rem',
  '2xs': '16rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem'
}

const containers = {
  'screen-sm': '640px',
  'screen-md': '768px',
  'screen-lg': '1024px',
  'screen-xl': '1280px'
}

export const baseSizes = [0, 4, 8, 12, 16, 24, 32, 48, 64, 96]

const sizes = {
  ...baseSizes,
  ...largeSizes,
  containers
}

export default sizes
