export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Jeflix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/tailwind.css'],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://jt-jetflix.appspot.com/graphql'
      }
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/lazysizes.client.js',
    { src: '~/plugins/vuex-persist', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/apollo',
    'nuxt-purgecss',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faTimes',
              'faPlay',
              'faHeart',
              'faBookmark',
              'faShareAlt',
              'faAngleDoubleRight',
              'faAngleDoubleLeft'
            ]
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['faTwitter']
          }
        ]
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: true,
    postcss: {
      plugins: {
        tailwindcss: './tailwind.config.js'
      }
    },
    extend(config) {}
  },
  purgeCSS: {
    mode: 'postcss',
    whitelistPatterns: [/(^|\.)fa-/, /-fa($|\.)/]
  }
}
