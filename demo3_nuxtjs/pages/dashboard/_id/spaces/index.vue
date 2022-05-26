<template>
  <div class="dashboard_spaceList">
    <DashboardHeading
      icon-type="space"
      :title="$t('spaceListDashboard.title')"
      :subtitle="$t('spaceListDashboard.subtitle')"
      :is-button="Object.keys(infoButton).length ? true : false"
      size="size"
      :info-button="infoButton"
    />
    <div v-if="isSearch" class="dashboard_spaceList_wrapperSearch">
      <SearchBox
        class="dashboard_spaceList_search"
        :model-value="inputSearch"
        :placeholder="$t('spaceListDashboard.placeholder')"
        @update:modelValue="onInputSearch"
      />
    </div>
    <div v-if="isPersonalAndMember">
      <div class="dashboard_spaceList_wrapper">
        <div class="dashboard_spaceList_appluUpload">
          <div class="dashboard_spaceList_appluUpload_text">
            {{ $t('spaceListDashboard.promptApplyUpload.text1') }}
            <br />
            {{ $t('spaceListDashboard.promptApplyUpload.text2') }}
          </div>
          <Button
            bg-color="transparent"
            border-color="blue"
            size="medium"
            :label="$t('spaceListDashboard.appluUploadButton')"
            :link="localePath(`/dashboard/${getWorkspaceId}/spaces/apply-upload`)"
          />
        </div>
      </div>
    </div>
    <template v-else>
      <div class="dashboard_spaceList_list">
        <SpaceCardOfWorkspace
          v-for="(workspace, index) in workspaces"
          :key="workspace.id"
          :index="index"
          :current-workspace-id="getWorkspaceId"
          :data-source="{
            id: workspace.id,
            role: workspace.publishedStatus,
            thumbnailUrl: getResizeImage(workspace.thumbnailUrl),
            title: workspace.title,
            uploadAt: workspace.publishedDate,
            workspaceSpaceId: workspace.workspaceSpaceId
          }"
          @onDelete="handleDelete"
        />

        <div
          v-for="item in contentLoaderList"
          :key="item"
          class="placeholderSpaceList dashboard_spaceList_list"
        >
          <content-placeholders class="placeholderSpace_wrapperDashboard" :rounded="true">
            <content-placeholders-img />
            <content-placeholders-text :lines="1" />
          </content-placeholders>
        </div>
      </div>
      <div v-if="isExistData && workspaces.length === 0">
        <NotFound
          :title="
            isSearch
              ? $t('spaceListDashboard.titleSearchNotFound')
              : $t('spaceListDashboard.titleNotFound')
          "
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  onMounted,
  computed,
  reactive,
  watch,
  useRoute
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import SpaceCardOfWorkspace from '~/components/organisms/SpaceCard/SpaceCardOfWorkspace.vue'
import SearchBox from '~/components/atoms/Form/SearchBox/SearchBox.vue'
import NotFound from '~/components/molecules/NotFound/NotFound.vue'
// constants
import { memberRole } from '~/constants/userRole'
import { workspaceType } from '~/constants/workspace'
import { imageSizes } from '~/constants/image-size'

import { useErrorDisplay, injectWorkspace, injectMember, useQueryValue } from '~/composables'
import { debounce } from '~/composables/utilities/debounce'

const LIMIT = 24
const TOTAL = 0
const PAGE = 1
const TIMER_DEBOUNCE = 500
const DIRECTION = 'DESC'
const SORT = 'createdAt'

interface I_PaginationProps {
  limit?: number
  total?: number
  totalPages?: number
  page?: number
  direction?: string
  sort?: string
}

interface I_Request {
  workspaceId: string
  page?: number
  limit?: number | string
  title?: string
  direction?: string
  sort?: string
}

