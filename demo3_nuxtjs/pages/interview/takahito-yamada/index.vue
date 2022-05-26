<template>
  <DefaultLayout :title="$t('interview.name')" bg-color="whiteGradient">
    <!-- HERO IMAGE -->
    <section class="interview_heroSection">
      <img
        class="interview_heroSection_image"
        :src="require(`@/assets/images/creator/01/hero.webp`)"
        @load="onLoad"
      />
      <div class="interview_heroSection_heading" v-if="show">
        <TextMainVisual
          :id="`heroSection-title1`"
          type="heroTitle"
          :title="$t('interview.mainVisual.title1')"
        />
        <TextMainVisual
          :id="`heroSection-title2`"
          type="heroTitle"
          :title="$t('interview.mainVisual.title2')"
        />
      </div>
    </section>

    <!--  INTRODUCTION -->
    <article class="interview_article">
      <section class="interview_introduction">
        <h1 class="interview_introduction_title">{{ $t('interview.name') }}</h1>
        <div class="interview_introduction_subtitle">{{ $t('interview.position') }}</div>
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <MediaTextBlock
          class="slide-in-item"
          :title="$t('interview.qa[0].title')"
          :text="$t('interview.qa[0].description')"
          :image-path="require('@/assets/images/creator/01/image_01.webp')"
          reverse
        />
      </section>

      <section
        class="interview_mediaTextBlock --reverse"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <MediaTextBlock
          class="slide-in-item"
          :title="$t('interview.qa[1].title')"
          :text="$t('interview.qa[1].description')"
          :image-path="require('@/assets/images/creator/01/image_02.webp')"
        />
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <div class="interview_mediaTextBlock_contents slide-in-item">
          <MediaTextBlock
            class="slide-in-item"
            direction="horizontal"
            :text="$t('interview.qa[1].description2')"
          />
        </div>
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <div class="interview_mediaTextBlock_contents slide-in-item">
          <MediaTextBlock
            class="slide-in-item"
            direction="horizontal"
            :text="$t('interview.qa[1].description3')"
          />
        </div>
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <MediaTextBlock
          class="slide-in-item"
          :text="$t('interview.qa[1].description4')"
          :image-path="require('@/assets/images/creator/01/image_03.webp')"
          reverse
        />
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <div class="interview_mediaTextBlock_contents slide-in-item">
          <MediaTextBlock
            class="slide-in-item"
            direction="horizontal"
            :title="$t('interview.qa[2].title')"
            :text="$t('interview.qa[2].description')"
          />
        </div>
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <div class="interview_mediaTextBlock_contents slide-in-item">
          <MediaTextBlock
            class="slide-in-item"
            direction="horizontal"
            :text="$t('interview.qa[2].description2')"
          />
        </div>
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <div class="interview_mediaTextBlock_contents slide-in-item">
          <MediaTextBlock
            class="slide-in-item"
            direction="horizontal"
            :text="$t('interview.qa[2].description3')"
          />
        </div>
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <MediaTextBlock
          class="slide-in-item"
          reverse
          :text="$t('interview.qa[2].description4')"
          :image-path="require('@/assets/images/creator/01/image_04.webp')"
        />
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <MediaTextBlock
          class="slide-in-item"
          :text="$t('interview.qa[2].description5')"
          :image-path="require('@/assets/images/creator/01/image_05.webp')"
        />
      </section>

      <section
        class="interview_mediaTextBlock"
        v-observe-visibility="{
          callback: slideItems,
          intersection: { rootMargin: '50px' }
        }"
      >
        <div class="interview_mediaTextBlock_contents slide-in-item">
          <MediaTextBlock
            class="slide-in-item"
            direction="horizontal"
            :text="$t('interview.qa[2].description6')"
          />
        </div>
      </section>
    </article>

    <AnimatedBackground>
      <template #contents>
        <!-- USER PROFILE -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -left">
            <section class="interview_user heading">
              <UserProfile
                class="interview_user_item"
                :link="
                  localePath({
                    name: 'profile-workspace-id',
                    params: { id: workspaceDetail.id }
                  })
                "
                :thumbnail-url="
                  getAvatarThumbnailUrl(
                    workspaceDetail.thumbnailUrl,
                    imageSizes.userThumbnail.medium
                  )
                "
                :name="workspaceDetail.name"
                :description="workspaceDetail.description"
                :company-name="workspaceDetail.companyName"
                color="black"
              />
            </section>
          </div>
        </div>

        <!-- GALLERY SLIDER -->
        <div
          v-observe-visibility="{
            callback: visibilityChangedArrows,
            intersection: { rootMargin: '50px' }
          }"
        >
          <div class="animatedDirection -bottomToTop">
            <SectionContainer
              class="interview_gallery imageBoxAnimated"
              bg-color="black-gradient"
              columns="1"
              full-width
              container-size="full"
            >
              <template #column-1>
                <GallerySlider
                  v-if="spaceList.slice(0, 5).length > 0"
                  class="interview_gallery_top"
                  reverse
                  :sliders="spaceList.slice(0, 5)"
                />
                <GallerySlider
                  v-if="spaceList.slice(5, 10).length > 0"
                  class="interview_gallery_center is-pc"
                  :sliders="spaceList.slice(5, 10)"
                />
                <GallerySlider
                  v-if="spaceList.slice(10).length > 0"
                  class="interview_gallery_bottom is-pc"
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
      </template>
    </AnimatedBackground>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  useMeta,
  useContext,
  ref,
  reactive,
  useAsync,
  onMounted,
  useFetch,
  useRoute
} from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import TextMainVisual from '~/components/organisms/MainVisual/TextMainVisual.vue'
import UserProfile from '~/components/organisms/UserProfile/UserProfile.vue'
import AnimatedBackground from '~/components/atoms/AnimatedBackground/AnimatedBackground.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import GallerySlider from '~/components/organisms/Slider/GallerySlider/GallerySlider.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import MediaTextBlock from '~/components/molecules/MediaTextBlock/MediaTextBlock.vue'
// composables
import { handleScroll } from '~/composables/utilities/scroll'
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'
// types
import { I_SpaceListRequest } from '~/types/schema/space'
// constants
import { publishedStatusId } from '~/constants/spaces'
import { imageSizes } from '~/constants/image-size'
const LIMIT = 15
const TOTAL = 0
const PAGE = 1

