module.exports = {
  mode: 'universal',
  head: {
    titleTemplate: '%s',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@/styles/index.scss'
  ],
  build: {
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      })
    }
  },
  plugins: [
    '@/plugins/composition-api'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },
  axios: {
    baseURL: 'https://reqres.in/api'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post'
          },
          logout: false,
          user: false
        },
        tokenRequired: true,
        autoFetchUser: false
      }
    }
  },
  router: {
    base: '/',
    routeNameSplitter: '/',
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/admin',
        beforeEnter: (to, from, next) => { next('/') }
      })
      routes.push({
        path: '/notifications',
        beforeEnter: (to, from, next) => { next('/') }
      })
      routes.push({
        path: '*',
        redirect: '/'
      })
    }
  }
}
