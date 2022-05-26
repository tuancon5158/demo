<template>
  <div class="dashboard_license">
    <template>
      <DashboardHeading
        icon-type="email-notification"
        :title="$t('newGuestNotifications.title')"
        :subtitle="$t('newGuestNotifications.subtitle')"
        is-beta-version
      />
      <EmailNotifyTable
        :filter="filter"
        :arr-data="memberList"
        :is-data="isDataExist"
        @onSearch="handleSearch"
        @onFilter="handleFilter"
        @visibilityChanged="visibilityChanged"
        @onSelectUser="selectUser"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  watch,
  useRoute
} from '@nuxtjs/composition-api'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import EmailNotifyTable from '~/components/organisms/BaseTable/EmailNotifyTable.vue'
import {
  I_MembersList,
  I_Members_Request,
  I_Patch_Members_Notification_Request
} from '~/types/schema/members'
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
  name: 'DashboardEnterSpaceNotifications',

  components: {
    Spinner,
    DashboardHeading,
    EmailNotifyTable
  },

  layout: 'dashboard',

  setup() {
    const { app } = useContext()
    const memberList = ref<I_MembersList[]>([])
    const isDataExist = ref(false)
    const setNotiState = injectNotification()
    const { setError } = useErrorDisplay()

    const { getWorkspaceId } = injectWorkspace()

    const { getMemberInfo, fetchMemberMe } = injectMember()

    // const isLoading = ref(false)

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

    onMounted(() => {
      loadFirstPage()
    })

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
        .getListNotice(params)
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

    // follow filter
    watch(
      () => filter.search,
      () => {
        resetData()
        getMembersList()
      }
    )

    // reset data to default
    const resetData = () => {
      isDataExist.value = false
      pagination.page = 1
      memberList.value = []
    }

    // set notification email
    const selectUser = async (data: I_Patch_Members_Notification_Request) => {
      await app
        .$repository('members')
        .patchMemberNotification(data)
        .then(() => {
          setNotiState.setNotification(app.i18n.t('form.successMessage.updated'), 'success')
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key
          setError(errorKeyCode, '')
        })
    }

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

    return {
      memberList,
      handleSearch,
      filter,
      handleFilter,
      ...useMultipleQueryValue(filter),
      getMemberInfo,
      isDataExist,
      visibilityChanged,
      selectUser
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