export default defineComponent({
  name: 'Interview',

  components: {
    TextMainVisual,
    DefaultLayout,
    AnimatedBackground,
    UserProfile,
    SectionContainer,
    GallerySlider,
    LinkText,
    MediaTextBlock
  },

  setup() {
    const { app } = useContext()
    const route = useRoute()

    // Meta
    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('interview.mainVisual.title1')}${app.i18n.t(
      'interview.mainVisual.title2'
    )} | comony`
    meta.value = [
      {
        hid: 'description',
        name: 'description',
        content: app.i18n.t('interview.qa[0].description')
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('interview.mainVisual.title1')}${app.i18n.t(
          'interview.mainVisual.title2'
        )} | comony`
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: app.i18n.t('interview.qa[0].description')
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${app.$config.frontURL}${route.value.fullPath}`
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: require(`@/assets/images/creator/01/hero.webp`)
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('interview.mainVisual.title1')}${app.i18n.t(
          'interview.mainVisual.title2'
        )} | comony`
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: app.i18n.t('interview.qa[0].description')
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: require(`@/assets/images/creator/01/hero.webp`)
      }
    ]

    //  scroll to top after refresh
    onMounted(() => {
      window.scrollTo({ top: 0 })
    })

    // handle finish loading
    const show = ref(false)
    const onLoad = () => {
      show.value = true
    }

    // call space detail in ssr
    // 山田 貴仁氏 workspaceID='cpbpnd'
    const spaceList = ref([])
    const workspaceId = ref('cpbpnd')

    // -------------- [GET] space list belongs author's workspace --------------
    const fetchSpaceListBelogWorkspace = async () => {
      const spacesParams: I_SpaceListRequest = reactive({
        page: PAGE,
        sort: 'createdAt',
        publishedStatus: publishedStatusId.OPEN,
        direction: 'DESC',
        limit: LIMIT,
        workspaceId: workspaceId.value
      })

      await app
        .$repository('spaces')
        .getList(spacesParams)
        .then((response) => {
          spaceList.value = response.data.list
        })
        .catch((error) => {
          console.log(error)
        })
    }

    useFetch(fetchSpaceListBelogWorkspace)

    // -------------- fetch workspace details --------------
    const workspaceDetail = reactive({
      id: '',
      name: '',
      thumbnailUrl: '',
      companyName: '',
      companyUrl: '',
      description: ''
    })

    const fetchWorkspaceDetail = async () => {
      await app
        .$repository('workspaces')
        .getWorkspacesDetailsPublic(workspaceId.value)
        .then((response) => {
          workspaceDetail.id = response.data.id
          workspaceDetail.name = response.data.name
          workspaceDetail.thumbnailUrl = response.data.thumbnailUrl
          workspaceDetail.companyName = response.data.companyName
          workspaceDetail.companyUrl = response.data.companyUrl
          workspaceDetail.description = response.data.description
        })
        .catch((error) => {
          console.log(error)
        })
    }

    useFetch(fetchWorkspaceDetail)

    // animation
    const { slideItems, visibilityChangedArrows } = handleScroll()

    // get user avatar
    const { getAvatarThumbnailUrl } = useCreateThumbnailPath()

    return {
      onLoad,
      show,
      workspaceDetail,
      spaceList,
      slideItems,
      visibilityChangedArrows,
      imageSizes,
      getAvatarThumbnailUrl
    }
  },

  head: {}
})
</script>

