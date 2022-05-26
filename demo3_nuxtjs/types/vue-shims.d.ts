import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Auth } from 'nuxtjs__auth'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth
    $axios: NuxtAxiosInstance
    $ticketAxios: NuxtAxiosInstance
  }
}
declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
    $ticketAxios: NuxtAxiosInstance
    $auth: Auth
  }
}
declare global {
  type Nullable<T extends { [key: string]: any }> = {
    [K in keyof T]: T[K] | null
  }
}
