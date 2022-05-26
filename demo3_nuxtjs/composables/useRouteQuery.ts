import { computed, Ref, unref, useRoute, useRouter, watch } from '@nuxtjs/composition-api'
import { isArray, isNumeric } from '~/composables/utilities/formatCheck'
import { cloneDeep } from '~/composables/utilities/cloneDeep'
import { useLazyValue } from '@/composables'

interface ReactiveRouteOptions {
  mode?: 'replace' | 'push'

  route?: ReturnType<typeof useRoute>

  router?: ReturnType<typeof useRouter>
}

const nonFilters: string[] = ['sortAlias']

/// get all query object
export const getQuery = () => {
  const route = useRoute()

  const query = computed(() => route.value.query as { [index: string]: string | undefined })

  return { query }
}

export const useRouteQuery = <T>(
  name: string,
  defaultValue?: T,
  { mode = 'push', route = useRoute(), router = useRouter() }: ReactiveRouteOptions = {}
) => {
  /// get and set query base on key
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
        query
      })
    }
  })
}

export const useQueryValue = <T>(modelValue: Ref<T>, key: string, debounce = 0) => {
  const { lazyValue, internalValue } = useLazyValue(modelValue, debounce)

  /// Get query based on key and set
  const queryModel = useRouteQuery(key)

  watch(internalValue, (value) => {
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

export const useMultipleQueryValue = (filters: any) => {
  const router = useRouter()
  const route = useRoute()
  const { query } = route.value

  watch(
    filters,
    (value) => {
      router.push({
        query: {
          ...getFiltersDataFromUrl({ ...query, ...value }, true)
        }
      })
    },
    { deep: true }
  )

  return {}
}

const getFiltersDataFromUrl = (query: any, onlyFilters: boolean) => {
  const makeExist = Object.keys(query).filter((f) => query[f])

  return makeExist
    .filter((f) => (onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f)))
    .reduce(reduceFilters(query), {})
}

const reduceFilters = (query: any) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr)

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  }
}
/// useRouteQuery update -> useRouteQuery -> update query
/// exp :  ...useQueryValue(toRef(props, 'value'), 'search', props.debounce) -> set queryParam with key "search" abd delay
