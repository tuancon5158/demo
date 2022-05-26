<template>
  <div
    class="mainVisual"
    v-observe-visibility="{
      callback: visibilityMainVisual
    }"
  >
    <div class="mainVisual_inner">
      <div class="mainVisual_heading">
        <TextMainVisual id="title1" type="heading" :title="$t('mainVisual.title1')" />
        <TextMainVisual id="title2" type="heading" :title="$t('mainVisual.title2')" />
        <TextMainVisual
          id="subTitle"
          type="subTitle"
          title="Designing the future by the architectural metaverse."
        />
      </div>
      <MainVisualSlider
        class="mainVisual_inner_bannerLeft"
        :style="{ transform: `translate3d(0px, -${leftImage}px, 0px )` }"
        :mainVisualImage="[
          {
            image: 'main-visual01.png',
            title: 'demo1'
          },
          {
            image: 'demo1.jpg',
            title: 'demo1'
          },
          {
            image: 'demo2.jpg',
            title: 'demo2'
          },
          {
            image: 'demo5.jpg',
            title: 'demo5'
          }
        ]"
      />
      <MainVisualSlider
        type="center"
        class="mainVisual_inner_bannerCenter"
        :style="{ transform: `translate3d(0px, -${centerImage}px, 0px)!important` }"
        :mainVisualImage="[
          {
            image: 'main-visual02.png',
            title: 'demo3'
          },
          {
            image: 'demo3.jpg',
            title: 'demo3'
          },
          {
            image: 'demo4.jpg',
            title: 'demo4'
          },
          {
            image: 'demo6.jpg',
            title: 'demo6'
          }
        ]"
      />
      <div
        class="mainVisual_inner_bannerRight"
        :style="{ transform: `translate3d(0px, -${rightImage}px, 0px)!important` }"
      >
        <div class="mainVisual_inner_bannerRight_inner">
          <AppLogo
            class="mainVisual_inner_logo"
            size="medium"
            direction="vertical"
            icon-color="#fff"
          />
          <TextMainVisual
            id="title3"
            type="title"
            title="建築メタバースプラットフォーム"
            position="center"
          />
          <div class="mainVisual_inner_description">
            <TextMainVisual
              id="description1"
              title="様々な建築空間を仮想空間内に構築することで 近未来のコンセプトを形にします。"
            />
            <br />
            <TextMainVisual
              id="description3"
              title="また、友達と仮想空間に入って交流したりイベントに参加したり、未来の都市空間を一足先に体験することもできます。"
            />
            <br />
            <TextMainVisual
              id="description6"
              title="comonyの建築メタバースを通して過去から現在そして未来へと時空を越えた体験を提供します。"
            />
          </div>
          <AppDownloadButton class="mainVisual_inner_appDownload" />
        </div>
      </div>
      <CircleLively visible-animated class="mainVisual_inner_circleLively" />
      <CTAButton
        class="mainVisual_inner_button"
        type="default"
        label="今すぐ体験する"
        icon
        icon-color="black"
        :link="localePath('spaces')"
      />
    </div>
    <span
      v-for="(item, index) in mainVisualImage"
      :key="index"
      class="mainVisual_wrap"
      :class="{ '-showing': currentMainVisImageIndex === index }"
    >
      <picture>
        <img
          v-lazy="require(`~/assets/images/${item.image}`)"
          media="(max-width: 767px)"
          :alt="item.title"
          decoding="async"
          :loading="index > 0 ? 'lazy' : false"
        />
      </picture>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from '@nuxtjs/composition-api'
import TextMainVisual from './TextMainVisual.vue'
import MainVisualSlider from './MainVisualSlider.vue'
import AppLogo from '~/components/atoms/AppLogo/AppLogo.vue'
import AppDownloadButton from '~/components/atoms/Button/AppDownloadButton.vue'
import CTAButton from '~/components/atoms/Button/CTAButton.vue'
import CircleLively from '~/components/atoms/LivelyIcon/CircleLively/CircleLively.vue'

// MainVisualListImage type
interface I_MainVisualListImage {
  title: string
  image: string
}

interface I_MainVisual {
  mainVisualImage: I_MainVisualListImage[]
}

