<template>
  <section class="newsContainer">
    <DefaultLayout bg-color="blackGradient">
      <!--       has-decoration -->
      <HeroImageSection
        :label="$i18n.locale !== 'en' ? 'ニュースリリース・お知らせ' : ''"
        heading="News"
        image="news/news-details.webp"
        size="medium"
        bg-color="black"
      />

      <div class="news">
        <div class="news_content">
          <NewsItem
            class="news_item"
            v-for="item in newsList"
            :id="item.id"
            :key="item.id"
            link-color="white"
            date-color="black"
            :url-link="item.newsUrl"
            :content="$i18n.locale === 'en' ? item.titleEn || '' : item.title || ''"
            :date-item="item.publishedAt"
          />
        </div>
      </div>
    </DefaultLayout>
    <Pagination
      isScrollOnTop
      scrollTo=".news"
      v-if="newsPagination.totalPages > 1"
      class="pagination"
      :current="1"
      :total-items="newsPagination.totalPages"
      @onSelectedItem="handlePagination"
    />
    <InquiryForm class="inquiryFormHome" />
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useMeta,
  reactive,
  ref,
  useFetch
} from '@nuxtjs/composition-api'
import Pagination from '~/components/organisms/Pagination/Pagination.vue'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import HeroImageSection from '~/components/organisms/HeroImageSection/HeroImageSection.vue'
import NewsItem from '~/components/molecules/NewsItem/NewsItem.vue'
import { I_NewsList } from '~/types/schema/news'
import { I_Pagination, I_Get_News_Id_Response_Data } from '~/types/schema/response'
import InquiryForm from '~/components/organisms/InquiryForm/InquiryForm.vue'
export default defineComponent({
  name: 'News',

  auth: false,

  components: {
    Pagination,
    DefaultLayout,
    HeroImageSection,
    NewsItem,
    InquiryForm
  },
  setup() {
    const { app } = useContext()
    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('meta.news.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.news.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.news.title')} | comony`
      }
    ]

    const newsList = ref<I_Get_News_Id_Response_Data | undefined[]>([])
    const newsPagination = ref({} as I_Pagination)
    const newsParams: I_NewsList = reactive({
      page: 1,
      limit: 20,
      sort: 'published_at',
      direction: 'DESC'
    })

    const fetchData = () =>
      app
        .$repository('news')
        .getList(newsParams)
        .then((response) => {
          if (response?.data?.list?.length > 0 && Array.isArray(response?.data?.list)) {
            newsList.value = response.data.list
            newsPagination.value = response.data.pagination
          } else {
            newsParams.page = 0
          }
        })
        .catch((error) => console.log(error))

    useFetch(fetchData)

    const handlePagination = (page: number) => {
      newsParams.page = page
      fetchData()
    }

    return { newsList, newsPagination, handlePagination }
  },

  head: {}
})
</script>
<style scoped lang="scss">
.newsContainer {
  .news {
    background: $color_black_gradient;

    &_content {
      color: $color_white;
      max-width: $default_contents_W;
      margin: auto;
      height: 100%;
      padding: $spacing_21x $spacing_6x 0;

      @include mb() {
        padding: $spacing_6x $spacing_6x $spacing_12x;
      }
    }
    &_item {
      &:not(:last-child) {
        margin-bottom: $spacing_6x;

        @include mb() {
          margin-bottom: $spacing_4x;
        }
      }
    }
  }
  .pagination {
    background: $color_black_gradient;
    padding: $spacing_20x 0 $spacing_40x;
    @include mb() {
      padding: $spacing_12x 0 $spacing_14x;
    }
  }
}
</style>
