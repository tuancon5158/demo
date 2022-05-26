import {
  provide,
  inject,
  InjectionKey,
  reactive,
  toRefs
} from '@nuxtjs/composition-api'

export const useLoginUser = () => {
  const globalState = reactive({
    loginUserEmail: '',
    isSocialLoginLoading: false
  })

  // Email address of the user who is trying to log in.
  const getEmail = () => {
    return globalState.loginUserEmail
  }

  const setEmail = (inputData: string) => {
    globalState.loginUserEmail = inputData
  }

  // Social login loading status
  const getSocialLoginLoading = () => {
    return globalState.isSocialLoginLoading
  }

  const setSocialLoginLoading = (status: boolean) => {
    globalState.isSocialLoginLoading = status
  }

  return {
    ...toRefs(globalState),
    getEmail,
    setEmail,
    getSocialLoginLoading,
    setSocialLoginLoading
  }
}

type LoginUserStore = ReturnType<typeof useLoginUser>

export const LoginUserKey: InjectionKey<LoginUserStore> = Symbol('GlobalState')

export const provideLoginUser = () => {
  provide(LoginUserKey, useLoginUser())
}

export const injectLoginUser = () => {
  const state = inject(LoginUserKey)

  if (!state) {
    throw new Error('Unable to install GlobalState')
  }

  return state
}
