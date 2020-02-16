/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const plugin = require('tailwindcss/plugin')
module.exports = {
  theme: {},
  variants: {},
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.bg-transparent': {
          backgroundColor: 'rgba(0,0,0,0.4)'
        }
      }
      addUtilities(newUtilities)
    })
  ]
}
