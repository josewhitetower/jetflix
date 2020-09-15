export default {
  ssr: false,
  target: 'static',

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
        httpEndpoint: process.env.BACKEND_URL || 'http://localhost:4000/graphql'
      }
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/lazysizes.client.js'
    // { src: '~/plugins/vuex-persist', ssr: false }
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
              'faAngleDoubleLeft',
              'faSignOutAlt',
              'faUserPlus',
              'faSignInAlt',
              'faUser'
            ]
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['faTwitter']
          }
        ]
      }
    ],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCuzm3tfPDPrhYygJATLcMnUegociW8UmM',
          authDomain: 'jt-jetflix.firebaseapp.com',
          databaseURL: 'https://jt-jetflix.firebaseio.com',
          projectId: 'jt-jetflix',
          storageBucket: 'jt-jetflix.appspot.com',
          messagingSenderId: '1095176938728',
          appId: '1:1095176938728:web:7cd8105edbfd5611e9d55d',
          measurementId: 'G-HND3BX7CZL'
        },
        services: {
          auth: {
            persistence: 'local',
            initialize: {
              onAuthStateChangedMutation: null,
              onAuthStateChangedAction: 'SET_AUTH_USER'
            }
          },
          firestore: true
        }
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
