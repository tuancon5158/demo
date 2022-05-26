import { reactive, ref, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import useSetCookie from '~/composables/useSetCookie'
import { injectWorkspace, injectMember } from '~/composables'
import { injectLoginUser } from '~/store/login'

const useSocialLogin = () => {
  const { app, $auth, $config } = useContext()
  const route = useRoute()
  const router = useRouter()
  const isLoadingFetchSocialLogin = ref(false)

  // set Token to cookie
  const { setCookieToken, removeCookieToken } = useSetCookie()

  const cognitoInfo = reactive<{
    url: string
    type: string
    redirectUrl: string
    scope: string
    responseType: string
  }>({
    url: '',
    type: '',
    redirectUrl: process.client
      ? app.i18n.locale === 'en'
        ? `${location.protocol}//${location.host}/en`
        : `${location.protocol}//${location.host}`
      : '',
    scope: 'email openid profile',
    responseType: 'TOKEN'
  })

  // sign-in
  const handleSNSLogin = (SNSTypeStr: string): void => {
    cognitoInfo.type = SNSTypeStr[0].toUpperCase() + SNSTypeStr.slice(1)
    cognitoInfo.url = `https://${$config.cognitoDomain}/oauth2/authorize?identity_provider=${cognitoInfo.type}&redirect_uri=${cognitoInfo.redirectUrl}/spaces&response_type=${cognitoInfo.responseType}&client_id=${$config.cognitoClientId}&scope=${cognitoInfo.scope}`

    location.href = cognitoInfo.url
  }

  // logout
  const handleClickSNSLogoutButton = (redirectPath) => {
    if ($config.cognitoDomain) {
      if (redirectPath) {
        cognitoInfo.url = `https://${$config.cognitoDomain}/logout?client_id=${$config.cognitoClientId}&response_type=code&scope=${cognitoInfo.scope}&logout_uri=${cognitoInfo.redirectUrl}${redirectPath}`
      } else {
        cognitoInfo.url = `https://${$config.cognitoDomain}/logout?client_id=${$config.cognitoClientId}&response_type=code&scope=${cognitoInfo.scope}&logout_uri=${cognitoInfo.redirectUrl}/login`
      }

      // window.location.replace(cognitoInfo.url)
      location.href = cognitoInfo.url
    } else if (redirectPath) {
      router.push(app.localePath(redirectPath))
    }
  }

  // signin
  const useLoginUserState = injectLoginUser()
  const { fetchWorkspaces, menuWorkSpaceList, setWorkspaceId, fetchWorkspaceById } =
    injectWorkspace()

  const { fetchMemberMe } = injectMember()

  const fetchSNSLoginUser = async () => {
    isLoadingFetchSocialLogin.value = true
    useLoginUserState.setSocialLoginLoading(true)

    if (process.client) {
      const urlHashStr = route.value.hash || ''

      if (urlHashStr) {
        // hide idToken query param
        history.replaceState('', '', route.value.path)
        const domain = $config.loginCookieDomain ? $config.loginCookieDomain : ''

        // Get token
        let urlHashStr_idToken = urlHashStr.substr(urlHashStr.indexOf('id_token='))

        urlHashStr_idToken = urlHashStr_idToken.substr(0, urlHashStr_idToken.indexOf('&'))
        urlHashStr_idToken = urlHashStr_idToken.replace('id_token=', '')

        // Get toke expire sec
        let urlHash_ExpiresIn = urlHashStr.substr(urlHashStr.indexOf('expires_in='))

        urlHash_ExpiresIn = urlHash_ExpiresIn.replace('expires_in=', '')

        await app
          .$repository('auth')
          .socialLogin(urlHashStr_idToken)
          .then((response) => {
            $auth.setUser({ ...response.data }) // set user

            $auth.setUserToken(`${urlHashStr_idToken}`) // set token
            setCookieToken(urlHashStr_idToken, domain, '/', Number(urlHash_ExpiresIn)) // set token to cookie
          })
          .catch(() => {
            $auth.setToken('local', '')
            $auth.setRefreshToken('local', '')
            router.push(app.localePath('login'))
            removeCookieToken($config.loginCookieDomain || '', '/')
            handleClickSNSLogoutButton('/login')
          })

        // fetch workspace info
        if ($auth.user.id) {
          await fetchWorkspaces(Number($auth.user.id))
          const workspaceId = menuWorkSpaceList?.value[0]?.id || ''

          await setWorkspaceId(workspaceId || '') // set current workspaceID
          fetchWorkspaceById(workspaceId || '') // set member role od selected workspace
          fetchMemberMe(workspaceId || '')

          // 遷移
          const localStorageRedirectPath = localStorage.getItem('_redirect') as string

          if (localStorageRedirectPath) {
            location.href = localStorageRedirectPath

            return new Promise(() => {
              localStorage.removeItem('_redirect')
            })
          }

          isLoadingFetchSocialLogin.value = false
          useLoginUserState.setSocialLoginLoading(false)
        }
      } else {
        isLoadingFetchSocialLogin.value = false
        useLoginUserState.setSocialLoginLoading(false)
      }
    }
  }

  return {
    handleSNSLogin,
    handleClickSNSLogoutButton,
    fetchSNSLoginUser,
    isLoadingFetchSocialLogin
  }
}

export default useSocialLogin
