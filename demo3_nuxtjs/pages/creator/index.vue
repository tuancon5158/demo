<template>
  <DefaultLayout>
    <HeroImageSection
      class="creator_heroImage"
      image="creator/heroImageSection_creator.webp"
      :heading="$t('creator.heroTitle')"
      @handleLoad="show = true"
    />
    <AnimatedBackground>
      <template #contents>
        <!-- VIDEO - hide for now -->
        <!-- <div class="animatedDirection -right" :class="{ '-right--animated': show }">
          <section class="heading -position--right">
            <SubHeadingBlock
              :title="[
                {
                  line1: 'comonyが大事にしている空間を創る<br/>',
                  line2: 'アイウエオかきくけこ'
                }
              ]"
              description="テキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテキストテ"
              @visibilityChanged="maskTxtAnimation"
            />
          </section>
        </div> -->

        <!-- <div class="animatedDirection -bottomToTop" :class="{ '-bottomToTop--animated': show }">
          <SectionContainer
            class="sectionContainer imageBoxAnimated"
            bg-color="black-gradient"
            columns="1"
          >
            <template #column-1>
              <div
                v-observe-visibility="{
                  callback: visibilityChangedVideo,
                  once: true,
                  intersection: {
                    rootMargin: '50px'
                  }
                }"
              >
                <Video v-if="visibleVideo" width="100%" height="auto" />
                <p class="video_text">
                  テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキスト
                </p>
              </div>
            </template>
          </SectionContainer>
        </div> -->

        <!-- COMMITMENTS -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            once: false
          }"
        >
          <div class="animatedDirection -left" :class="{ '-left--animated': show }">
            <section class="heading -position--left">
              <SubHeadingBlock
                position="right"
                :title="[
                  {
                    line1: $t('creator.commitments.title1'),
                    line2: $t('creator.commitments.title2')
                  }
                ]"
                :description="$t('creator.commitments.description')"
                @visibilityChanged="maskTxtAnimation"
              />
            </section>
          </div>
        </div>

        <div class="imageBoxTop">
          <div
            v-observe-visibility="{
              callback: visibilityChangedImageBoxTop,
              once: false
            }"
          >
            <div class="animatedDirection -bottomToTop" :class="{ '-bottomToTop--animated': show }">
              <ImageBox
                id="image-box-1"
                class="imageBoxAnimated"
                position="right"
                src="creator/imageBox01-creator.webp"
                :title="$t('creator.commitments.boxTitle1')"
                :description="$t('creator.commitments.boxDescription1')"
                @onVisibilityChanged="handleScaleImage"
              />
            </div>
          </div>
        </div>
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            once: false
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <ImageBox
              id="image-box-2"
              class="imageBoxAnimated"
              src="creator/imageBox02-creator.webp"
              :title="$t('creator.commitments.boxTitle2')"
              :description="$t('creator.commitments.boxDescription2')"
              @onVisibilityChanged="handleScaleImage"
            />
          </div>
        </div>
        <!-- <div class="imageBoxBottom">
          <div
            v-observe-visibility="{
              callback: visibilityChangedArrows,
              once: false
            }"
          >
            <div class="animatedDirection -bottomToTop">
              <ImageBox
                id="image-box-3"
                class="imageBoxAnimated"
                position="right"
                src="imageBox03-creator.webp"
                title="過去/現代/未来の建築メタバーで空間をつなぐ体験を"
                description="テキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキストテキストテキストテテキストテキストテキストテキストテキストテキスト"
                @onVisibilityChanged="handleScaleImage"
              />
            </div>
          </div>
        </div> -->

        <!-- FIGURE -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            once: false
          }"
        >
          <div class="animatedDirection -right">
            <section class="heading -position--right">
              <SubHeadingBlock
                :title="[
                  {
                    line1: $t('creator.figure.title1')
                  }
                ]"
                :description="$t('creator.figure.description')"
                @visibilityChanged="maskTxtAnimation"
              />
            </section>
          </div>
        </div>
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            once: false
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <FigureCaptionList
              class="imageBoxAnimated figureCaptionListCreator"
              is-scroll
              :figure-caption-list="figureCaptionList1"
              size="small"
              @visibilityChanged="slideItems"
            />
            <FigureCaptionList
              class="imageBoxAnimated figureCaptionListCreator"
              is-scroll
              :figure-caption-list="figureCaptionList2"
              size="small"
              @visibilityChanged="slideItems"
            />
          </div>
        </div>

        <!-- CREATORS -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            throttle: 300,
            once: true,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -left">
            <section class="heading -position--left">
              <SubHeadingBlock
                position="right"
                :title="[
                  {
                    line1: $t('creator.creatorList.title1'),
                    line2: $t('creator.creatorList.title2')
                  }
                ]"
                :description="$t('creator.creatorList.description')"
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
              once: true,
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
          </div>
        </div>

        <!-- INQUIRY FORM -->
        <InquiryForm class="inquiryFormCreator" />
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
  useMeta
} from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import AnimatedBackground from '~/components/atoms/AnimatedBackground/AnimatedBackground.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import SubHeadingBlock from '~/components/molecules/SubHeadingBlock/SubHeadingBlock.vue'
import Video from '~/components/atoms/Video/Video.vue'
import FigureCaptionList from '~/components/organisms/FigureCaptionList/FigureCaptionList.vue'
import ImageBox from '~/components/organisms/ImageBox/ImageBox.vue'
import InquiryForm from '~/components/organisms/InquiryForm/InquiryForm.vue'
import CreatorArticle from '~/components/organisms/CreatorArticle/CreatorArticle.vue'
import HeroImageSection from '~/components/organisms/HeroImageSection/HeroImageSection.vue'
import { handleScroll } from '~/composables/utilities/scroll'
// constants
import { publishedStatusId } from '~/constants/spaces'

