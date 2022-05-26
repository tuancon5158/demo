import { Plugin } from '@nuxt/types'
// import { useRouteQuery } from '~/composables'
import { initializeAxios } from '~/plugins/axios'

const accessor: Plugin = ({ app, $axios, store, redirect, $config }): void => {
  initializeAxios($axios)

  $axios.onRequest((config: any) => {
    const ApiKeyValue = $config.apiKeyValue

    config.headers.common.Accept = 'application/json'
    config.headers.common[$config.apiKeyName] = ApiKeyValue
    config.headers.common[$config.fonrtServerKeyName] = $config.fonrtServerKeyValue

    // do same user information that works in a separate tab
    if (process.client) {
      const localstrageToken = localStorage.getItem('auth._token.local')
      const authToken = store.$auth.getToken('local')

      if (authToken && localstrageToken !== authToken) location.reload()
    }

    return config
  })

  $axios.onResponse((response) => {
    return Promise.resolve(response)
  })

  $axios.onError((axiosErr) => {
    const code = axiosErr.response?.status ? axiosErr.response.status : 500
    // const errorMessage = axiosErr.response?.data.message

    if (app.$auth.loggedIn && code === 401) {
      app.$auth.logout()
      redirect('/login')
    }
  })
}

export default accessor
