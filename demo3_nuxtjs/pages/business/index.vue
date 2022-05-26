<template>
  <DefaultLayout>
    <HeroImageSection image="business/banner.webp" heading="ビジネスでご利用したい方へ" />
    <div class="business">
      <div class="business_header">
        <h2 class="business_title">企業様タイアップのご紹介</h2>
        <p class="business_description">
          テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテ
        </p>
      </div>
      <div class="business_wrapperList">
        <div
          v-for="(item, index) in arrayData"
          :key="index"
          v-observe-visibility="{
            callback: slideTwoItem
          }"
        >
          <ImageCard
            v-bind="{ ...item }"
            class="slide-in-item"
            :class="index % 2 === 0 ? 'slide-in-item-odd' : 'slide-in-item-even'"
          ></ImageCard>
        </div>
      </div>
      <Pagination
        isScrollOnTop
        scrollTo=".business_wrapperList"
        v-if="countArrayData"
        class="business_pagination"
        :total-items="count"
        @onSelectedItem="handlePagination"
      />
    </div>

    <!-- INQUIRY FORM -->
    <InquiryForm class="inquiryFormHome" />
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  useMeta,
  useContext,
  computed,
  ref,
  onMounted
} from '@nuxtjs/composition-api'
import InquiryForm from '~/components/organisms/InquiryForm/InquiryForm.vue'
import HeroImageSection from '~/components/organisms/HeroImageSection/HeroImageSection.vue'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import ImageCard from '~/components/organisms/ImageCard/ImageCard.vue'
import Pagination from '~/components/organisms/Pagination/Pagination.vue'
import { handleScroll } from '~/composables/utilities/scroll'

interface I_BusinessList {
  path: string
  alt: string
  title: string
  name: string
  thumbnail: string
  content: string
}

const OFFSET = 1
const LIMIT = 8

export default defineComponent({
  name: 'Business',
  components: {
    InquiryForm,
    HeroImageSection,
    DefaultLayout,
    ImageCard,
    Pagination
  },

  setup() {
    const { app } = useContext()

    // Meta
    const { title, meta } = useMeta()
    const arrayData = ref<I_BusinessList[]>([])

    const listData: I_BusinessList[] = [
      {
        path: 'business/image-card-7.png',
        alt: 'VR花火',
        title: 'VR花火',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-6.png',
        alt: 'SPLASH　パーティー',
        title: 'SPLASH　パーティー',
        name: '足の裏',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-1.png',
        alt: 'MrマリックのVRマジック',
        title: 'MrマリックのVRマジック',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-2.png',
        alt: 'VRファイトクラブ',
        title: 'VRファイトクラブ',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-3.png',
        alt: 'ボクシングVR体験会',
        title: 'ボクシングVR体験会',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-4.png',
        alt: 'VRセッション１２３',
        title: 'VRセッション１２３',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-5.png',
        alt: 'ダンス甲子園２０２３',
        title: 'ダンス甲子園２０２３',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-6.png',
        alt: 'ファイトクラブ決勝',
        title: 'ファイトクラブ決勝',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-4.png',
        alt: 'VRセッション１２３',
        title: 'VRセッション１２３',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-5.png',
        alt: 'ダンス甲子園２０２３',
        title: 'ダンス甲子園２０２３',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      },
      {
        path: 'business/image-card-6.png',
        alt: 'ファイトクラブ決勝',
        title: 'ファイトクラブ決勝',
        name: '山田幸太郎',
        thumbnail: 'business/thumbnail.png',
        content:
          'テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキスト'
      }
    ]

    onMounted(() => {
      window.scrollTo({ top: 0 })
      handlePagination(OFFSET, LIMIT)
    })

    /**
     * handle pagination when first load and click
     * @currentPage: <String> | current page
     * @limit: <String> | limit page
     * @isScroll: <Boolean> | check scroll top list item
     */
    const handlePagination = (currentPage = OFFSET, limit = LIMIT) => {
      const offset = (currentPage - 1) * limit || 0

      arrayData.value = listData.slice(offset, limit * currentPage)
    }

    const countArrayData = computed(() => {
      return arrayData.value.length > 0
    })

    const count = computed(() => {
      return Math.ceil(listData.length / LIMIT)
    })

    title.value = `${app.i18n.t('meta.business.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.business.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.business.title')} | comony`
      }
    ]

    const { slideTwoItem } = handleScroll()

    return {
      countArrayData,
      arrayData,
      count,
      handlePagination,
      slideTwoItem
    }
  },

  head: {}
})
</script>
<style lang="scss" scoped>
.business {
  background: $color_black_gradient;

  &_header {
    color: $color_white;
    max-width: $default_contents_W;
    margin: auto;
    padding: $spacing_14x $spacing_6x $spacing_35x;

    @include mb() {
      padding: $spacing_6x $spacing_4x $spacing_6x;
    }
  }

  &_title {
    font-weight: $font_weight_black;
    @include fz($font_size_xlarge);
    margin-bottom: $spacing_10x;

    @include mb() {
      font-weight: $font_weight_bold;
      @include fz($font_size_xlarge_mb);
      margin-bottom: $spacing_8x;
    }
  }

  &_description {
    font-weight: $font_weight_normal;
    @include fz($font_size_standard);
    letter-spacing: normal;
    margin: 0;

    @include mb() {
      @include fz($font_size_xsmall);
    }
  }

  &_wrapperList {
    display: grid;
    grid-gap: $spacing_6x;
    grid-template-columns: auto auto;
    position: relative;
    padding: 0 $spacing_6x;
    max-width: $business_contents_W;
    margin: auto;

    @include mb() {
      grid-gap: $spacing_4x;
      grid-template-columns: auto;
      padding: 0 $spacing_4x;
    }
  }

  &_pagination {
    padding: $spacing_20x 0 $spacing_40x;
    @include mb() {
      padding: $spacing_12x 0 $spacing_14x;
    }
  }
}
</style>
