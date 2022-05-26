import { useRoute, useRouter } from '@nuxtjs/composition-api'
import * as VueRoute from 'vue-router'
import { withLeadingSlash } from 'ufo'

export const useRouteHistory = () => {
  const router = useRouter()
  const route = useRoute()

  const getKeepRouteFrom = (location: VueRoute.RawLocation) => {
    const _route = { path: '', query: {} }

    if (typeof location === 'string') {
      _route.path = withLeadingSlash(location)
      _route.query = route.value.query
    } else {
      location.query = { ...location.query, ...route.value.query }

      if (location.path) location.path = withLeadingSlash(location.path)

      Object.assign(_route, location)
    }

    return _route as VueRoute.RawLocation
  }

  const getRouteFrom = (location: VueRoute.RawLocation) => {
    const _route = { path: '', query: {} }

    if (typeof location === 'string') {
      _route.path = withLeadingSlash(location)
      _route.query = { from: route.value.fullPath }
    } else {
      location.query = { ...location.query, from: route.value.fullPath }

      if (location.path) location.path = withLeadingSlash(location.path)

      Object.assign(_route, location)
    }

    return _route as VueRoute.RawLocation
  }

  const redirect = (location: VueRoute.RawLocation) => {
    router.push(getRouteFrom(location))
  }

  const back = (defaultUrl: VueRoute.RawLocation) => {
    const from = route.value.query.from as string

    if (from) return router.replace({ path: from })

    if (typeof defaultUrl === 'string') {
      return router.push(withLeadingSlash(defaultUrl))
    }

    return router.push(defaultUrl)
  }

  return { redirect, getRouteFrom, getKeepRouteFrom, back }
}
