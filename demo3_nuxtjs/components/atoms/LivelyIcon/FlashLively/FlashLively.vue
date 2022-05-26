<template>
  <div class="flashLively" :class="classes">
    <div class="flashLively_shootingStar flashLively_shootingStar--dashed"></div>
    <div class="flashLively_shootingStar flashLively_shootingStar--line -dotted"></div>
    <div class="flashLively_shootingStar flashLively_shootingStar--line"></div>
    <div class="flashLively_shootingStar"></div>
    <div class="flashLively_shootingStar flashLively_shootingStar--line"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export interface FlashLivelyProps {
  animated: boolean
}

export default defineComponent({
  name: 'FlashLively',

  props: {
    animated: {
      type: Boolean,
      default: true
    }
  },

  setup(props: FlashLivelyProps) {
    const classes = computed(() => {
      return {
        [`--animated`]: props.animated
      }
    })

    return {
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
$shooting-time: 1000ms;

.flashLively {
  position: relative;
  width: 640px;
  height: 320px;
  transform: rotateZ(-45deg);
  opacity: 0.85;

  @include mb() {
    width: 240px;
    height: 360px;
  }

  &.--animated {
    div {
      width: 0;
      animation: tail $shooting-time ease-in-out infinite both,
        shooting $shooting-time ease-in-out infinite both;

      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          // $delay: random(9999) + 0ms;
          top: calc(50% - #{$i * 120px});
          left: calc(50% - #{$i * 10px});
          animation-delay: $i * 3000ms;
          opacity: 0.7;

          &::before,
          &::after {
            animation-delay: $i * 2000ms;
          }
        }
      }

      &:nth-child(4) {
        top: -35%;
        left: 75%;
        animation-delay: 500ms;
        &::before,
        &::after {
          animation-delay: 100ms;
        }
      }

      &:nth-child(5) {
        top: -10%;
        left: 92%;
        animation-delay: 300ms;

        &::before,
        &::after {
          animation-delay: 100ms;
        }
      }
    }
  }

  &_shootingStar {
    position: absolute;
    left: 50%;
    top: 50%;
    border-style: solid;
    border-color: $color-white;
    border-width: 2px;
    width: 200px;
    box-shadow: 0 0 5px 1px $color_white, 0 0 5px 1px $color_white inset;

    &--dashed {
      box-shadow: none;
      border: 0;
      border-top: 5px dotted $color_white;
    }

    &--line {
      border-width: 1px;
      box-shadow: none;

      &.-dotted {
        border-width: 2px;

        &::after,
        &::before {
          content: '・';
          width: 2px;
          height: 2px;
          font-size: 30px;
          color: $color_white;
          position: absolute;
        }

        &::after {
          right: 0;
          bottom: 20px;
        }

        &::before {
          right: -10px;
          bottom: 20px;
        }
      }
    }
  }
}

@keyframes tail {
  0% {
    width: 0;
  }

  30% {
    width: 200px;
  }

  100% {
    width: 0;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(450px);
  }
}
</style>
