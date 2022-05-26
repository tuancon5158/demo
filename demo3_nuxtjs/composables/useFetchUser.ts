import { ref, useContext, useRouter } from '@nuxtjs/composition-api'
import { injectWorkspace, injectMember } from '~/composables'
import { memberRole } from '~/constants/userRole'
import { workspaceType } from '~/constants/workspace'
import useSetCookie from '~/composables/useSetCookie'

export const useFetchUser = () => {
  const { app, $auth, $config } = useContext()
  const router = useRouter()
  // set Token to cookie
  const { removeCookieToken } = useSetCookie()

  const isLoggedIn = ref(false)
  const isLoading = ref(true)

  // Check loggedIn or not
  const fetchUser = async (redirectTo: string = ''): Promise<void> => {
    await app
      .$repository('users')
      .userAccount()
      .then(() => {
        isLoggedIn.value = true
      })
      .catch(() => {
        if (redirectTo) router.push(app.localePath(`${redirectTo}`))

        $auth.setToken('local', '')
        $auth.setRefreshToken('local', '')
        removeCookieToken($config.loginCookieDomain || '', '/')
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  // Check member role
  const { getMemberInfo } = injectMember()
  const { getWorkspaceId } = injectWorkspace()

  const fetchUserMemberRole = (): void => {
    if (getMemberInfo?.value.memberRole === memberRole.MEMBER) {
      router.push(
        app.localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId.value || '' } })
      )
    } else {
      isLoading.value = false
    }
  }

  // Check workspacetype
  const { getWorkspaceInfo } = injectWorkspace()

  const fetchUserWorkspaceType = () => {
    if (getWorkspaceInfo.value?.type === workspaceType.PERSONAL) {
      router.push(
        app.localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId.value || '' } })
      )
    } else {
      isLoading.value = false
    }
  }

  return {
    fetchUser,
    fetchUserMemberRole,
    fetchUserWorkspaceType,
    isLoggedIn,
    isLoading
  }
}
