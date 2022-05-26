import {
  provide,
  inject,
  InjectionKey,
  reactive,
  toRefs,
  watch,
  useRoute
} from '@nuxtjs/composition-api'

const globalState = reactive({
  status: false,
  message: '',
  type: 'default',
  redirectTo: ''
})

export const useGlobalNotification = () => {
  const route = useRoute()

  const get = () => {
    return globalState
  }

  const setNotification = (inputData: string, type: string, redirectTo = ''): void => {
    globalState.status = Boolean(inputData)
    globalState.message = inputData
    globalState.type = type
    globalState.redirectTo = redirectTo
  }
  let timeId: number

  // setTimeout if not redirect button
  watch(
    () => globalState.status,
    () => {
      if (timeId) {
        clearTimeout(timeId)
      }

      if (!globalState.redirectTo) {
        timeId = window.setTimeout(() => {
          setNotification('', 'default', '')
        }, 5000)
      }
    }
  )

  // clear Notification when route change if notification have redirect button
  watch(
    () => route.value,
    () => {
      if (globalState.redirectTo) {
        setNotification('', 'default', '')
      }
    },
    { immediate: true } // run first time if load new notification, if not, watch route
  )

  return {
    ...toRefs(globalState),
    get,
    setNotification
  }
}

type NotificationStore = ReturnType<typeof useGlobalNotification>

export const NotificationKey: InjectionKey<NotificationStore> = Symbol('NotificationStore')

export const provideNotification = () => {
  provide(NotificationKey, useGlobalNotification())
}

export const injectNotification = () => {
  const state = inject(NotificationKey)

  if (!state) throw new Error('Unable to install GlobalNotificationState')

  return state
}
