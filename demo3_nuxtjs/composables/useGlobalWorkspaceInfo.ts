import {
  provide,
  inject,
  InjectionKey,
  reactive,
  toRefs,
  useContext,
  computed
} from '@nuxtjs/composition-api'
import { I_Get_Workspace, I_Workspace_Get_Request } from '~/types/schema/workspace'
import {
  I_Get_Workspace_Response_Data,
  I_Response_Type,
  I_WorkSpaceInfoSingle
} from '~/types/schema/response'
import { workspacePlanLabel } from '~/constants/workspace'

interface I_WorkspaceInfo {
  workspacePlanId: number
  name: string
  type: number
}

interface I_WorkSpaceDropdown {
  id?: string
  label?: string
  subtitle?: string
  subtitleEn?: string
  icon?: string
  imagePath?: string
  color?: string
  link?: string
  action?: string
}

interface I_Work_Space {
  id: string
  planId: number
  name: string
  type: number
}
interface I_Global_State {
  workspace: I_Work_Space
  workspaceList: I_WorkSpaceDropdown[]
  menuWorkSpaceList: I_WorkSpaceDropdown[]
}

// Global data
const globalState = reactive<I_Global_State>({
  workspace: {
    id: '0',
    planId: 0,
    name: '',
    type: 0
  },
  workspaceList: [] as I_WorkSpaceDropdown[],
  menuWorkSpaceList: [] as I_WorkSpaceDropdown[]
})

export const useWorkspace = () => {
  const { route, app, $config } = useContext()

  // ---------------- Workspace ID ----------------
  // [GET] Get the currently selected WorkspaceID.
  const workspaceIdParams = computed(() => route.value.params.id)

  const getWorkspaceId = computed(() => {
    if (process.client) {
      const localStorageWorkspaceId = JSON.parse(localStorage.getItem('_workspace') as string)

      if (workspaceIdParams.value) {
        globalState.workspace.id = workspaceIdParams.value
      } else if (localStorageWorkspaceId) {
        globalState.workspace.id = localStorageWorkspaceId.id
      } else if (globalState.menuWorkSpaceList.length > 0) {
        globalState.workspace.id = globalState.menuWorkSpaceList[0].id || ''
      }

      return globalState.workspace.id
    }
  })

  // [SET] Put the currently selected workspaceID into the state and localStrage.
  const setWorkspaceId = (workspaceId: string) => {
    if (process.client) {
      globalState.workspace.id = workspaceId
      localStorage.setItem('_workspace', JSON.stringify(globalState.workspace))
    }
  }

  // ---------------- Workspace List ----------------

  // List of workspaces to be displayed in the sidebar (is_active=1 only)
  const getPlanName = (planId: number, type: number) => {
    const targetItem = workspacePlanLabel.find((item) => {
      if (type === 1) return item.type === type

      return item.planId === planId && item.type === type
    })

    return targetItem
  }

  const setMenuWorkSpaceList = (myWorkspaceList: I_Get_Workspace[]) => {
    if (process.client) {
      myWorkspaceList.forEach((myWorkspace) => {
        if (myWorkspace.isActive) {
          const planId = myWorkspace?.workspacePlan?.planId
          const typeId = myWorkspace?.type

          globalState.menuWorkSpaceList.push({
            id: myWorkspace.id,
            subtitle: getPlanName(planId, typeId)?.name,
            subtitleEn: getPlanName(planId, typeId)?.nameEn,
            label: myWorkspace.name,
            icon: '',
            imagePath: `${$config.frontURL}/${myWorkspace.thumbnailUrl}` || '',
            color: 'black',
            action: 'onClick'
          })
        }
      })
      // push last array
      globalState.menuWorkSpaceList.push({
        label: app.i18n.t('sidebar.applyNewWorkSpace'),
        icon: 'plus',
        color: 'black',
        link: app.localePath({ name: 'dashboard-apply' }),
        action: 'onClose'
      })
    }
  }

  const fetchWorkspaces = async (authUserId: number) => {
    if (!authUserId) return

    const requestParam: I_Workspace_Get_Request = {
      userId: authUserId,
      page: '1',
      limit: 100,
      sort: 'type',
      direction: 'DESC'
    }

    await app
      .$repository('workspaces')
      .getWorkspaces(requestParam)
      .then((response: I_Response_Type<I_Get_Workspace_Response_Data>) => {
        if (response.data?.workspaceList && response.data.workspaceList.length > 0) {
          // set Activated workspace list for sidebar menu
          globalState.menuWorkSpaceList = []
          setMenuWorkSpaceList(response.data.workspaceList)

          // set Activated workspace
          // const workspaceId = String(globalState.menuWorkSpaceList[0].id)
          // setWorkspaceId(workspaceId)
        }
      })
  }

  // ---------------- Workspace Name, PlanID, type ----------------

  const getWorkspaceInfo = computed(() => {
    if (process.client) {
      const localStorageWorkspaceInfo = JSON.parse(localStorage.getItem('_workspace') as string)

      if (
        localStorageWorkspaceInfo &&
        localStorageWorkspaceInfo?.name !== '' &&
        localStorageWorkspaceInfo?.planId !== 0 &&
        localStorageWorkspaceInfo?.type !== 0
      ) {
        globalState.workspace.name = localStorageWorkspaceInfo.name
        globalState.workspace.planId = localStorageWorkspaceInfo.planId
        globalState.workspace.type = localStorageWorkspaceInfo.type
      }
      // else {
      //   fetchWorkspaceById(getWorkspaceId.value || '')
      // }

      return globalState.workspace
    }
  })

  // 選択中のworkspace情報（名前とPlanId）をstateとlocalStrageに入れる
  const setWorkspaceInfo = (inpuData: I_WorkspaceInfo) => {
    if (process.client) {
      globalState.workspace.planId = inpuData.workspacePlanId
      globalState.workspace.name = inpuData.name
      globalState.workspace.type = inpuData.type
      localStorage.setItem('_workspace', JSON.stringify(globalState.workspace))
    }
  }

  // Get Workspace detail
  const fetchWorkspaceById = async (workspaceId: string) => {
    if (!workspaceId) return

    await app
      .$repository('workspaces')
      .getWorkspacesDetails(workspaceId)
      .then((response: I_Response_Type<I_WorkSpaceInfoSingle>) => {
        const { workspacePlanId, name, type } = response.data as I_WorkSpaceInfoSingle

        setWorkspaceInfo({ workspacePlanId, name, type })
      })
      .catch(() => {
        setWorkspaceInfo({ workspacePlanId: 0, name: '', type: 0 })
      })
  }

  // ---------------- Remove localStrage items ----------------
  const removeWorkspaceLocalstrage = () => {
    localStorage.removeItem('_workspace')
  }

  return {
    ...toRefs(globalState),
    fetchWorkspaceById,
    fetchWorkspaces,
    setMenuWorkSpaceList, // menu list in sidebar
    getWorkspaceId,
    getWorkspaceInfo,
    setWorkspaceId,
    setWorkspaceInfo,
    removeWorkspaceLocalstrage
  }
}

type WorkspaceStore = ReturnType<typeof useWorkspace>

export const WorkspaceKey: InjectionKey<WorkspaceStore> = Symbol('WorkspaceStore')

export const provideWorkspace = (): void => {
  provide(WorkspaceKey, useWorkspace())
}

export const injectWorkspace = () => {
  const state = inject(WorkspaceKey)

  if (!state) {
    throw new Error('Unable to install GlobalState')
  }

  return state
}
