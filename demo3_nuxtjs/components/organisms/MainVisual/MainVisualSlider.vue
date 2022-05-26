<template>
  <div class="mainVisualSlider" :class="classes">
    <img
      v-for="(item, index) in mainVisualImage"
      :key="index"
      v-lazy="require(`~/assets/images/${item.image}`)"
      :class="[
        currentBannerImageIndex === index ? '-showing' : '',
        currentBannerImageIndex - 1 === index ||
        (currentBannerImageIndex === 0 && mainVisualImage.length - 1 === index)
          ? '-prev'
          : '',
        currentBannerImageIndex + 1 === index ||
        (currentBannerImageIndex === mainVisualImage.length - 1 && index === 0)
          ? '-next'
          : ''
      ]"
      :alt="item.title"
      decoding="async"
      :loading="index > 0 ? 'lazy' : false"
      :width="type === 'left' ? '354' : '754'"
      :height="type === 'left' ? '354' : '484'"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref
} from '@nuxtjs/composition-api'

// MainVisualListImage type
interface I_MainVisualListImage {
  title: string
  image: string
}

interface I_MainVisual {
  mainVisualImage: I_MainVisualListImage[]
  type: String
}

export default defineComponent({
  name: 'MainVisualSlider',

  props: {
    mainVisualImage: {
      type: Array as PropType<I_MainVisualListImage[]>,
      default: () => [
        {
          image: 'gallery_bg1.png',
          title: '過去と未来を創る建築メタバースの世界へ'
        },
        {
          image: 'main-visual01.png',
          title: '過去と未来を創る建築メタバースの世界へ'
        },
        {
          image: 'main-visual02.png',
          title: '過去と未来を創る建築メタバースの世界へ'
        },
        {
          image: 'main-visual01.png',
          title: '過去と未来を創る建築メタバースの世界へ'
        }
      ]
    },
    type: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['left', 'center'].includes(value)
      }
    }
  },

  setup(props: I_MainVisual) {
    let timer: null | ReturnType<typeof setTimeout>
    let timerInterval: null | ReturnType<typeof setInterval> = null
    const currentBannerImageIndex = ref(0)

    const setSlideBannerLeftImageIndex = () => {
      if (currentBannerImageIndex.value < props.mainVisualImage.length - 1) {
        currentBannerImageIndex.value += 1
      } else {
        currentBannerImageIndex.value = 0
      }
    }

    const loopSlideBannerLeftImage = (loopTime: number) => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }

      timerInterval = setInterval(() => {
        setSlideBannerLeftImageIndex()
      }, loopTime)
    }

    onMounted(() => {
      if (timer) {
        clearTimeout(timer)
      }

      if (props.type === 'left') {
        timer = setTimeout(() => {
          loopSlideBannerLeftImage(4000)
        }, 3000)
      } else {
        timer = setTimeout(() => {
          loopSlideBannerLeftImage(6500)
        }, 1000)
      }
    })

    onUnmounted(() => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }

      if (timer) {
        clearTimeout(timer)
      }
    })

    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type
      }
    })

    return {
      currentBannerImageIndex,
      classes
    }
  }
})
</script>
<style lang="scss" scoped>
.mainVisualSlider {
  &.-type {
    &--left {
      width: 34.5rem;
      height: 34.5rem;
      object-fit: cover;
      top: calc(100% - 880px);
      position: absolute;
      z-index: 2;
      left: 0;
      overflow: hidden;
      opacity: 0;

      img {
        height: 100%;
        object-fit: cover;
        width: calc(100% + 100px);
        clip: rect(0 calc(100vw + 100px) 100vh -100px);
        background: 50% 50% / cover;
        position: absolute;
        top: 0;
        left: 0;

        &.-showing {
          z-index: 2;
          transform: translateX(-100px);
          clip: rect(0 0 100vh 0);
          transition: transform 10s linear, clip 2.5s cubic-bezier(0.19, 1, 0.22, 1) 2.5s;
          will-change: transform;
        }

        &.-next {
          z-index: 1;
          transform: translateX(-50px);
          transition: transform 10s linear;
          will-change: transform;
        }
      }

      @include mb() {
        width: 14.6rem;
        height: 14.6rem;
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
        width: 25.5rem;
        height: 25.5rem;
      }

      @include screen(map-get($breakpoints, lg), map-get($breakpoints, xl)) {
        width: 25.5rem;
        height: 25.5rem;
      }
    }

    &--center {
      width: 75.4rem;
      height: 48.4rem;
      object-fit: cover;
      top: calc(100% - 744px);
      position: absolute;
      z-index: 1;
      left: 20.2rem;
      overflow: hidden;
      opacity: 0;

      img {
        height: 100%;
        object-fit: cover;
        width: calc(100% + 100px);
        clip: rect(0 calc(100vw + 100px) 100vh -100px);
        background: 50% 50% / cover;
        position: absolute;
        top: 0;
        right: 0;

        &.-showing {
          // transform: translateX(0);
          z-index: 2;
          transform: translateX(100px);
          clip: rect(0 100vh 100vh 100vw);
          transition: transform 6s linear, clip 5.46s cubic-bezier(0.19, 1, 0.22, 1) 5.46s;
          will-change: transform;
        }

        &.-next {
          z-index: 1;
          transform: translateX(50px);
          transition: transform 10s linear;
          will-change: transform;
        }
      }

      @include mb() {
        width: 25.2rem;
        height: 16.37rem;
        left: 10rem;
        top: calc(100% - 825px);
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
        width: 40rem;
        height: 25.986rem;
        left: 9.2rem;
        top: calc(100% - 680px);
      }

      @include screen(map-get($breakpoints, lg), map-get($breakpoints, xl)) {
        width: 47rem;
        height: 30.533rem;
        left: 9.2rem;
        top: calc(100% - 680px);
      }

      @include screen(map-get($breakpoints, xl), map-get($breakpoints, xxxl)) {
        width: 49.4rem;
        height: 32.092rem;
        top: calc(100% - 760px);
        left: 24.2rem;
      }

      // @include screen(map-get($breakpoints, xxl), map-get($breakpoints, xxxl)) {
      //   width: 65rem;
      //   height: 32.228rem;
      //   top: calc(100% - 644px);
      //   left: 25.2rem;
      // }
    }
  }
}
</style>
