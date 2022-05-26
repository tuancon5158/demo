<template>
  <div class="newsDetail">
    <DefaultLayout
      :title="$i18n.locale === 'ja' ? newsDetail.title : newsDetail.titleEn"
      bg-color="blackGradient"
    >
      <HeroImageSection
        has-decoration
        heading="News詳細"
        image="news/news-details.webp"
        size="medium"
        bg-color="black"
        :has-animation="false"
      />

      <article>
        <client-only>
          <div class="newsDetail_header">
            <Spinner
              v-if="loading"
              class="spinner"
              size="medium"
              color="secondary"
              bg-color="gray"
            />
            <div v-else class="newsDetail_heading">
              <span>{{ getYmd(newsDetail.publishedAt) }}</span>
              <div class="newsDetail_heading_title">{{ newsDetailTitle }}</div>
            </div>

            <p
              id="newsDetail_content"
              class="newsDetail_content"
              v-html="
                $i18n.locale === 'en' && newsDetail.bodyEn !== ''
                  ? newsDetail.bodyEn
                  : newsDetail.body
              "
            />
          </div>
        </client-only>
      </article>
    </DefaultLayout>

    <div class="pagination">
      <IconArrowPagination
        color-arrow="white"
        direction="back"
        @click.native="handleArrowClick(-1)"
        v-show="!isNextDisable"
      />
      <span class="pagination_spacing"></span>
      <IconArrowPagination
        color-arrow="white"
        direction="next"
        @click.native="handleArrowClick(1)"
        v-show="!isPrevDisable"
      />
    </div>
    <InquiryForm class="inquiryFormHome" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  useRoute,
  useRouter,
  useContext,
  ref,
  computed,
  watch,
  useMeta
} from '@nuxtjs/composition-api'
// components
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import HeroImageSection from '~/components/organisms/HeroImageSection/HeroImageSection.vue'
import IconArrowPagination from '~/components/icons/IconArrowPagination.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import InquiryForm from '~/components/organisms/InquiryForm/InquiryForm.vue'
// types
import { I_Get_News_Id_Response_Data } from '~/types/schema/response'
// composables
import { dateFormat } from '~/composables/utilities/dateFormat'
import { truncateFilter } from '~/composables/utilities/filters/truncate'

