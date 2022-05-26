import { Inject, NuxtApp } from '@nuxt/types/app'
import { RepositoryFactory } from '~/repositories/factories/RepositoryFactory'

declare module 'vue/types/vue' {
  interface Vue {
    $repo(name: string): {
      [key: string]: any
    }
  }
}

const repositories = ({ app }: { app: NuxtApp }, inject: Inject) => {
  inject('repository', (name: string) => {
    return RepositoryFactory.get(name)(app.$axios)
  })
}

export default repositories
