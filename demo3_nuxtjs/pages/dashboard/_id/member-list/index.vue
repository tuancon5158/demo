<template>
  <div class="dashboard_license">
    <transition name="fade">
      <div v-if="isLoading" class="loading">
        <Spinner size="medium" color="secondary" bg-color="gray" />
      </div>
    </transition>
    <template v-if="!isLoading">
      <DashboardHeading
        icon-type="member-list"
        :title="$t('members.title')"
        :subtitle="$t('members.subtitle')"
        :is-button="!isMemberOrPersonalsapce"
        :info-button="infoButton"
        @onClick="handleClick"
      />
      <MemberTable
        :filter="filter"
        :arr-data="memberList"
        :is-data="isDataExist"
        :member-role-id="getMemberInfo.memberRole"
        @onSearch="handleSearch"
        @onFilter="handleFilter"
        @onRole="handleRole"
        @onDelete="handleDelete"
        @visibilityChanged="visibilityChanged"
      />
      <transition name="fade">
        <MemberInvitationModal
          v-if="showModal"
          @onClose="handleCloseModal"
          @onAdded="handleAddedMember"
        />
      </transition>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter,
  watch
} from '@nuxtjs/composition-api'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import MemberTable from '~/components/organisms/BaseTable/MemberTable.vue'
import MemberInvitationModal from '~/components/organisms/Modal/MemberInvitationModal.vue'
import { I_MembersList, I_Members_Request, I_Patch_Members_Request } from '~/types/schema/members'
import {
  getQuery,
  injectNotification,
  injectWorkspace,
  useMultipleQueryValue,
  injectMember,
  useErrorDisplay,
  useFetchUser
} from '~/composables'
import { debounce } from '~/composables/utilities/debounce'
// constants
import { memberRole } from '~/constants/userRole'
import { workspaceType } from '~/constants/workspace'

const LIMIT = 10
const TIMER_DEBOUNCE = 500

interface I_PaginationProps {
  limit?: number | string
  total?: number
  page?: number
}

interface I_Filter {
  sort: string
  direction: string
  sortAlias: string
  search: string
}