export default defineComponent({
  name: 'NewsDetail',

  auth: false,

  components: {
    DefaultLayout,
    HeroImageSection,
    IconArrowPagination,
    Spinner,
    InquiryForm
  },

  setup() {
    const { app, redirect } = useContext()
    const route = useRoute()
    const router = useRouter()
    const { getYmd } = dateFormat()
    const loading = ref(true)
    // set meta image
    const { title, meta } = useMeta()

    // call API from server
    const newsDetailList = ref<I_Get_News_Id_Response_Data[]>([])
    const newsDetail = ref({} as I_Get_News_Id_Response_Data | undefined)
    const idParam = ref<string>(route.value.params.id)

    const newsDetailTitle = computed(() => {
      return app.i18n.locale === 'ja' ? newsDetail?.value?.title : newsDetail?.value?.titleEn
    })

    const truncateText = truncateFilter()
    useFetch(() =>
      app
        .$repository('news')
        .getList({ limit: 10000, sort: 'published_at', direction: 'DESC' })
        // already catch response fail in axios accensor
        .then((response) => {
          newsDetailList.value = response.data.list

          newsDetail.value = newsDetailList.value.find((item) => {
            return item?.id === idParam.value
          })

          fetchMeta(newsDetail.value)

          loading.value = false

          // check from FE, no need to trust schema from backend
          if (newsDetail.value === undefined) {
            //fallback, not show error on server
            newsDetail.value = {} as I_Get_News_Id_Response_Data | undefined
            if (app.i18n.locale === 'ja') redirect('/error/404')
            else redirect('/en/error/404')
          }
        })
        // catch error from .then() block
        .catch((error) => console.log(error))
    )

    // pagination

    const handleArrowClick = (incOrDec: number) => {
      if (!newsDetail.value) {
        return
      }
      let idx: string | undefined =
        incOrDec > 0
          ? newsDetailList.value[newsDetailList.value.indexOf(newsDetail.value) - 1]?.id
          : newsDetailList.value[newsDetailList.value.indexOf(newsDetail.value) + 1]?.id

      if (idx !== undefined) {
        router.push(app.localePath({ name: 'news-id', params: { id: idx } }))
      }
    }

    const isPrevDisable = computed(() => {
      if (newsDetail.value) {
        return newsDetailList.value.indexOf(newsDetail.value) === 0
      }
      return true
    })

    const isNextDisable = computed(() => {
      if (newsDetail.value) {
        return newsDetailList.value.indexOf(newsDetail.value) === newsDetailList.value.length - 1
      }
      return true
    })

    const fetchMeta = (newsDetail) => {
      const metaDescription = newsDetail.body
        ? truncateText(newsDetail.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''), '200', '..')
        : app.i18n.t('meta.description')

      title.value = `${newsDetail.title} | comony`
      meta.value = [
        {
          hid: 'description',
          name: 'description',
          content: metaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${newsDetail.title} | comony`
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
          content: `${newsDetail.title} | comony`
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: metaDescription
        }
      ]
    }

    return {
      getYmd,
      loading,
      newsDetail,
      handleArrowClick,
      newsDetailTitle,
      isPrevDisable,
      isNextDisable
    }
  },

  head: {}
})
</script>

<style scoped lang="scss">
.newsDetail {
  background: $color_black_gradient;

  &_header {
    color: $color_white;
    max-width: $default_contents_W;
    margin: auto;
    padding: $spacing_28x $spacing_6x $spacing_35x;
    height: 100%;

    @include mb() {
      padding: $spacing_6x $spacing_4x $spacing_6x;
    }
  }

  &_heading {
    display: flex;
    align-items: center;

    @include mb() {
      display: initial;
    }

    &_title {
      margin-left: $spacing_4x;
      @include fz($font_size_m);

      @include mb() {
        margin-left: 0;
      }
    }
  }

  &_content {
    overflow: hidden;
    margin: $spacing_3x 0;
    word-break: break-all;
    line-height: $line_height_article;

    @include pc() {
      @include fz($font_size_s);
    }

    @include mb() {
      @include fz($font_size_xxxs);
    }

    /deep/ img,
    /deep/ iframe {
      height: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;

      @include mb() {
        width: 100%;
      }
    }

    /deep/ dl {
      margin-bottom: $spacing_5x;
    }

    /deep/ a {
      transition: all 0.5s;
      text-decoration: underline;

      &:hover {
        opacity: 0.75;
      }
    }

    /deep/ p {
      margin: 0;
    }
  }

  .pagination {
    background: $color_black_gradient;
    display: flex;
    justify-content: center;
    padding: 0 0 $spacing_40x;

    @include mb() {
      padding: 0 0 $spacing_14x;
    }

    &_spacing {
      margin: 0 $spacing_20x;

      @include mb() {
        margin: 0 $spacing_4x;
      }
    }
  }
}
</style>

<style scoped lang="scss">
// style for old articles
/deep/ .p-news {
  &_wrap {
    margin: $spacing_10x 0;
    &.-align {
      &-center {
        text-align: center;
      }
    }
  }

  &_title {
    @include mb() {
      @include fz($font_size_m);
    }
    @include pc() {
      @include fz($font_size_heading5);
      width: 80%;
    }
  }

  &_detail {
    & p {
      line-height: 2;
    }
    img {
      @include pc() {
        width: 80%;
      }
      @include mb() {
        width: 100%;
      }
    }
    ul {
      li {
        margin-bottom: $spacing_10x;
      }
    }
  }

  &_image {
    text-align: center;
    @include pc() {
      margin: $spacing_10x auto;
    }
    @include mb() {
      margin: 0 auto;
    }
  }

  &_link {
    word-break: break-all;
  }

  &_iframe {
    position: relative;
    width: 90%;
    height: 0;
    padding-top: 55%;
    margin: $spacing_5x auto;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &_company {
    & > div {
      display: flex;
      dt {
        @include mb() {
          width: 120px;
        }
        @include pc() {
          width: 175px;
        }
      }
      dd {
        @include mb() {
          width: calc(100% - 120px);
          word-break: break-all;
        }
        @include pc() {
          width: calc(100% - 175px);
          margin-bottom: $spacing_1x;
        }
      }
    }
  }
}

/deep/ .c-link {
  &_text {
    word-break: break-all;
    color: $color_secondary;
  }
}
</style>
