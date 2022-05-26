<template>
  <DefaultLayout :is-breadcrumb="false">
    <!-- MAIN VISUAL -->
    <MainVisualVideo />

    <!-- NEWS LIST -->
    <div
      v-observe-visibility="{
        callback: visibilityChangedArrows,
        once: false,
        intersection: { rootMargin: '50px' }
      }"
    >
      <div class="animatedDirection -bottomToTop">
        <SectionContainer class="imageBoxAnimated" bg-color="black-gradient" columns="1">
          <template #column-1>
            <div class="newsList">
              <Heading
                level="2"
                align="left"
                font-weight="700"
                :headings="[
                  {
                    text: 'News',
                    color: 'white',
                    spBreak: false
                  }
                ]"
              />
              <div v-if="newsList" class="newsList_contents">
                <NewsItem
                  v-for="item in newsList"
                  :id="item.id"
                  :key="item.id"
                  class="newsList_item"
                  :url-link="item.newsUrl"
                  :content="
                    $i18n.locale === 'en' && item.titleEn !== null && item.titleEn !== ''
                      ? item.titleEn
                      : item.title
                  "
                  :date-item="item.publishedAt"
                />
              </div>
              <LinkText
                color="white"
                :link="localePath('news')"
                underline
                :value="$t('newsListLink')"
                font-size="standard"
              />
            </div>
          </template>
        </SectionContainer>
      </div>
    </div>

    <AnimatedBackground>
      <template #contents>
        <!-- VIDEO -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -right">
            <section class="heading -position--right">
              <SubHeadingBlock
                :title="[
                  {
                    line1: $t('video.title1'),
                    line2: $t('video.title2')
                  }
                ]"
                :description="$t('video.description')"
                @visibilityChanged="maskTxtAnimation"
              />
            </section>
          </div>
        </div>

        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <SectionContainer class="imageBoxAnimated" bg-color="black-gradient" columns="1">
              <template #column-1>
                <div
                  v-observe-visibility="{
                    callback: visibilityChangedVideo,
                    once: false,
                    throttle: 300,
                    intersection: {
                      rootMargin: '50px'
                    }
                  }"
                >
                  <Video
                    v-if="visibleVideo"
                    width="100%"
                    height="auto"
                    src="https://www.youtube.com/embed/KiDb39pXl1s"
                  />
                </div>
              </template>
            </SectionContainer>
          </div>
        </div>

        <!-- COMMITMENTS -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -left">
            <section class="heading -position--left">
              <SubHeadingBlock
                position="right"
                :title="[
                  {
                    line1: $t('commitments.title1'),
                    line2: $t('commitments.title2')
                  }
                ]"
                :description="$t('commitments.description')"
                @visibilityChanged="maskTxtAnimation"
              />
            </section>
          </div>
        </div>

        <div class="imageBoxTop">
          <div
            v-observe-visibility="{
              callback: visibilityChangedImageBoxTop,
              throttle: 300,
              once: false,
              intersection: {
                rootMargin: '50px'
              }
            }"
          >
            <div class="animatedDirection -bottomToTop">
              <ImageBox
                id="image-box-1"
                class="imageBoxAnimated"
                position="right"
                src="imageBox01.webp"
                number="1"
                :title="$t('commitments.boxTitle1')"
                :description="$t('commitments.boxDescription1')"
                @onVisibilityChanged="handleScaleImage"
              />
            </div>

            <SquareLively class="imageBoxTop_squareIcon" :animated="visibleRotateImageBox" />
          </div>
        </div>
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <ImageBox
              id="image-box-2"
              class="imageBoxAnimated"
              src="imageBox02.webp"
              number="2"
              :title="$t('commitments.boxTitle2')"
              :description="$t('commitments.boxDescription2')"
              @onVisibilityChanged="handleScaleImage"
            />
          </div>
        </div>
        <div class="imageBoxBottom">
          <div
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              once: false,
              throttle: 300,
              intersection: {
                rootMargin: '50px'
              }
            }"
          >
            <div class="animatedDirection -bottomToTop">
              <ImageBox
                id="image-box-3"
                class="imageBoxAnimated"
                position="right"
                src="imageBox03.webp"
                number="3"
                :title="$t('commitments.boxTitle3')"
                :description="$t('commitments.boxDescription3')"
                @onVisibilityChanged="handleScaleImage"
              />
            </div>
          </div>

          <div class="imageBoxBottom_flashIcon">
            <FlashLively />
          </div>
        </div>

        <!-- CTA BANNER -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedCreatorBanner,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <AppDownloadCTABanner
              class="imageBoxAnimated"
              image="CTABanner02.png"
              :text="$t('appDownloadCTABanner.title')"
              :link="localePath('spaces')"
            />
          </div>
        </div>

        <!-- GALLERY SLIDER -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -right">
            <section class="heading -position--right">
              <SubHeadingBlock
                :title="[
                  {
                    line1: $t('gallery.title1'),
                    line2: $t('gallery.title2')
                  }
                ]"
                :description="$t('gallery.description')"
                @visibilityChanged="maskTxtAnimation"
              />
            </section>
          </div>
        </div>

        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <SectionContainer
              class="gallery imageBoxAnimated"
              bg-color="black-gradient"
              columns="1"
              full-width
              container-size="full"
            >
              <template #column-1>
                <GallerySlider
                  v-if="spaceList.slice(0, 5).length > 0"
                  class="gallery_top"
                  reverse
                  :sliders="spaceList.slice(0, 5)"
                />
                <GallerySlider
                  v-if="spaceList.slice(5, 10).length > 0"
                  class="gallery_center"
                  :sliders="spaceList.slice(5, 10)"
                />
                <GallerySlider
                  v-if="spaceList.slice(10).length > 0"
                  class="gallery_bottom"
                  reverse
                  :sliders="spaceList.slice(10)"
                />
                <LinkText
                  color="white"
                  :link="localePath('spaces')"
                  underline
                  :value="$t('spaceListLink')"
                  font-size="standard"
                />
              </template>
            </SectionContainer>
          </div>
        </div>

        <!-- CREATORS -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -left">
            <section class="heading -position--left">
              <SubHeadingBlock
                position="right"
                :title="[
                  {
                    line1: $t('creatorsTop.title1'),
                    line2: $t('creatorsTop.title2')
                  }
                ]"
                :description="$t('creatorsTop.description')"
                @visibilityChanged="maskTxtAnimation"
              />
            </section>
          </div>
        </div>

        <div class="creatorBanner">
          <div
            v-observe-visibility="{
              callback: visibilityChangedCreatorBanner,
              throttle: 300,
              once: false,
              intersection: { rootMargin: '50px' }
            }"
          >
            <div class="animatedDirection -bottomToTop">
              <SectionContainer
                class="creatorSection imageBoxAnimated"
                bg-color="black-gradient"
                container-size="full"
                columns="1"
                position="left"
              >
                <template #column-1>
                  <CreatorArticle
                    class="creatorSection_item"
                    :background-path="require('@/assets/images/gallery_bg1.webp')"
                    :image-list="creatorImages"
                    :to="localePath('interview-takahito-yamada')"
                    :heading="$t('creatorsTop.first.name')"
                    :sub-heading="$t('creatorsTop.first.company')"
                    :content="$t('creatorsTop.first.description')"
                    :link="$t('creatorsTop.readMore')"
                    @visibilityChanged="slideItems"
                  />
                  <CreatorArticle
                    class="creatorSection_item"
                    :background-path="require('@/assets/images/gallery_bg2.webp')"
                    :image-list="creatorImages2"
                    :to="localePath('interview-daiki-kato')"
                    :heading="$t('creatorsTop.second.name')"
                    :sub-heading="$t('creatorsTop.second.company')"
                    :content="$t('creatorsTop.second.description')"
                    :link="$t('creatorsTop.readMore')"
                    @visibilityChanged="slideItems"
                  />
                </template>
              </SectionContainer>
            </div>

            <SquareLively class="creatorBanner_squareIcon" :animated="visibleRotateCreatorBanner" />

            <!-- CTA BANNER -->
            <div
              v-observe-visibility="{
                callback: visibilityChangedCreatorBanner,
                throttle: 300,
                once: false,
                intersection: { rootMargin: '50px' }
              }"
            >
              <div class="animatedDirection -bottomToTop">
                <AppDownloadCTABanner
                  class="imageBoxAnimated"
                  image="CTABanner02.png"
                  :text="$t('appDownloadCTABanner.title')"
                  :link="localePath('spaces')"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- FIGURE -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -right">
            <section class="heading -position--right">
              <SubHeadingBlock
                :title="[
                  {
                    line1: $t('figure.title1'),
                    line2: $t('figure.title2')
                  }
                ]"
                :description="$t('figure.description')"
                @visibilityChanged="maskTxtAnimation"
              />
            </section>
          </div>
        </div>
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <FigureCaptionList
              class="imageBoxAnimated"
              is-scroll
              :figure-caption-list="figureCaptionList"
              @visibilityChanged="slideItems"
            />
          </div>
        </div>

        <!-- Q&A -->
        <div class="faqGroup">
          <div
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              throttle: 300,
              once: false,
              intersection: { rootMargin: '50px' }
            }"
          >
            <div class="animatedDirection -left">
              <section class="heading -position--left">
                <SubHeadingBlock
                  position="right"
                  :title="[
                    {
                      line1: 'FAQ'
                    }
                  ]"
                  :description="$t('faqTop.description')"
                  @visibilityChanged="maskTxtAnimation"
                />
              </section>
            </div>
          </div>

          <div
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              throttle: 300,
              once: false,
              intersection: { rootMargin: '100px' }
            }"
            class="faqGroup_section"
          >
            <div class="animatedDirection -bottomToTop">
              <SectionContainer
                class="imageBoxAnimated"
                bg-color="black-gradient"
                columns="1"
                container-size="lg"
                position="left"
                full-width
              >
                <template #column-1>
                  <FAQ
                    is-scroll
                    :list-item="faqList"
                    bg-color="transparent"
                    @visibilityChanged="slideFAQ"
                  />
                </template>
              </SectionContainer>
            </div>
          </div>
        </div>

        <!-- CTA BANNER -->
        <div class="ctaBannerCreator">
          <div
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              throttle: 300,
              once: false,
              intersection: { rootMargin: '100px' }
            }"
          >
            <div class="animatedDirection -bottomToTop">
              <ForCreatorBusinessCTABanner
                class="imageBoxAnimated"
                :link="localePath('creator')"
                image="for-creator-business-CTABanner01.png"
                :title="$t('forCreatorBusinessCTABanner.title1')"
                :button-label="$t('forCreatorBusinessCTABanner.button1')"
                :description="$t('forCreatorBusinessCTABanner.description1')"
              />
            </div>
          </div>
          <div
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              throttle: 300,
              once: false,
              intersection: { rootMargin: '100px' }
            }"
          >
            <div class="animatedDirection -bottomToTop">
              <ForCreatorBusinessCTABanner
                class="imageBoxAnimated"
                :link="localePath('business')"
                image="for-creator-business-CTABanner02.png"
                :title="$t('forCreatorBusinessCTABanner.title2')"
                :button-label="$t('forCreatorBusinessCTABanner.button2')"
                :description="$t('forCreatorBusinessCTABanner.description2')"
              />
            </div>
          </div>
          <div v-observe-visibility="{ callback: visibilityChangedCircle }">
            <div class="ctaBannerCreator_flashIcon">
              <FlashLively />
            </div>

            <CircleLively
              :visible-animated="visibleChangedCircle"
              :animated="visibleChangedCircle"
              class="ctaBannerCreator_circleLively"
            />
          </div>
        </div>

        <!-- INQUIRY FORM -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: false,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <InquiryForm class="inquiryFormHome imageBoxAnimated" />
          </div>
        </div>
      </template>
    </AnimatedBackground>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  useContext,
  useAsync,
  useFetch
} from '@nuxtjs/composition-api'
// components
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import Heading from '~/components/atoms/Heading/Heading.vue'
import AnimatedBackground from '~/components/atoms/AnimatedBackground/AnimatedBackground.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import NewsItem from '~/components/molecules/NewsItem/NewsItem.vue'
import SubHeadingBlock from '~/components/molecules/SubHeadingBlock/SubHeadingBlock.vue'
import MainVisualVideo from '~/components/organisms/MainVisual/MainVisualVideo.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import Video from '~/components/atoms/Video/Video.vue'
import AppDownloadCTABanner from '~/components/organisms/CTABanner/AppDownloadCTABanner.vue'
import ForCreatorBusinessCTABanner from '~/components/organisms/CTABanner/ForCreatorBusinessCTABanner.vue'
import FigureCaptionList from '~/components/organisms/FigureCaptionList/FigureCaptionList.vue'
import ImageBox from '~/components/organisms/ImageBox/ImageBox.vue'
import GallerySlider from '~/components/organisms/Slider/GallerySlider/GallerySlider.vue'
import SquareLively from '~/components/atoms/LivelyIcon/SquareLively/SquareLively.vue'
import FlashLively from '~/components/atoms/LivelyIcon/FlashLively/FlashLively.vue'
import InquiryForm from '~/components/organisms/InquiryForm/InquiryForm.vue'
import CreatorArticle from '~/components/organisms/CreatorArticle/CreatorArticle.vue'
import CircleLively from '~/components/atoms/LivelyIcon/CircleLively/CircleLively.vue'
import FAQ, { I_ListItemFAQ } from '~/components/organisms/FAQ/FAQ.vue'
// composables
import { handleScroll } from '~/composables/utilities/scroll'
// types
import { I_NewsList } from '~/types/schema/news'
import { I_SpaceListDTO, I_SpaceListRequest } from '~/types/schema/space'
// constants
import { publishedStatusId } from '~/constants/spaces'

