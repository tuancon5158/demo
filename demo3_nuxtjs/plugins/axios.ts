/* eslint-disable import/no-mutable-exports */
import { NuxtAxiosInstance } from '@nuxtjs/axios'
let $nuxtAxiosInstance: NuxtAxiosInstance
let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  // $axios = axiosInstance
  $nuxtAxiosInstance = axiosInstance
  $axios = $nuxtAxiosInstance.create({
    baseURL: process.env.API_URL
  })
}

export { $axios }
