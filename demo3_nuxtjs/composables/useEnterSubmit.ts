import { ref, provide, inject, onMounted, onUnmounted, UnwrapRef } from '@nuxtjs/composition-api'

/*
  2 cases
  Parent ( Call Api -- Provider ) -- Child (Form -- Inject)
  Child ( Form and call Api -- Provider + Inject )
*/
export const useEnterSubmit = <T>(modal: T, callback: Function, flag: boolean = true) => {
  // data local, update when change
  const data = ref<T>(modal)

  // callback of watch, update value change
  const updateDataEnterPress = (formValues: UnwrapRef<T>) => {
    data.value = formValues
  }

  // callback of event Enter
  const keyCodeActive = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      callback(data.value)
    }
  }

  const providerUseEnterSubmt = provide('updateDataEnterPress', updateDataEnterPress)
  const injectUseEnterSubmt = inject('updateDataEnterPress')

  // create and clear side effect
  onMounted(() => {
    if (flag) {
      window.addEventListener('keyup', keyCodeActive)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('keyup', keyCodeActive)
  })

  const addEventListener = () => {
    window.addEventListener('keyup', keyCodeActive)
  }

  const removeEventListener = () => {
    window.removeEventListener('keyup', keyCodeActive)
  }

  return {
    data,
    updateDataEnterPress,
    providerUseEnterSubmt,
    injectUseEnterSubmt,
    removeEventListener,
    addEventListener
  }
}