export default defineComponent({
  name: 'MainVisual',

  components: {
    TextMainVisual,
    AppLogo,
    AppDownloadButton,
    CTAButton,
    CircleLively,
    MainVisualSlider
  },

  props: {
    mainVisualImage: {
      type: Array as PropType<I_MainVisualListImage[]>,
      required: true
    }
  },

  setup(props: I_MainVisual) {
    // const { $config } = context.root
    const currentMainVisImageIndex = ref(0)

    const setSlideImageIndex = () => {
      if (currentMainVisImageIndex.value < props.mainVisualImage.length - 1) {
        currentMainVisImageIndex.value += 1
      } else {
        currentMainVisImageIndex.value = 0
      }
    }

    const loopSlideImage = (loopTime) => {
      setInterval(() => {
        setSlideImageIndex()
      }, loopTime)
    }

    onMounted(() => {
      loopSlideImage(1000)

      const bannerLeft = document.querySelector('.mainVisual_inner_bannerLeft')
      const bannerCenter = document.querySelector('.mainVisual_inner_bannerCenter')
      const bannerRight = document.querySelector('.mainVisual_inner_bannerRight')

      setTimeout(() => {
        bannerLeft?.classList.add('mainVisual_inner_bannerLeft--animated')
        bannerCenter?.classList.add('mainVisual_inner_bannerCenter--animated')
        bannerRight?.classList.add('mainVisual_inner_bannerRight--animated')
      }, 500)
    })

    const centerImage = ref<number>(0)
    const leftImage = ref<number>(0)
    const rightImage = ref<number>(0)

    let timer: null | ReturnType<typeof setTimeout> = null
    const FPS: number = 0
    const handleAnimation = () => {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        const value = window.scrollY

        if (value < 1700) {
          let numImageTop = 0
          centerImage.value = numImageTop + value / 5
          leftImage.value = numImageTop + value / 7
          rightImage.value = numImageTop + value / 10
        } else {
          timer = null
        }
      }, FPS)
    }

    const visibilityMainVisual = (isVisible: boolean, entry) => {
      if (isVisible) {
        document.addEventListener('scroll', handleAnimation, { passive: true })
      } else {
        document.removeEventListener('scroll', handleAnimation)
      }
    }

    return {
      visibilityMainVisual,
      currentMainVisImageIndex,
      centerImage,
      leftImage,
      rightImage
    }
  }
})
</script>

<style lang="scss" scoped>
.mainVisual {
  width: 100%;
  position: relative;
  background-color: $color_gray_400;
  overflow: hidden;

  @include pc() {
    height: 147.9rem;
  }

  @include mb() {
    height: 127.3rem;
  }

  &_inner {
    position: relative;
    height: 100%;
    padding: 0 $spacing_8x;
    margin: 0 auto;

    @include mb() {
      padding: 0 $spacing_4x;
      word-break: break-all;
    }

    &_bannerLeft {
      &--animated {
        transform: translate(0, 50px);
        animation: bottomToTop1 1.5s both;
      }
    }

    &_bannerCenter {
      &--animated {
        transform: translate(0, 50px);
        animation: bottomToTop2 1.5s both;
      }
    }

    &_bannerRight {
      width: 59rem;
      position: absolute;
      top: calc(100% - 950px);
      z-index: 2;
      right: 0;
      background: $color_black_gradient;
      padding: $spacing_14x $spacing_14x $spacing_24x;
      opacity: 0;

      &--animated {
        transform: translate(0, 50px);
        animation: bottomToTop 1.5s both;
      }

      @include max-screen(map-get($breakpoints, xs)) {
        max-width: 36rem;
        width: calc(100% - #{$spacing_4x});
        padding: $spacing_10x $spacing_8x $spacing_9x;
      }

      @include ipad() {
        width: 95%;
        padding: $spacing_13x $spacing_9x $spacing_14x;
      }

      @include mb() {
        top: calc(100% - 681px);
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
        width: 45rem;
      }

      @include screen(map-get($breakpoints, lg), map-get($breakpoints, xl)) {
        width: 52rem;
      }

      &_inner {
        max-width: 41.5rem;
      }
    }

    &_logo {
      margin-bottom: $spacing_10x;
      opacity: 0;
      transform: translate(0, 50px);
      animation: bottomToTop2 1.5s both;

      justify-content: center;
      width: 90%;

      @include mb() {
        padding-left: 0;
        display: flex !important;
        justify-content: center;
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
        padding-left: 0;
        display: flex !important;
        justify-content: center;
      }
    }

    &_description {
      margin: 0;
      margin-bottom: $spacing_14x;
      line-height: 1.75;

      @include pc() {
        max-width: 41.5rem;
      }

      @include mb() {
        margin-bottom: $spacing_8x;
      }
    }

    &_appDownload {
      margin-left: -$spacing_1x;

      @include mb() {
        margin-left: 0;
      }
    }

    &_button {
      position: absolute !important;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, -9.6rem);

      @include mb() {
        transform: translate(-50%, -5.6rem);
      }
    }

    &_circleLively {
      position: absolute;
      left: -11.4rem;
      z-index: 3;
      top: 50%;
      transform: translateY(28rem);

      @include mb() {
        left: -5rem;
        transform: translateY(-16.5rem);
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
        top: 45%;
      }
    }
  }

  &_heading {
    position: relative;
    max-width: $default_contents_W_large;
    margin: 0 auto;
    margin-left: 3.2%;
    top: $spacing_42x;
    z-index: 1;
    display: block;

    @include max-screen(map-get($breakpoints, md)) {
      top: $spacing_30x;
      padding: 0 $spacing_4x;
      margin: 0 auto;
      @include fz($font_size_heading4);
      left: 0;
    }
  }

  &_wrap {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    transition: all 1.6s ease-in-out;

    &.-showing {
      opacity: 1;
    }

    @include mb() {
      width: 100%;
    }

    img,
    source {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@keyframes bottomToTop {
  0% {
    transform: translate(0, 50px);
  }

  100% {
    transform: translate(0);
    opacity: 1;
  }
}

@keyframes bottomToTop1 {
  0% {
    // transform: translateY(50px);
    top: calc(100% - 780px);
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    // transform: translateY(0);
    top: calc(100% - 880px);
    opacity: 1;
  }
}

@keyframes bottomToTop2 {
  0% {
    transform: translate(0, 50px);
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
