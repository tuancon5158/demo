<template>
  <div class="circleLively" :class="{ '--animated': visibleAnimated }">
    <svg
      class="circleLively_svg"
      :class="classTypes"
      viewBox="0 0 502 502"
      :style="{ transform: `rotate(${numScroll}deg) scale(${numScrollScale})` }"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle
          cx="251"
          cy="251"
          r="249"
          stroke="white"
          stroke-width="4"
          stroke-dasharray="4 5"
        ></circle>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@nuxtjs/composition-api'
const SCALE_NUMBER_MIN = 0.7
const SCALE_NUMBER_MAX = 1
const SCALE_NUMBER = 0.01

export interface I_CircleLivelyProps {
  animated: boolean
  visibleAnimated: boolean
  type: string
}

export default defineComponent({
  name: 'CircleLively',

  props: {
    animated: {
      type: Boolean,
      default: true
    },
    visibleAnimated: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default'].includes(value)
      }
    }
  },

  setup(props: I_CircleLivelyProps) {
    const numScroll = ref<number>(0)
    const numScrollScale = ref<number>(SCALE_NUMBER_MIN)

    const classTypes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type
      }
    })

    const parseFloatToFixed = (number: number) => {
      return parseFloat(Number(number).toFixed(2))
    }

    let timer: null | ReturnType<typeof setTimeout>
    const FPS: number = 1000 / 60
    const handleAnimation = () => {
      if (timer) clearTimeout(timer)
      let lastScrollTop = 0
      const delta = 5

      timer = setTimeout(function () {
        timer = null
        const nowScrollTop = window.scrollY

        if (Math.abs(lastScrollTop - nowScrollTop) >= delta) {
          if (nowScrollTop > lastScrollTop) {
            numScroll.value += 1

            if (
              parseFloatToFixed(numScrollScale.value) >= SCALE_NUMBER_MIN &&
              parseFloatToFixed(numScrollScale.value) <= SCALE_NUMBER_MAX
            ) {
              if (parseFloatToFixed(numScrollScale.value) !== SCALE_NUMBER_MAX) {
                numScrollScale.value = parseFloatToFixed(numScrollScale.value) + SCALE_NUMBER
              }
            }
          } else {
            numScroll.value -= 1

            if (
              parseFloatToFixed(numScrollScale.value) >= SCALE_NUMBER_MIN &&
              parseFloatToFixed(numScrollScale.value) <= SCALE_NUMBER_MAX
            ) {
              if (parseFloatToFixed(numScrollScale.value) !== SCALE_NUMBER_MIN) {
                numScrollScale.value = parseFloatToFixed(numScrollScale.value) - SCALE_NUMBER
              }
            }
          }

          lastScrollTop = nowScrollTop
        }
      }, FPS)
    }

    if (process.client) {
      document.addEventListener('scroll', handleAnimation, { passive: true })
    }

    // watch(
    //   () => props.animated,
    //   (curr) => {
    //     if (curr) {
    //       handleAnimation()
    //     }
    //   }
    // )

    return {
      classTypes,
      numScroll,
      numScrollScale
    }
  }
})
</script>

<style lang="scss" scoped>
.circleLively {
  &.--animated {
    & svg {
      animation: rotate 10s infinite;
    }
  }

  &_svg {
    transition: transform 1.3s;
    will-change: transform;

    &.-type {
      &--default {
        width: 480px;
        height: 480px;

        @include mb() {
          width: 174px;
          height: 174px;
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg) scale(1);
  }

  70% {
    transform: rotateZ(-180deg) scale(0.75);
  }

  100% {
    transform: rotateZ(-360deg) scale(1);
  }
}
</style>
