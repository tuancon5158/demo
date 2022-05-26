<template>
  <DefaultLayout style="color: white" :title="workspaceDetail.name" bg-color="blackGradient">
    <div id="spaceListTemp-wrapperList">
      <ProfileLayout
        :id="workspaceDetail.id"
        :name="workspaceDetail.name"
        :thumbnail-url="workspaceDetail.thumbnailUrl"
        :description="workspaceDetail.description"
      >
        <div v-if="isLoading" class="spaceListTemp_spinner">
          <Spinner size="medium" color="white" bg-color="transparent" />
        </div>

        <SpaceGalleryType2 v-else :list="spaceList" />

        <div v-if="!isExistData && spaceList.length === 0" class="spaceListTemp_noData">
          {{ $t('noData') }}
        </div>

        <Pagination
          v-if="countArrayData"
          class="spaceListTemp_pagination"
          :total-items="totalPages"
          behavior-scroll="auto"
          is-scroll-on-top
          scroll-to="#spaceListTemp-wrapperList"
          @onSelectedItem="handlePagination"
        />
      </ProfileLayout>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  useFetch,
  useContext,
  useRoute,
  computed,
  useMeta
} from '@nuxtjs/composition-api'
// components
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import Pagination from '~/components/organisms/Pagination/Pagination.vue'
import SpaceGalleryType2 from '~/components/organisms/SpaceGalleryType2/SpaceGalleryType2.vue'
// composables
import { truncateFilter } from '~/composables/utilities/filters/truncate'
// types
import { I_SpaceListDTO, I_SpaceListRequest } from '~/types/schema/space'
// constants
import { publishedStatusId } from '~/constants/spaces'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import ProfileLayout from '~/components/organisms/Layout/ProfileLayout.vue'
import { useScroll, useErrorDisplay } from '~/composables'

const LIMIT = 24
const TOTAL = 0
const PAGE = 1

export default defineComponent({
  name: 'ProfileWorkspace',

  components: {
    Spinner,
    DefaultLayout,
    ProfileLayout,
    SpaceGalleryType2,
    Pagination
  },

  setup() {
    const { app, redirect } = useContext()
    const { title, meta } = useMeta()
    const route = useRoute()
    const truncateText = truncateFilter()
    const { setError } = useErrorDisplay()

    //scoll on Top when mounted again
    const { scrollOnTop } = useScroll()
    scrollOnTop()

    // request initial data
    const totalPages = ref(TOTAL)
    const isLoading = ref<boolean>(true)
    const isExistData = ref<boolean>(true)
    const spaceList = ref<I_SpaceListDTO[]>([])

    const spacesParams: I_SpaceListRequest = reactive({
      page: PAGE,
      sort: 'createdAt',
      publishedStatus: publishedStatusId.OPEN,
      direction: 'DESC',
      limit: LIMIT,
      workspaceId: route.value.params?.id || ''
    })

    const fetchSpaceListBelogWorkspace = async () => {
      // set loading
      isLoading.value = true
      isExistData.value = true

      // call [GET] space list api
      await app
        .$repository('spaces')
        .getList(spacesParams)
        .then((response) => {
          // add space list to spaceList array
          if (response.data.list.length !== 0) {
            totalPages.value = response.data.pagination.totalPages
            spaceList.value = response.data.list

            if (response.data.list.length < LIMIT) {
              isExistData.value = false
            }
          } else {
            isExistData.value = false
          }
        })
        .catch(() => {})

      isLoading.value = false
    }

    const countArrayData = computed(() => {
      return spaceList.value.length > 0
    })

    const visibilityChanged = () => {
      // add page number
      if (spacesParams.page) {
        spacesParams.page += 1
      }

      fetchSpaceListBelogWorkspace()
    }

    /**
     * handle pagination when first load and click
     * @currentPage: <String> | current page
     * @limit: <String> | limit page
     * @isScroll: <Boolean> | check scroll top list item
     */
    const handlePagination = (currentPage = PAGE, limit = LIMIT) => {
      spacesParams.page = currentPage
      spacesParams.limit = limit

      fetchSpaceListBelogWorkspace()
    }

    // fetch workspace details
    const workspaceDetail = reactive({
      id: '',
      name: '',
      thumbnailUrl: '',
      companyName: '',
      companyUrl: '',
      description: ''
    })

    const selectedWorkspaceId = computed(() => route.value.params.id || '')

    const fetchWorkspaceDetail = async () => {
      const workspaceId: string = selectedWorkspaceId.value

      if (workspaceId) {
        await app
          .$repository('workspaces')
          .getWorkspacesDetailsPublic(workspaceId)
          .then((response) => {
            workspaceDetail.id = response.data.id
            workspaceDetail.name = response.data.name
            workspaceDetail.thumbnailUrl = response.data.thumbnailUrl
            workspaceDetail.companyName = response.data.companyName
            workspaceDetail.companyUrl = response.data.companyUrl
            workspaceDetail.description = response.data.description
          })
          .catch((error) => {
            const errorKeyCode = error.response?.data?.response.key

            setError(errorKeyCode, '')
          })
      }

      fetchMeta()
    }

    useFetch(fetchSpaceListBelogWorkspace)
    useFetch(fetchWorkspaceDetail)

    // set meta image
    const fetchMeta = () => {
      // meta descrpition settings
      const metaDescription = workspaceDetail.description
        ? truncateText(
            workspaceDetail.description.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
            '200',
            '..'
          )
        : app.i18n.t('meta.description')

      title.value = `${workspaceDetail.name} | comony`
      meta.value = [
        {
          hid: 'description',
          name: 'description',
          content: metaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${workspaceDetail.name} | comony`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: metaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${app.$config.frontURL}${route.value.fullPath}`
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${workspaceDetail.name} | comony`
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: metaDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${app.$config.frontURL}/${workspaceDetail.thumbnailUrl}`
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: `${app.$config.frontURL}/${workspaceDetail.thumbnailUrl}`
        }
      ]
    }

    return {
      workspaceDetail,
      spaceList,
      isLoading,
      isExistData,
      fetchSpaceListBelogWorkspace,
      visibilityChanged,
      handlePagination,
      totalPages,
      countArrayData
    }
  },

  head: {}
})
</script>

<style scoped lang="scss">
.spaceListTemp {
  &_list {
    display: grid;
    grid-gap: 2rem;
    padding: 0 2%;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    overflow: hidden;
  }

  &_noData {
    display: block;
    text-align: center;
    margin: $spacing_20x auto $spacing_30x;
    color: $color_white;
  }

  &_spinner {
    margin: $spacing_20x 0;
    position: absolute;
    left: 50%;
    z-index: $zIndex_spaceList_loading;
    transform: translateX(-50%);
  }

  &_pagination {
    padding: $spacing_20x 0 $spacing_40x;
    @include mb() {
      padding: $spacing_12x 0 $spacing_14x;
    }
  }
}
</style>
