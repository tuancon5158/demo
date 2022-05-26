import { defineNuxtPlugin } from '@nuxtjs/composition-api'
// import camelcaseKeys from 'camelcase-keys'
// const TIMEOUT_MILLISECONDS = 10000

export default defineNuxtPlugin(context => {
  // context.app.$axios.defaults.timeout = TIMEOUT_MILLISECONDS

  // context.app.$axios.onResponse(response => {
  // response.data = camelcaseKeys(response.data, { deep: true })
  // })

  context.app.$axios.onResponseError(error => {
    return Promise.reject(error.response)
  })
})
