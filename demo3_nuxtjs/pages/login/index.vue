<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left" wrap-size="large">
      <template #column-1>
        <div class="loginTemp">
          <Card :is-loading="isLoading || isInitialLoading" width-size="small">
            <template #title>
              <div>{{ $t('login.heading') }}</div>
            </template>
            <template #subtitle>
              {{ $t('login.subtext1') }}
              <LinkText
                color="secondary"
                :link="localePath('/register')"
                :value="$t('login.subtext2')"
              />
            </template>
            <template #body>
              <LoginForm
                :is-loading="isLoading"
                :server-error="serverError"
                @onClickSubmit="handleClickSubmit"
                @onClickSNSLogin="handleClickSNSLoginButton"
              />
              <div class="loginTemp_toPassChange">
                <LinkText
                  :link="localePath('pass_reminds-step1')"
                  color="secondary"
                  :value="$t('login.resetting')"
                />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  useRoute,
  ref,
  computed,
  SetupContext,
  useContext,
  useMeta,
  onMounted
} from '@nuxtjs/composition-api'
import Card from '~/components/atoms/Card/Card.vue'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import LoginForm from '~/components/organisms/LoginForm/LoginForm.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import useSocialLogin from '~/composables/useSocialLogin'
import useSetCookie from '~/composables/useSetCookie'
import { I_LoginRequest } from '~/types/schema/auth'
import { injectLoginUser } from '@/store/login'
import { injectWorkspace, injectMember, useEnterSubmit } from '~/composables'