// FigureCaptionItem type
interface FigureCaptionListElement {
  title: string
  text: string
  image: string
}

export default defineComponent({
  name: 'HomeTemplate',

  components: {
    DefaultLayout,
    SectionContainer,
    Heading,
    NewsItem,
    LinkText,
    AnimatedBackground,
    SubHeadingBlock,
    Video,
    AppDownloadCTABanner,
    ForCreatorBusinessCTABanner,
    FigureCaptionList,
    FAQ,
    ImageBox,
    GallerySlider,
    SquareLively,
    FlashLively,
    MainVisualVideo,
    InquiryForm,
    CircleLively,
    CreatorArticle
  },

  setup() {
    const { app } = useContext()

    // ---------- Figure Caption List ----------
    const figureCaptionList = ref<Array<FigureCaptionListElement>>([])

    figureCaptionList.value = [
      {
        image: 'figureCaptionItem1.webp',
        title: app.i18n.t('figure.boxTitle1'),
        text: app.i18n.t('figure.boxDescription1')
      },
      {
        image: 'figureCaptionItem2.webp',
        title: app.i18n.t('figure.boxTitle2'),
        text: app.i18n.t('figure.boxDescription2')
      },
      {
        image: 'figureCaptionItem3.webp',
        title: app.i18n.t('figure.boxTitle3'),
        text: app.i18n.t('figure.boxDescription3')
      }
    ]

    // ---------- FAQ List ----------
    const faqList = ref<Array<I_ListItemFAQ>>([])
    faqList.value = [
      {
        question: app.i18n.t('faqTop.first.question'),
        answer: app.i18n.t('faqTop.first.answer')
      },
      {
        question: app.i18n.t('faqTop.second.question'),
        answer: app.i18n.t('faqTop.second.answer')
      },
      {
        question: app.i18n.t('faqTop.third.question'),
        answer: app.i18n.t('faqTop.third.answer')
      }
    ]

    onMounted(() => {
      window.scrollTo({ top: 0 })
    })

    // ---------- get space data ---------
    const spaceList = ref<I_SpaceListDTO[]>([])
    const spacesParams: I_SpaceListRequest = reactive({
      page: 0,
      sort: 'isRecommended',
      limit: 15,
      publishedStatus: publishedStatusId.OPEN,
      direction: 'DESC'
    })

    const fetchSpaceList = async () => {
      if (spacesParams.page) {
        spacesParams.page += 1
      }

      await app
        .$repository('spaces')
        .getList(spacesParams)
        .then((response) => {
          if (response && response.data?.list?.length !== 0) {
            spaceList.value = response.data.list
          } else {
            spacesParams.page = 0
          }
        })
        .catch((error) => console.log('async space list [get]', error))
    }

    useFetch(fetchSpaceList)

    // ---------- get news data ---------
    const newsParams: I_NewsList = reactive({
      page: 1,
      limit: 3,
      sort: 'publishedAt',
      direction: 'DESC'
    })

    // const createNewsList = async () => {
    const newsList = useAsync(async () => {
      const response = await app
        .$repository('news')
        .getList(newsParams)
        .catch((error) => console.log('async news list [get]', error))

      if (response && response.data?.list?.length !== 0) {
        return response.data.list
      } else {
        newsParams.page = 0
      }
    })

    // ---------- animation ----------
    const {
      slideItems,
      handleScaleImage,
      maskTxtAnimation,
      visibilityChangedImageBoxTop,
      visibilityChangedCreatorBanner,
      visibilityChangedCircle,
      visibilityChangedArrows,
      visibilityChangedVideo,
      visibleRotateImageBox,
      visibleRotateCreatorBanner,
      visibleChangedCircle,
      visibleVideo
    } = handleScroll()

    const slideFAQ = (isVisible: boolean, entry, delayTime, classes = 'is-active--according') => {
      return slideItems(isVisible, entry, delayTime, classes)
    }

    // ---------- Creators ----------
    const creatorImages = [
      { title: 'image1', thumbnailUrl: require('@/assets/images/creator/01/image_01_sm.webp') },
      { title: 'image2', thumbnailUrl: require('@/assets/images/creator/01/image_02_sm.webp') },
      { title: 'image3', thumbnailUrl: require('@/assets/images/creator/01/image_03_sm.webp') },
      { title: 'image4', thumbnailUrl: require('@/assets/images/creator/01/image_04_sm.webp') }
    ]

    const creatorImages2 = [
      { title: 'image1', thumbnailUrl: require('@/assets/images/creator/02/image_01_sm.webp') },
      { title: 'image2', thumbnailUrl: require('@/assets/images/creator/02/image_02_sm.webp') },
      { title: 'image3', thumbnailUrl: require('@/assets/images/creator/02/image_03_sm.webp') },
      { title: 'image4', thumbnailUrl: require('@/assets/images/creator/02/image_04_sm.webp') }
    ]

    return {
      figureCaptionList,
      slideFAQ,
      slideItems,
      // createSpaceList,
      // createNewsList,
      newsList,
      spaceList,
      handleScaleImage,
      visibilityChangedImageBoxTop,
      visibilityChangedCreatorBanner,
      visibilityChangedArrows,
      visibilityChangedCircle,
      visibleChangedCircle,
      visibleRotateCreatorBanner,
      visibleRotateImageBox,
      creatorImages,
      creatorImages2,

      maskTxtAnimation,
      visibilityChangedVideo,
      visibleVideo,
      faqList
    }
  }
})
</script>

