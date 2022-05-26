<template>
  <DefaultLayout bg-color="blackGradient" class="spaceList">
    <HeroImageSection
      class="spaceList_heroImage"
      :navigation-list="categories"
      image="gallery/banner.webp"
      :heading="$t('spaces.pageTitle')"
      @onClick="handleClickCategoryMenu"
      tag="h1"
    />
    <div class="spaceList_contents">
      <div :class="!isLoadingData ? 'spaceList_show' : ''" class="spaceList_contentList">
        <div class="spaceList_wrapper">
          <span id="spaceList-wrapperList" />

          <SpaceGallery
            :is-loading="isLoadingData"
            :space-content-list="spaceContentList"
            :array-data="spaceList"
            @onSignUp="handleSignUp"
          />

          <div v-if="!isExistData && spaceList.length === 0" class="spaceList_noData">
            {{ $t('noData') }}
          </div>

          <Pagination
            v-if="totalPages"
            class="spaceList_pagination"
            behavior-scroll="auto"
            :total-items="totalPages"
            is-scroll-on-top
            scroll-to="#spaceList-wrapperList"
            @onSelectedItem="handlePagination"
          />
        </div>

        <!-- INQUIRY FORM -->
        <InquiryForm />
      </div>
      <div :class="isLoadingData ? 'spaceList_show' : ''" class="spaceList_loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          style="
            margin: auto;
            display: block;
            shape-rendering: auto;
            top: 150px;
            position: relative;
          "
          width="40px"
          height="40px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#ffffff"
            stroke-width="6"
            r="35"
            stroke-dasharray="164.93361431346415 56.97787143782138"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    </div>
    <transition name="fade">
      <SignUpModal v-if="visibleModal" @onClose="closeModal" />
    </transition>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  useRouter,
  useRoute,
  useMeta,
  computed,
  onMounted,
  useAsync,
  onBeforeMount
} from '@nuxtjs/composition-api'
// components
import Pagination from '~/components/organisms/Pagination/Pagination.vue'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import HeroImageSection from '~/components/organisms/HeroImageSection/HeroImageSection.vue'
import SpaceGallery from '~/components/organisms/SpaceGallery/SpaceGallery.vue'
import InquiryForm from '~/components/organisms/InquiryForm/InquiryForm.vue'
import SignUpModal from '~/components/organisms/Modal/SignUpModal.vue'
// types
import { I_SpaceListDTO, I_SpaceListRequest } from '~/types/schema/space'
// constants
import { publishedStatusId } from '~/constants/spaces'
// composables
import useSocialLogin from '~/composables/useSocialLogin'
import { useOpenCloseToggle } from '~/composables'

const LIMIT = 24
const TOTAL = 0
const PAGE = 1