export default defineComponent({
  name: 'DashboardMemberList',

  components: {
    Spinner,
    DashboardHeading,
    MemberTable,
    MemberInvitationModal
  },

  layout: 'dashboard',

  setup() {
    const { $auth, app } = useContext()
    const router = useRouter()
    const memberList = ref<I_MembersList[]>([])
    const isDataExist = ref(false)
    const showModal = ref(false)
    const setNotiState = injectNotification()
    const { setError } = useErrorDisplay()

    const {
      getWorkspaceId,
      getWorkspaceInfo,
      menuWorkSpaceList,
      setWorkspaceId,
      fetchWorkspaceById,
      fetchWorkspaces
    } = injectWorkspace()

    const { getMemberInfo, fetchMemberMe } = injectMember()

    // redirect /dashboard/spaces if member role is 3
    const { fetchUserWorkspaceType, isLoading } = useFetchUser()

    fetchUserWorkspaceType()

    const infoButton = reactive({
      label: app.i18n.t('members.button')
    })

    const isMemberOrPersonalsapce = computed((): boolean => {
      return (
        getMemberInfo?.value?.memberRole === memberRole.MEMBER ||
        getWorkspaceInfo?.value?.type === workspaceType.PERSONAL
      )
    })

    const pagination = reactive<I_PaginationProps>({
      limit: LIMIT,
      total: 0,
      page: 1
    })

    const filter = reactive<I_Filter>({
      sort: '',
      direction: '',
      sortAlias: 'user',
      search: ''
    })

    onMounted(() => {
      loadFirstPage()
    })

    const visibilityChanged = (isVisible: boolean) => {
      if (isDataExist.value && memberList.value.length < (pagination.total || 0) && isVisible) {
        isDataExist.value = false
        getMembersList()
      }
    }

    // initialize data when page first load
    const loadFirstPage = () => {
      const { query } = getQuery()

      filter.search = query.value.search || ''
      filter.direction = query.value.direction || ''
      filter.sort = query.value.sort || ''

      getMembersList()
    }

    // get api member list
    const getMembersList = debounce(async () => {
      const params: I_Members_Request = {
        workspaceId: getWorkspaceId.value || '',
        name: filter.search || undefined,
        page: pagination.page,
        limit: pagination.limit || 10,
        sort: filter.sort || undefined,
        direction: filter.direction || undefined
      }

      if (params.sort === 'lastLoginDate') {
        params.sortAlias = filter.sortAlias || ''
      }

      await app
        .$repository('members')
        .getList(params)
        .then((response) => {
          const {
            data: {
              workspaceUserList,
              pagination: { totalRecords }
            }
          } = response

          memberList.value = memberList.value.concat(workspaceUserList)
          pagination.total = totalRecords
          pagination.page = (pagination.page || 1) + 1
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
        .finally(() => {
          isDataExist.value = true
        })
    }, TIMER_DEBOUNCE)

    /**
     * handle data of search
     * @value: <String> | value search
     */
    const handleSearch = (value: string) => {
      filter.search = value
    }

    /**
     * handle data of search
     * @value: <String> | value search
     */
    const handleRole = debounce(async (arrRole: I_Patch_Members_Request[]) => {
      await app
        .$repository('members')
        .patchMember(arrRole)
        .then((response) => {
          if (response && response.data.length > 0) {
            resetData()
            getMembersList()

            if (getWorkspaceId.value) {
              fetchMemberMe(getWorkspaceId.value || '')
            }

            setNotiState.setNotification(app.i18n.t('form.successMessage.updated'), 'success')
          }
        })
        .catch((error) => {
          const errorResource = error.response?.data?.response.args.errorUser[0].message.key

          setError('', errorResource)
        })
    }, TIMER_DEBOUNCE)

    /**
     * handle filter about sort, direction
     * @obj: <I_Filter> | object filter
     */
    const handleFilter = debounce((obj: I_Filter) => {
      const { sort, direction } = obj

      filter.sort = direction ? sort : ''
      filter.direction = direction
      resetData()
      getMembersList()
    }, TIMER_DEBOUNCE)

    /**
     * handle submit delete when user click button
     * @id: <I_Filter> | id
     */
    const handleDelete = debounce(async (id: number) => {
      await app
        .$repository('members')
        .deleteMember(id)
        .then(async () => {
          await handleMemberRole()
          resetData()
          getMembersList()
          setNotiState.setNotification(app.i18n.t('form.successMessage.updated'), 'success')
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }, TIMER_DEBOUNCE)

    // get member role load data
    const handleMemberRole = async () => {
      const result = await fetchMemberMe(getWorkspaceId.value || '')

      if (result.response) {
        const { key, args } = result?.response?.data?.response || {
          key: '',
          args: {
            resource: ''
          }
        }

        if (key === 'common.notFound' && args?.resource === 'workspaceUsers') {
          await fetchWorkspaces(Number($auth.user.id))

          if (menuWorkSpaceList.value[0]) {
            const { id } = menuWorkSpaceList.value[0]

            setWorkspaceId(id || '')

            router.push(app.localePath({ name: 'dashboard-id-spaces', params: { id: id || '' } }))

            await fetchWorkspaceById(id || '')
          }
        }
      }
    }

    // follow filter
    watch(
      () => filter.search,
      () => {
        resetData()
        getMembersList()
      }
    )

    const route = useRoute()

    // follow route
    watch(
      () => route.value.query,
      (value) => {
        if (Object.keys(value).length === 0) {
          filter.sort = ''
          filter.direction = ''
          filter.search = ''
          resetData()
          getMembersList()
        }
      }
    )

    // reset data to default
    const resetData = () => {
      isDataExist.value = false
      pagination.page = 1
      memberList.value = []
    }

    // handle show or hide modal when click
    const handleClick = () => {
      showModal.value = !showModal.value
    }

    // handle close modal
    const handleCloseModal = () => {
      showModal.value = false
    }

    // handle add member
    const handleAddedMember = () => {
      resetData()
      getMembersList()
    }

    return {
      isLoading,
      memberList,
      handleSearch,
      filter,
      handleFilter,
      ...useMultipleQueryValue(filter),
      getMemberInfo,
      isMemberOrPersonalsapce,
      showModal,
      isDataExist,
      handleRole,
      handleDelete,
      infoButton,
      handleClick,
      handleCloseModal,
      handleAddedMember,
      visibilityChanged
    }
  }
})
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
