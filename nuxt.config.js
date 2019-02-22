const webpack = require('webpack');
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '동네공작소',
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
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'},
      { src: "https://cdn.ckeditor.com/ckeditor5/11.2.0/classic/ckeditor.js"}
    ]
  },
  
  css: ['~/assets/css/main.css'],
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
 /*
  axios:{
    baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
 //   proxyHeaders:false,
    credentials:false,
  },
  */

  
  build: {
    /*
    ** Run ESLint on save
    */
    vendor:['jquery','vue-js-modal'],
      
    modules: [
      'bootstrap-vue/nuxt'
    ],
    bootstrapVue: {
      bootstrapCSS: false, // or `css`
      bootstrapVueCSS: false // or `bvCSS`
    },
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
