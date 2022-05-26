<template>
  <div id="spaceListTemp-wrapperList">
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
      behavior-scroll="auto"
      :total-items="totalPages"
      is-scroll-on-top
      scroll-to="#spaceListTemp-wrapperList"
      @onSelectedItem="handlePagination"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  useContext,
  useRoute,
  useFetch,
  computed
} from '@nuxtjs/composition-api'
// components
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import Pagination from '~/components/organisms/Pagination/Pagination.vue'
import SpaceGalleryType2 from '~/components/organisms/SpaceGalleryType2/SpaceGalleryType2.vue'
// types
import { I_SpaceListDTO, I_SpaceListRequest } from '~/types/schema/space'
// constants
import { publishedStatusId } from '~/constants/spaces'
import { useScroll } from '~/composables'

const LIMIT = 24
const TOTAL = 0
const PAGE = 1

export default defineComponent({
  name: 'Profile',

  components: {
    Spinner,
    SpaceGalleryType2,
    Pagination
  },

  setup() {
    const { app } = useContext()
    const route = useRoute()

    //scoll on Top when mounted again
    const { scrollOnTop } = useScroll()
    scrollOnTop()

    // request initial data
    const spacesParams: I_SpaceListRequest = reactive({
      page: PAGE,
      sort: 'createdAt',
      publishedStatus: publishedStatusId.OPEN,
      direction: 'DESC',
      limit: LIMIT,
      userId: Number(route.value.params?.id) || 0
    })

    const totalPages = ref(TOTAL)
    const isLoading = ref<boolean>(true)
    const isExistData = ref<boolean>(true)
    const spaceList = ref<I_SpaceListDTO[]>([])

    const fetchSpaceList = async () => {
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

            if (response.data.list.length < LIMIT) isExistData.value = false
          } else {
            isExistData.value = false
          }
        })
        .catch(() => {})
      isLoading.value = false
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

      fetchSpaceList()
    }

    useFetch(fetchSpaceList)

    const countArrayData = computed(() => {
      return spaceList.value.length > 0
    })

    return {
      spaceList,
      isLoading,
      isExistData,
      fetchSpaceList,
      handlePagination,
      totalPages,
      countArrayData
    }
  }
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