export default defineComponent({
  name: 'DashboardSpaceList',

  components: {
    Button,
    DashboardHeading,
    SpaceCardOfWorkspace,
    SearchBox,
    NotFound
  },

  layout: 'dashboard',

  setup() {
    const { app } = useContext()
    const { getWorkspaceId, getWorkspaceInfo } = injectWorkspace()
    const { getMemberInfo } = injectMember()
    const { setError } = useErrorDisplay()
    const contentLoaderList = ref<number[]>([])

    const workspaces = ref([])
    const isExistData = ref(false)
    const loading = ref(true)
    const isSearch = ref(false)
    const pagination = reactive<I_PaginationProps>({
      limit: LIMIT,
      total: TOTAL,
      totalPages: TOTAL,
      page: PAGE,
      direction: DIRECTION,
      sort: SORT
    })

    const isPersonalAndMember = computed(() => {
      return (
        getWorkspaceInfo.value?.type === workspaceType.PERSONAL &&
        getMemberInfo.value?.memberRole === memberRole.MEMBER
      )
    })

    const infoButton = computed(() => {
      // member role = 3 && personal workspace
      if (
        getWorkspaceInfo.value?.type === workspaceType.PERSONAL &&
        getMemberInfo.value?.memberRole === memberRole.MEMBER
      ) {
        return {
          label: app.i18n.t('spaceListDashboard.button'),
          link: app.localePath(`/dashboard/${getWorkspaceId.value}/spaces/new`),
          disabled: true
        }
      }

      if (
        getWorkspaceInfo.value?.type !== workspaceType.PERSONAL &&
        getMemberInfo.value?.memberRole === memberRole.MEMBER
      ) {
        return {}
      }

      return {
        label: app.i18n.t('spaceListDashboard.button'),
        link: app.localePath(`/dashboard/${getWorkspaceId.value}/spaces/new`),
        disabled: false
      }
    })

    const inputSearch = ref('')

    onMounted(() => {
      loadFirstPage()

      const listElm = document.querySelector('#dashboard-main')

      listElm?.addEventListener('scroll', (event) => {
        if (event.target !== event.currentTarget) return

        if (listElm.scrollTop + listElm.clientHeight + 1500 >= listElm.scrollHeight) {
          if (!loading.value && (pagination.totalPages || TOTAL) >= (pagination.page || TOTAL)) {
            contentLoaderList.value = Array.from(Array(LIMIT).keys())

            loadData()
          }
        }
      })
    })

    const loadData = () => {
      const filter: I_Request = {
        workspaceId: getWorkspaceId.value || '',
        page: pagination.page,
        limit: pagination.limit,
        title: inputSearch.value || undefined,
        direction: pagination.direction,
        sort: pagination.sort || undefined
      }

      getBelongSpaces(filter)
    }

    const loadFirstPage = () => {
      // initialize inputSearch value
      inputSearch.value = ''
      loadData()
    }

    const getBelongSpaces = debounce(async (filter: I_Request) => {
      loading.value = true

      await app
        .$repository('belongSpaces')
        .getBelongSpaces(filter)
        .then((response) => {
          const {
            data: {
              spaceList,
              pagination: { totalRecords, page, totalPages }
            }
          } = response

          if (spaceList.length > 0) isSearch.value = true

          workspaces.value = workspaces.value.concat(spaceList)
          pagination.total = totalRecords
          pagination.page = page + 1
          pagination.totalPages = totalPages
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key
          const errorResource = error.response?.data?.response.args.resource

          setError(errorKeyCode, errorResource)
        })
        .finally(() => {
          isExistData.value = true
          loading.value = false
          contentLoaderList.value = []
        })
    }, TIMER_DEBOUNCE)

    const onInputSearch = (value: string) => {
      inputSearch.value = value
    }

    watch(
      () => inputSearch.value,
      () => {
        isExistData.value = false
        pagination.page = PAGE
        workspaces.value = []
        loadData()
      }
    )

    const handleDelete = (index: number) => {
      workspaces.value.splice(index, 1)
    }

    const route = useRoute()

    watch(
      () => route.value.query,
      (value) => {
        if (Object.keys(value).length === 0) {
          isExistData.value = false
          pagination.page = PAGE
          workspaces.value = []
          inputSearch.value = ''
          loadData()
        }
      }
    )

    // CDN will return 600px resized image
    const getResizeImage = (imagePath): string => {
      if (imageSizes.spaceGalleryDashboard.medium) {
        return `${imagePath}?w=${imageSizes.spaceGalleryDashboard.medium}`
      } else {
        return imagePath
      }
    }

    return {
      isPersonalAndMember,
      workspaces,
      onInputSearch,
      inputSearch,
      pagination,
      isExistData,
      isSearch,
      loading,
      getWorkspaceId,
      handleDelete,
      infoButton,
      contentLoaderList,
      ...useQueryValue(inputSearch, 'search', TIMER_DEBOUNCE),
      getResizeImage
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard_spaceList {
  height: 100%;

  &_appluUpload {
    text-align: center;

    @include pc() {
      width: 100%;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @include mb() {
      width: 100%;
      padding: $spacing_4x;
    }

    &_text {
      color: $color_gray_600;
      margin-bottom: $spacing_8x;
    }
  }

  &_list {
    display: grid;
    grid-gap: 3.2rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    position: relative;
    padding-bottom: $spacing_6x;

    @include mb() {
      grid-gap: 1.6rem;
    }
  }

  &_wrapper {
    position: relative;
    width: 100%;
    height: calc(100vh - 230px - 3.2rem);

    @include mb() {
      position: inherit;
      height: 100%;
    }
  }

  &_wrapperSearch {
    display: flex;
    justify-content: flex-end;
    margin-bottom: $spacing_6x;
    @include mb() {
      margin-bottom: $spacing_4x;
    }
  }

  &_search {
    @include mb() {
      width: 100%;
    }
  }
}

.loading {
  text-align: center;
  position: absolute;
  padding: $spacing_1x;
  border-radius: 5px;
  left: 50%;
  top: calc(50% + 32px);
  z-index: 9000;
  transform: translate(-50%, -50%);

  @include max-screen(map-get($breakpoints, lg)) {
    left: calc(50% + 50px);
    top: calc(50% + 22px);
  }

  @include mb() {
    left: 50%;
    top: 50%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
