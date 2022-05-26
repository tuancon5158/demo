<template>
  <div class="squareLively">
    <svg
      class="squareLively_svg"
      :class="classTypes"
      viewBox="0 0 502 502"
      :style="{ transform: `rotate(${numScroll}deg)` }"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          x="2"
          y="2"
          width="470"
          height="470"
          stroke="white"
          stroke-width="4"
          stroke-dasharray="4 5"
        />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@nuxtjs/composition-api'
// props type
interface I_SquareProps {
  animated: boolean
  type: string
}

export default defineComponent({
  name: 'SquareLively',
  props: {
    animated: {
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

  setup(props: I_SquareProps) {
    const numScroll = ref<number>(0)

    const classTypes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type
      }
    })

    let timer: null | ReturnType<typeof setTimeout>
    const FPS: number = 1000 / 50
    const handleAnimation = () => {
      let lastScrollTop = 0
      const delta = 5

      if (timer) clearTimeout(timer)

      timer = setTimeout(function () {
        timer = null
        const nowScrollTop = window.scrollY

        if (Math.abs(lastScrollTop - nowScrollTop) >= delta) {
          if (nowScrollTop > lastScrollTop) {
            numScroll.value += 1
          } else {
            numScroll.value -= 1
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
      numScroll,
      classTypes
    }
  }
})
</script>

<style lang="scss" scoped>
.squareLively {
  &_svg {
    transition: transform 1.3s;
    will-change: transform;

    &.-type {
      &--default {
        width: 440px;
        height: 440px;
        @include mb() {
          width: 174px;
          height: 174px;
        }

        @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
          width: 200px;
          height: 200px;
        }

        @include screen(map-get($breakpoints, lg), map-get($breakpoints, xxxl)) {
          width: 300px;
          height: 300px;
        }
      }
    }
  }
}
</style>
