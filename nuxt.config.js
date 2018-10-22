const webpack = require('webpack');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'demoshop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'demosite' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'}
    ]
  },
  modules: [
    '@nuxtjs/axios', 'bootstrap-vue/nuxt'
  ],
  plugins: [
    { src: '~/plugins/modal.js', ssr: false},
    //'~/plugins/axios',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  axios:{
    baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 80}`,
 //   proxyHeaders:false,
    credentials:false,
  },
  
  build: {
    /*
    ** Run ESLint on save
    */
    vendor:['jquery','vue-js-modal'],
    plugins:[
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options:{
            fix: true
          },
          
        })
      }
    }
  }
}