<style scoped lang="scss">
.interview {
  // hero
  &_heroSection {
    position: relative;
    width: 100%;
    overflow: hidden;

    @include pc() {
      height: 743px;
    }

    @include mb() {
      height: 421px;
    }

    &_image {
      position: absolute;
      z-index: 1;
      top: 0;
      width: 100%;
      height: 100%;

      object-fit: cover;
    }

    &_heading {
      z-index: 3;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      color: $color_white;

      @include pc() {
        max-width: 1440px;
        margin: 0 auto 0 3.2%;
        padding: 0 $spacing_8x;
      }

      @include mb() {
        padding: 0 $spacing_4x;
        max-width: 90%;
      }

      p {
        font-weight: $font_weight_bold;
        line-height: inherit;
        padding: 0;
        margin: 0;

        @include pc() {
          @include fz($font_size_hero);
        }

        @include mb() {
          @include fz($font_size_hero_mb);
        }
      }
    }
  }

  // introduction
  &_introduction {
    color: $color_gray_1000;
    max-width: $interview_contents_W;
    margin: auto;
    padding: $spacing_14x 0 $spacing_16x;

    @include mb() {
      padding: $spacing_6x 0;
    }

    &_title {
      font-weight: $font_weight_black;
      @include fz($font_size_xlarge);
      margin-bottom: $spacing_4x;

      @include mb() {
        font-weight: $font_weight_bold;
        @include fz($font_size_xlarge_mb);
        margin-bottom: $spacing_8x;
      }
    }

    &_subtitle {
      font-weight: $font_weight_black;
      @include fz($font_size_xxxl);

      @include mb() {
        font-weight: $font_weight_bold;
        @include fz($font_size_s);
      }
    }

    &_description {
      font-weight: $font_weight_normal;
      @include fz($font_size_standard);
      line-height: $line_height_article;
      letter-spacing: normal;
      margin: 0;

      @include mb() {
        @include fz($font_size_xsmall);
      }
    }
  }

  // article
  &_article {
    max-width: $interview_contents_W;
    margin: 0 auto;

    @include mb() {
      padding: 0 $spacing_4x;
    }
  }

  // user
  &_user {
    background: $color_white;
    padding: $spacing_14x $spacing_30x $spacing_14x calc((100% - #{$interview_contents_W}) / 2);
    margin: $spacing_31x calc((100% - #{$interview_contents_W}) / 2 - #{$spacing_30x}) 0 0;

    @include max-screen(map-get($breakpoints, lg)) {
      padding: $spacing_6x;
    }

    @include mb() {
      padding: $spacing_6x $spacing_4x;
      margin: $spacing_20x 0 0 0;
    }

    &_item {
      /deep/ & .userProfile_head {
        @include mb() {
          margin-bottom: $spacing_8x;
        }
      }
    }
  }

  // gallery
  &_gallery {
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
}
</style>