<style lang="scss" scoped>
.newsList {
  &_contents {
    margin: $spacing_8x auto $spacing_14x;

    @include mb() {
      margin: $spacing_8x auto;
    }
  }

  &_item {
    &:not(:last-child) {
      margin-bottom: $spacing_6x;
    }
  }
}

.faqGroup {
  position: relative;
  margin-bottom: $spacing_41x;

  @include mb() {
    margin-bottom: $spacing_20x;
  }
}

.heading {
  &.-position {
    &--right {
      padding: $spacing_41x 0 0 calc((100% - #{$default_contents_W}) / 2 - #{$spacing_30x});

      @include mb() {
        padding: $spacing_20x 0 0 0;
      }
    }

    &--left {
      padding: $spacing_41x calc((100% - #{$default_contents_W}) / 2 - #{$spacing_30x}) 0 0;

      @include mb() {
        padding: $spacing_20x 0 0 0;
      }
    }
  }
}

.gallery {
  padding: $spacing_14x 0 $spacing_20x;

  @include mb() {
    padding: $spacing_6x 0 $spacing_14x;
  }

  &_top {
    margin-bottom: $spacing_6x;
    @include mb() {
      margin-bottom: $spacing_4x;
    }
  }

  &_center {
    margin-bottom: $spacing_6x;
    @include mb() {
      margin-bottom: $spacing_4x;
    }
  }

  &_bottom {
    margin-bottom: $spacing_14x;
    @include mb() {
      margin-bottom: $spacing_8x;
    }
  }
}

.imageBoxTop {
  position: relative;

  &_squareIcon {
    position: absolute;
    right: -122px;
    top: 440px;
    z-index: 1;
    transform: rotate(-22.25deg);

    @include mb() {
      right: -42px;
      top: 36px;
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
      right: -48px;
      top: 36px;
    }

    @include screen(map-get($breakpoints, lg), map-get($breakpoints, xxxl)) {
      right: -75px;
      top: 67px;
    }
  }
}

.creatorBanner {
  position: relative;

  &_squareIcon {
    position: absolute;
    right: -120px;
    bottom: 31rem;
    z-index: 2;
    transform: rotate(-22.25deg);

    @include mb() {
      right: -50px;
      bottom: 86rem;
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
      right: -56px;
      bottom: 44rem;
    }

    @include screen(map-get($breakpoints, lg), map-get($breakpoints, xxxl)) {
      bottom: 36rem;
    }
  }
}

.ctaBannerCreator {
  position: relative;
  overflow: hidden;

  @include mb() {
    margin-bottom: $spacing_22x;
  }

  &_flashIcon {
    position: absolute;
    left: -360px;
    bottom: -100px;
    z-index: 1;

    @include mb() {
      left: -82%;
      top: 70%;
    }
  }

  &_circleLively {
    position: absolute;
    right: -20rem;
    z-index: 3;
    top: -10rem;
    transform: translateY(28rem);

    @include mb() {
      right: -8rem;
      top: 50rem;
      transform: translateY(-16.5rem);
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
      top: -5rem;
      right: -28rem;
    }
  }
}

.imageBoxBottom {
  position: relative;
  overflow: hidden;

  &_flashIcon {
    position: absolute;
    left: -180px;
    top: 40%;
    z-index: 1;
    // overflow: hidden;

    @include mb() {
      top: 30%;
    }
  }
}

.creatorSection {
  &_item {
    &:not(:last-child) {
      margin-bottom: $spacing_6x;

      @include mb() {
        margin-bottom: $spacing_14x;
      }
    }
  }
}
.inquiryFormHome {
  @include mb() {
    margin-bottom: $spacing_22x;
  }
}
</style>
