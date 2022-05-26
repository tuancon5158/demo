<template>
  <div id="spaceListTemp-wrapperList" class="spaceListTemp">
    <SpaceGalleryType2 :list="spaceList" type="user" />

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
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  useFetch,
  useContext,
  useRoute,
  computed
} from '@nuxtjs/composition-api'
// components
import Pagination from '~/components/organisms/Pagination/Pagination.vue'
import SpaceGalleryType2 from '~/components/organisms/SpaceGalleryType2/SpaceGalleryType2.vue'
// composables
import { useScroll } from '~/composables'
// constants
import { publishedStatusId } from '~/constants/spaces'
import { I_SpaceListDTO, I_SpaceListRequest } from '~/types/schema/space'

const LIMIT = 24
const TOTAL = 0
const PAGE = 1

export default defineComponent({
  name: 'ProfileFavorite',

  components: {
    Pagination,
    SpaceGalleryType2
  },

  setup() {
    const { app } = useContext()
    const route = useRoute()

    //scoll on Top when mounted again
    const { scrollOnTop } = useScroll()
    scrollOnTop()

    // request initial data
    // keyにsort: created_at入れたら500エラー
    const spacesParams: I_SpaceListRequest = reactive({
      page: PAGE,
      direction: 'DESC',
      limit: LIMIT,
      publishedStatus: publishedStatusId.OPEN,
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
        .$repository('spaceFavorites')
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
            spacesParams.page = 0
          }
        })

      isLoading.value = false
    }

    const countArrayData = computed(() => {
      return spaceList.value.length > 0
    })

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

    return {
      spaceList,
      isLoading,
      isExistData,
      countArrayData,
      totalPages,
      fetchSpaceList,
      handlePagination
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
