import { onMounted, onUnmounted, provide, ref, useContext } from '@nuxtjs/composition-api'
import { I_RegisterRequest } from '~/types/schema/auth'
import useSocialLogin from '~/composables/useSocialLogin'

export const useRegister = () => {
  const dataRegister = ref<I_RegisterRequest>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    rolesId: ''
  })

  const isDisable = ref<boolean>(false)

  const getInfoRegister = (formValues: I_RegisterRequest, isSubmitButtonActive: boolean) => {
    if (isSubmitButtonActive) {
      dataRegister.value = formValues
    }

    isDisable.value = isSubmitButtonActive
  }

  const keyCodeActive = (e) => {
    if (e.keyCode === 13 && isDisable.value && status.value === 'input') {
      handleClickConfirm(...[dataRegister.value, 'confirm'])
    } else if (e.keyCode === 13 && isDisable.value && status.value === 'confirm') {
      handleClickSubmit(dataRegister.value)
    }
  }

  onMounted(() => {
    window.addEventListener('keyup', keyCodeActive)
  })

  onUnmounted(() => {
    window.removeEventListener('keyup', keyCodeActive)
  })

  provide('getInfoRegister', getInfoRegister)

  // ---------------- /////////////////////// ----------------
  const { app } = useContext()
  const isLoading = ref<boolean>(false)

  const status = ref<string>('input')
  const serverError = ref() // TranslateResult type
  const values = ref<I_RegisterRequest>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  // go to confirm input page
  const handleClickConfirm = (...inputData) => {
    const [formValues, formStatus] = inputData

    status.value = formStatus
    values.value = formValues
  }

  // go back input form page
  const handleClickBackInput = () => {
    status.value = 'input'
    serverError.value = ''
  }

  // submit
  const handleClickSubmit = async (formValues: I_RegisterRequest) => {
    await app
      .$repository('auth')
      .register(formValues)
      .then(() => {
        status.value = 'completed'
      })
      .catch((error) => {
        const statusCode = error.response?.data?.httpStatusCode

        if (statusCode === 400) {
          serverError.value = app.i18n.t('form.errorMessage.alreadyExistEmail')
        } else {
          serverError.value = app.i18n.t('form.errorMessage.normal')
        }
      })
  }

  // social login
  const { handleSNSLogin } = useSocialLogin()

  return {
    status,
    values,
    serverError,
    isLoading,
    handleClickConfirm,
    handleClickBackInput,
    handleClickSubmit,
    handleSNSLogin
  }
}
