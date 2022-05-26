import {
  provide,
  inject,
  InjectionKey,
  reactive,
  toRefs,
  useContext,
  computed,
  useRouter
} from '@nuxtjs/composition-api'
import { injectWorkspace } from '~/composables'

interface I_MembersInfo {
  memberRole: number
}

const globalState = reactive({
  membersInfo: {
    memberRole: 0
  }
})

export const useMember = () => {
  const { app } = useContext()
  const router = useRouter()

  // ---------------- workspace ----------------
  const { getWorkspaceId } = injectWorkspace()

  const getMemberInfo = computed(() => {
    const membersInfo = {
      memberRole: 0
    }

    if (process.client) {
      const localStorageMemberRole = JSON.parse(localStorage.getItem('_members_info') as string)

      if (globalState.membersInfo.memberRole) {
        membersInfo.memberRole = globalState.membersInfo.memberRole
      } else if (localStorageMemberRole) {
        membersInfo.memberRole = localStorageMemberRole.memberRole
      }
    }

    return membersInfo
  })

  const setMembersInfo = (inpuData: I_MembersInfo) => {
    if (process.client) {
      globalState.membersInfo = inpuData
      localStorage.setItem('_members_info', JSON.stringify(inpuData))
    }
  }

  // ---------------- Remove localStrage items ----------------
  const removeMemberInfoLocalstrage = () => {
    localStorage.removeItem('_members_info')
  }

  const fetchMemberMe = async (workspaceId: string): Promise<any> => {
    if (!workspaceId) return

    return await app
      .$repository('members')
      .getMemberMe(workspaceId)
      .then((response) => {
        const { memberRole } = response.data

        setMembersInfo({ memberRole })

        return response
      })
      .catch((error) => {
        setMembersInfo({ memberRole: 0 })
        router.push(
          app.localePath({
            name: 'dashboard-id-spaces',
            params: { id: getWorkspaceId.value || '' }
          })
        )

        return error
      })
  }

  return {
    ...toRefs(globalState),
    getMemberInfo,
    fetchMemberMe,
    removeMemberInfoLocalstrage
  }
}

type MemberStore = ReturnType<typeof useMember>

export const MemberKey: InjectionKey<MemberStore> = Symbol('MemberStore')

export const provideMember = () => {
  provide(MemberKey, useMember())
}

export const injectMember = () => {
  const state = inject(MemberKey)

  if (!state) {
    throw new Error('Unable to install GlobalState')
  }

  return state
}
