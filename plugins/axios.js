import axios from 'axios'

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  $axios.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  $axios.setHeader('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
  $axios.setHeader('Access-Control-Allow-Credentials: true')
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}