type CategoryType = {
  id: number
  name: string
  nameEn: string
}
export default defineComponent({
  name: 'Spaces',

  components: {
    Pagination,
    DefaultLayout,
    HeroImageSection,
    SpaceGallery,
    InquiryForm,
    SignUpModal
  },

  setup() {
    const { app, $auth } = useContext()
    const contentLoaderList = ref<number[]>([])
    const totalPages = ref(TOTAL)
    const isLoadingData = ref(true)

    // set meta
    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('meta.spaceList.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.spaceList.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.spaceList.title')} | comony`
      }
    ]
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref<boolean>(true)
    const isExistData = ref<boolean>(true)
    const categories = ref<CategoryType[]>([])
    const spaceList = ref<I_SpaceListDTO[]>([])
    const categoryId = computed(() => Number(route.value.query?.category_id) || 0)

    const { open: openModal, close: closeModal, visible: visibleModal } = useOpenCloseToggle()

    // eslint-disable-next-line require-await
    useAsync(() => {
      const categoryAll = {
        id: 0,
        name: '全て',
        nameEn: 'All'
      } as CategoryType

      categories.value.push(categoryAll)

      // get category lsit
      app
        .$repository('categories')
        .get()
        .then((response) => {
          // eslint-disable-next-line array-callback-return
          response.data.list.map((item) => {
            const category = {
              id: item.id,
              name: item.name,
              nameEn: item.nameEn
            } as CategoryType

            categories.value.push(category)
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })

    // request initial data
    const spacesParams: I_SpaceListRequest = reactive({
      page: PAGE,
      sort: 'isRecommended',
      publishedStatus: publishedStatusId.OPEN,
      direction: 'DESC',
      limit: LIMIT
    })

    const createSpaceList = async (categoryId: number) => {
      // set loading
      isLoadingData.value = true
      isLoading.value = true
      isExistData.value = true

      // put category_id to request data
      if (categoryId !== 0) spacesParams.categoryId = Number(categoryId)
      else delete spacesParams.categoryId

      // call [GET] space list api
      await app
        .$repository('spaces')
        .getList(spacesParams)
        .then((response) => {
          // add space list to spaceList array
          if (response.data.list.length !== 0) {
            spaceList.value = response.data.list

            totalPages.value = response.data.pagination.totalPages

            if (response.data.list.length < LIMIT) isExistData.value = false
          } else {
            isExistData.value = false
          }
        })
        .catch(() => {})
        .finally(() => {
          contentLoaderList.value = []
          isLoadingData.value = false
        })
      isLoading.value = false
    }

    onBeforeMount(() => {
      setTimeout(
        () =>
          window.scrollTo({
            top: 0
          }),
        0
      )
    })

    onMounted(() => {
      createSpaceList(categoryId.value)
    })

    // social login
    const { fetchSNSLoginUser, isLoadingFetchSocialLogin } = useSocialLogin()

    fetchSNSLoginUser()

    const handleClickCategoryMenu = (id: number) => {
      spaceList.value = []
      spacesParams.page = 1
      totalPages.value = TOTAL

      if (id !== 0) {
        // spacesParams.categoryId = categoryId
        router.push({ query: { category_id: String(id) } })
      } else {
        spacesParams.categoryId = id
        delete spacesParams.categoryId
        router.push(app.localePath('spaces'))
      }

      createSpaceList(id)
    }

    /**
     * handle pagination when first load and click
     * @currentPage: <String> | current page
     * @limit: <String> | limit page
     * @isScroll: <Boolean> | check scroll top list item
     */
    const handlePagination = (currentPage = PAGE, limit = LIMIT) => {
      spaceList.value = []
      spacesParams.page = currentPage
      spacesParams.limit = limit
      createSpaceList(categoryId.value)
    }

    const spaceContentList = computed(() => {
      return [...Array(LIMIT).keys()]
    })

    // open modal when user click space item
    const handleSignUp = () => {
      openModal()
    }

    return {
      categories,
      isLoading,
      isExistData,
      spaceList,
      contentLoaderList,
      handleClickCategoryMenu,
      createSpaceList,
      isLoadingFetchSocialLogin,
      handlePagination,
      totalPages,
      isLoadingData,
      spaceContentList,
      handleSignUp,
      visibleModal,
      closeModal
    }
  },
  head: {}
})
</script>

<style lang="scss" scoped>
.spaceList {
  &_heroImage {
    @include header-pc() {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      overflow: hidden;
    }
  }

  &_contents {
    position: relative;
    z-index: 1;
  }

  &_contentList {
    opacity: 0;
    background: $color_black_gradient;
    transition: 0.5s all;
    position: relative;
  }

  &_show {
    opacity: 1 !important;
    z-index: 9999;
  }

  &_wrapper {
    position: relative;
    z-index: 1;
  }

  &_loading {
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.5s all;
    width: 100%;
    height: 100%;
    background: $color_black_gradient;
    opacity: 0;
  }

  &_noData {
    display: block;
    text-align: center;
    // margin: $spacing_20x auto $spacing_30x;
    color: $color_white;
  }

  &_pagination {
    padding: $spacing_20x 0 $spacing_40x;
    @include mb() {
      padding: $spacing_12x 0 $spacing_14x;
    }
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
