import {
  computed,
  getCurrentInstance,
  Ref,
  ref,
  watch
} from '@nuxtjs/composition-api'
import { debounce } from '~/composables/utilities/debounce'

export const useLazyValue = <T>(modelValue: Ref<T>, wait = 0) => {
  const vm = getCurrentInstance()
  // @ts-expect-error mis-alignment with @vue/composition-api
  /// check from template or setup emit does exits ?
  const _emit = vm?.emit || vm?.$emit?.bind(vm)

  const lazyValue = ref<T>()
  // get and set delay lazy Value
  const internalValue = computed<T>({
    get() {
      return lazyValue.value as T
    },
    /// when internalValue is set, need debounce value to descrease call something too many time
    set: debounce((val) => {
      lazyValue.value = val
      _emit('input', lazyValue.value)
    }, wait)
  })

  watch(
    modelValue,
    (value) => {
      lazyValue.value = value
    },
    { immediate: true, deep: true }
  )

  return { lazyValue, internalValue }
}
