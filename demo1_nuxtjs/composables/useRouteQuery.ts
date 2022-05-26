import {
  computed,
  Ref,
  unref,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { isArray, isNumeric, cloneDeep } from '@/utils'
import { useLazyValue } from '@/composables'

interface ReactiveRouteOptions {
  mode?: 'replace' | 'push'

  route?: ReturnType<typeof useRoute>

  router?: ReturnType<typeof useRouter>
}

export const useRouteQuery = <T>(
  name: string,
  defaultValue?: T,
  {
    mode = 'push',
    route = useRoute(),
    router = useRouter(),
  }: ReactiveRouteOptions = {}
) => {
  return computed<T>({
    get() {
      const data = route?.value.query[name]

      if (data == null) return defaultValue as T

      if (Array.isArray(data)) return data.filter(Boolean) as unknown as T

      if (isNumeric(data)) return Number(data) as unknown as T

      return data as T
    },
    set(value) {
      let query: Record<string, any>

      if (value === undefined) {
        query = cloneDeep(route.value.query)
        delete query[name]
      } else {
        query = { ...route.value.query, [name]: value }
      }

      router[unref(mode)]({
        path: route.value.path,
        query,
      })
    },
  })
}

export const getQuery = () => {
  const route = useRoute()

  const query = computed(
    () => route.value.query as { [index: string]: string | undefined }
  )

  return { query }
}

export const useQueryValue = <T>(
  modelValue: Ref<T>,
  key: string,
  debounce = 0
) => {
  const { lazyValue, internalValue } = useLazyValue(modelValue, debounce)

  const queryModel = useRouteQuery(key)

  watch(internalValue, value => {
    if (value && typeof value === 'string') {
      return (queryModel.value = value)
    }

    if (typeof value === 'number') {
      return (queryModel.value = String(value))
    }

    if (isArray(value) && value.length) {
      return (queryModel.value = value.join(','))
    }

    queryModel.value = undefined
  })

  return { lazyValue, internalValue }
}