// FigureCaptionItem type
interface FigureCaptionListElement {
  title: string
  text: string
  image: string
}

export default defineComponent({
  components: {
    DefaultLayout,
    SectionContainer,
    AnimatedBackground,
    SubHeadingBlock,
    Video,
    FigureCaptionList,
    ImageBox,
    InquiryForm,
    CreatorArticle,
    HeroImageSection
  },

  setup() {
    const { app } = useContext()
    // Meta
    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('meta.creator.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.creator.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.creator.title')} | comony`
      }
    ]

    // ---------- Figure Caption List ----------
    const figureCaptionList1 = ref<Array<FigureCaptionListElement>>([])
    const figureCaptionList2 = ref<Array<FigureCaptionListElement>>([])

    figureCaptionList1.value = [
      {
        image: 'creator/figureCaptionItem1_creator.webp',
        title: app.i18n.t('creator.figure.boxTitle1'),
        text: app.i18n.t('creator.figure.boxDescription1')
      },
      {
        image: 'creator/figureCaptionItem2_creator.webp',
        title: app.i18n.t('creator.figure.boxTitle2'),
        text: app.i18n.t('creator.figure.boxDescription2')
      },
      {
        image: 'creator/figureCaptionItem3_creator.webp',
        title: app.i18n.t('creator.figure.boxTitle3'),
        text: app.i18n.t('creator.figure.boxDescription3')
      }
    ]

    figureCaptionList2.value = [
      {
        image: 'creator/figureCaptionItem4_creator.webp',
        title: app.i18n.t('creator.figure.boxTitle4'),
        text: app.i18n.t('creator.figure.boxDescription4')
      },
      {
        image: 'creator/figureCaptionItem5_creator.webp',
        title: app.i18n.t('creator.figure.boxTitle5'),
        text: app.i18n.t('creator.figure.boxDescription5')
      },
      {
        image: 'creator/figureCaptionItem6_creator.webp',
        title: app.i18n.t('creator.figure.boxTitle6'),
        text: app.i18n.t('creator.figure.boxDescription6')
      }
    ]

    onMounted(() => {
      window.scrollTo({ top: 0 })
      createCreatorSpaces()
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
      visibleVideo
    } = handleScroll()

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

    // get space creators from api
    const creatorSpaces = reactive({
      list1: [],
      list2: [],
      list3: []
    })

    // get space list of creators from api
    const createCreatorSpaces = async () => {
      await Promise.all([
        app.$repository('spaces').getList({
          page: 1,
          limit: 3,
          userId: 1603,
          publishedStatus: publishedStatusId.OPEN
        }),
        app.$repository('spaces').getList({
          page: 1,
          limit: 3,
          userId: 1848,
          publishedStatus: publishedStatusId.OPEN
        }),
        app.$repository('spaces').getList({
          page: 1,
          limit: 3,
          userId: 1823,
          publishedStatus: publishedStatusId.OPEN
        })
      ]).then((response) => {
        creatorSpaces.list1 = response[0].data.list
        creatorSpaces.list2 = response[1].data.list
        creatorSpaces.list3 = response[2].data.list
      })
    }

    // show anmation when image finish loading
    const show = ref(false)

    return {
      figureCaptionList1,
      figureCaptionList2,
      slideItems,
      handleScaleImage,
      visibilityChangedImageBoxTop,
      visibilityChangedCreatorBanner,
      visibilityChangedArrows,
      visibilityChangedCircle,
      creatorImages,
      creatorImages2,
      createCreatorSpaces,
      creatorSpaces,
      maskTxtAnimation,
      visibilityChangedVideo,
      visibleVideo,
      show
    }
  },

  head: {}
})
</script>

<style lang="scss" scoped>
.animatedDirection {
  &.-right {
    .heading {
      transform: translateX(100%);
    }

    &--animated {
      .heading {
        animation: mymoveRight 1s;
        animation-fill-mode: both;
      }
    }
  }

  &.-left {
    .heading {
      transform: translateX(-100%);
    }

    &--animated {
      .heading {
        animation: mymoveLeft 1s;
        animation-fill-mode: both;
      }
    }
  }

  &.-bottomToTop {
    .imageBoxAnimated {
      transform: translateY(100px);
      opacity: 0;
    }

    &--animated {
      .imageBoxAnimated {
        animation: mymoveTop 1s;
        animation-fill-mode: both;
      }
    }
  }
}

.heading {
  &.-position {
    &--right {
      padding: $spacing_41x 0 0 calc((100% - #{$default_contents_W}) / 2 - 120px);

      @include mb() {
        padding: $spacing_20x 0 0 0;
      }
    }

    &--left {
      padding: $spacing_41x calc((100% - #{$default_contents_W}) / 2 - 120px) 0 0;

      @include mb() {
        padding: $spacing_20x 0 0 0;
      }
    }
  }
}

.video {
  &_text {
    padding-top: $spacing_10x;
    @include fz($font_size_standard);
    text-align: left;
    margin: 0;

    @include mb() {
      padding-top: $spacing_6x;
      @include fz($font_size_xsmall);
    }
  }
}

.imageBoxTop {
  position: relative;
  overflow: hidden;

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
    right: -145px;
    bottom: 31rem;
    z-index: 2;
    transform: rotate(-22.25deg);

    @include mb() {
      right: -50px;
      bottom: 94rem;
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
      right: -56px;
      bottom: 40rem;
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
    left: -145px;
    top: 20rem;
    z-index: 1;
    overflow: hidden;

    @include mb() {
      left: -370px;
      top: 145px;
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
      left: -180px;
      top: 160px;
    }

    @include screen(map-get($breakpoints, lg), map-get($breakpoints, xxxl)) {
      top: 240px;
    }
  }

  &_circleLively {
    position: absolute;
    right: -31.4rem;
    z-index: 3;
    top: -13rem;
    transform: translateY(28rem);

    @include mb() {
      right: -12rem;
      top: 45rem;
      transform: translateY(-16.5rem);
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
      top: 0;
      right: -32rem;
    }
  }
}

.imageBoxBottom {
  position: relative;
  overflow: hidden;

  &_flashIcon {
    position: absolute;
    left: -58px;
    top: 640px;
    z-index: 1;
    overflow: hidden;

    @include mb() {
      left: -320px;
      top: -80px;
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
      left: -180px;
      top: 160px;
    }

    @include screen(map-get($breakpoints, lg), map-get($breakpoints, xxxl)) {
      top: 240px;
    }
  }
}

.creatorSection {
  padding: $spacing_14x $spacing_6x $spacing_24x $spacing_50x;

  @include mb() {
    padding: $spacing_6x $spacing_4x $spacing_14x;
  }

  &_item {
    &:not(:last-child) {
      margin-bottom: $spacing_6x;

      @include mb() {
        margin-bottom: $spacing_14x;
      }
    }
  }
}

.figureCaptionListCreator {
  &:first-child {
    margin-bottom: -$spacing_24x;

    @include mb() {
      margin-bottom: -$spacing_7x;
    }
  }
}

.inquiryFormCreator {
  margin-top: $spacing_41x;

  @include mb() {
    margin-top: $spacing_20x;
  }
}
</style>