export default defineComponent({
  name: 'Login',

  components: {
    Card,
    DefaultLayout,
    LinkText,
    LoginForm,
    SectionContainer
  },

  setup(_, context: SetupContext) {
    const { app, $auth, $config } = useContext()
    const { title, meta } = useMeta()
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref<boolean>(false)
    const isInitialLoading = ref<boolean>(true)
    // https://xxx.com?to=xxxxxxxx
    const toLoginBackQuery = computed(() => {
      return route.value?.query?.to as string
    })

    /*
     * set Token to cookie
     */
    const { setCookieToken, removeCookieToken } = useSetCookie()

    /*
     * set meta
     */
    title.value = `${app.i18n.t('meta.login.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.login.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.login.title')} | comony`
      }
    ]

    /*
     * save user email
     */
    const useLoginUserState = injectLoginUser()
    const loginUserEmail = ref<string>('')

    onMounted(() => {
      isInitialLoading.value = false
    })

    /*
     * fetch user
     */
    const serverError = ref() // TranslateResult type

    const fetchUser = async () => {
      await app
        .$repository('users')
        .userAccount()
        .then(async (response) => {
          await $auth.setUser({ ...response.data })
          // fetchMyWorkspace()
          await fetchMyWorkspace()
          checkLoginBack()
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            // skip 401 error
          } else if (error?.response?.status === 404) {
            serverError.value = app.i18n.t('form.errorMessage.userNotFoundException')
          } else {
            serverError.value = app.i18n.t('form.errorMessage.normal')
          }

          $auth.setToken('local', '')
          $auth.setRefreshToken('local', '')
          removeCookieToken($config.loginCookieDomain || '', '/')
        })
    }

    /*
     * click login submit button
     */
    const handleClickSubmit = async (formValues: I_LoginRequest) => {
      isLoading.value = true
      await $auth
        .loginWith('local', { data: { ...formValues, email: formValues.email.trim() } })
        .then((response: any) => {
          if (response?.data.data.message === 'resend confirm email') {
            // Check email verification
            $auth.setToken('local', '')
            $auth.setRefreshToken('local', '')
            removeCookieToken($config.loginCookieDomain || '', '/')

            serverError.value = app.i18n.t('form.errorMessage.resendVerifyEmail')
          } else {
            // Login succesfull
            const idToken = response?.data?.data?.AuthenticationResult?.IdToken
            const expiresIn = response?.data?.data?.AuthenticationResult?.ExpiresIn
            const domain = $config.loginCookieDomain ? $config.loginCookieDomain : ''

            setCookieToken(idToken, domain, '/', expiresIn)
            fetchUser()
          }
        })
        .catch((error) => {
          // statusCodeで判定したい
          const errorMessage = error.response?.data?.message

          if (errorMessage === 'PasswordResetRequiredException') {
            useLoginUserState.setEmail(formValues.email)
            router.push(app.localePath('login-force-pass-reset'))
          } else if (errorMessage === 'UserNotFoundException') {
            serverError.value = app.i18n.t('form.errorMessage.userNotFoundException')
          } else if (errorMessage === 'NotAuthorizedException') {
            serverError.value = app.i18n.t('form.errorMessage.notAuthorizedException')
          } else if (errorMessage === 'Bad Request Exception') {
            serverError.value = app.i18n.t('form.errorMessage.badRequest')
          } else {
            serverError.value = app.i18n.t('form.errorMessage.normal')
          }
        })
      isLoading.value = false
    }

    /*
     * workspace
     */
    const { fetchWorkspaces, menuWorkSpaceList, setWorkspaceId, fetchWorkspaceById } =
      injectWorkspace()

    const { fetchMemberMe } = injectMember()
    const workspaceId = ref('')
    const fetchMyWorkspace = async () => {
      // const toQuery = route.value.query?.to

      await fetchWorkspaces(Number($auth.user.id))
      workspaceId.value = menuWorkSpaceList?.value[0]?.id || ''
      await setWorkspaceId(workspaceId.value || '') // set current workspaceID
      fetchWorkspaceById(workspaceId.value || '') // set member role od selected workspace
      fetchMemberMe(workspaceId.value || '')
    }

    /*
     * login back to ticket system
     */
    // @ts-ignore
    const historyRoutePath: string = context.root.context.from?.path
    const regex_spaces = /\/spaces/
    const regex_dashboard = /\/dashboard/
    const regex_newDashboard = /\/dashboard\/[!-~]{6}\/new/
    const regSpacesResult = regex_spaces.test(historyRoutePath) // 空間詳細
    const regDashboardResult = regex_dashboard.test(historyRoutePath) // ダッシュボード
    const regDashboardNewResult = regex_newDashboard.test(historyRoutePath) // ダッシュボード new

    const checkLoginBack = () => {
      // go back ticket system (sub-domain)
      if (
        toLoginBackQuery.value &&
        toLoginBackQuery.value.indexOf($config.ticketSystem.frontURL) === 0
      ) {
        // forward match
        window.location.replace(toLoginBackQuery.value)
      } else if (historyRoutePath && (regSpacesResult || regDashboardNewResult)) {
        router.back()
      } else if (historyRoutePath && regDashboardResult) {
        router.push(
          app.localePath({
            name: 'dashboard-id-spaces',
            params: { id: workspaceId.value || '' }
          })
        )
      } else {
        router.push(app.localePath('spaces'))
      }
    }

    /*
     * Enter Press
     */
    useEnterSubmit(
      {
        email: '',
        password: '',
        remember_me: false
      },
      handleClickSubmit
    )

    /*
     * Social login
     */
    const { handleSNSLogin } = useSocialLogin()

    const handleClickSNSLoginButton = (SNSType) => {
      // Save the page you want to go to after login to Save to localstrage
      if (toLoginBackQuery.value) {
        localStorage.setItem('_redirect', toLoginBackQuery.value)
      } else if (regSpacesResult || regDashboardNewResult) {
        localStorage.setItem('_redirect', `${$config.frontURL}${historyRoutePath}`)
      }

      handleSNSLogin(SNSType)
    }

    return {
      isLoading,
      isInitialLoading,
      serverError,
      loginUserEmail,
      handleClickSubmit,
      fetchUser,
      handleClickSNSLoginButton
    }
  },
  head: {}
})
</script>

<style lang="scss" scoped>
.loginTemp {
  &_toPassChange {
    text-align: center;
    margin: $spacing_5x auto;
  }
}
</style>
