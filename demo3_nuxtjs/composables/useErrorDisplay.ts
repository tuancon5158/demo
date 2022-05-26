import { useContext } from '@nuxtjs/composition-api'
import { injectNotification } from '~/composables'

export const useErrorDisplay = () => {
  const { app } = useContext()
  const setNotiState = injectNotification()

  const setError = (key: string | undefined, resource: string | undefined): void => {
    if (key && resource) {
      setNotiState.setNotification(app.i18n.t(`form.errorMessage.${resource}.${key}`), 'error')
    } else if (key && !resource) {
      setNotiState.setNotification(app.i18n.t(`form.errorMessage.${key}`), 'error')
    } else if (!key && resource) {
      setNotiState.setNotification(app.i18n.t(`form.errorMessage.${resource}`), 'error')
    } else {
      setNotiState.setNotification(app.i18n.t('form.errorMessage.normal'), 'error')
    }
  }

  // noted , must return in hook
  return {
    setError
  }
}
