<template>
  <section class="imageBox">
    <div
      v-observe-visibility="{
        callback: visibilityChanged,
        once: false
      }"
    >
      <div class="imageBox_wrapper">
        <img
          v-if="src"
          :id="id"
          v-lazy="require(`~/assets/images/${src}`)"
          :alt="title"
          width="1440"
          height="996"
        />
      </div>
      <div
        v-observe-visibility="{
          callback: visibilityChangedImageBoxContent,
          once: false,
          throttle: 50,
          throttleOptions: {
            leading: 'visible'
          },
          intersection: { rootMargin: '300px' }
        }"
      >
        <div class="slideItems" :class="directionClasses">
          <div v-if="visibleImageBoxContent" class="imageBox_content box" :class="classes">
            <div v-if="title" class="imageBox_first">
              <div v-if="number" class="imageBox_first_line">
                <h2 class="imageBox_first_number">{{ number }}</h2>
                <div class="imageBox_first_forwardSlash"></div>
              </div>

              <TextMainVisual
                v-if="visibleText"
                :id="`title-image-box-${id}`"
                class="imageBox_first_title"
                type="imageBoxTitle"
                :title="title"
              />
            </div>

            <div v-if="description" class="imageBox_second">
              <p v-html="description"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent, SetupContext } from '@nuxtjs/composition-api'
import TextMainVisual from '~/components/organisms/MainVisual/TextMainVisual.vue'
import { handleScroll } from '~/composables/utilities/scroll'

interface I_ImageBoxProps {
  id: string
  src: string
  number: string
  title: string
  position: string
  description: string
}

export default defineComponent({
  name: 'ImageBox',

  components: {
    TextMainVisual
  },

  props: {
    id: {
      type: String,
      required: true
    },
    src: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['left', 'right'].includes(value)
      }
    },
    description: {
      type: String,
      default: ''
    }
  },

  setup(props: I_ImageBoxProps, context: SetupContext) {
    const classes = computed(() => {
      return {
        [`-position--${props.position}`]: props.position,
        [`-hasNumber`]: !props.number
      }
    })

    const directionClasses = computed(() => {
      return {
        [`-${props.position}Side`]: props.position
      }
    })

    // handle emit scale image
    const visibilityChanged = (isVisible: boolean) => {
      context.emit('onVisibilityChanged', isVisible, props.id)
    }

    // animation for content box, text
    const { visibilityChangedImageBoxContent, visibleImageBoxContent, visibleText } = handleScroll()

    return {
      classes,
      visibilityChanged,
      visibilityChangedImageBoxContent,
      visibleText,
      visibleImageBoxContent,
      directionClasses
    }
  }
})
</script>

<style lang="scss" scoped>
$imageBox_max_H: 996px;

.imageBox {
  position: relative;
  overflow: hidden;

  &_wrapper {
    width: 100%;
    height: auto;
    max-height: $imageBox_max_H;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transform: scale(1.3);
      animation-fill-mode: both;
    }

    &_animated {
      animation: myscale 2s ease-in-out;
    }
  }

  &_content {
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 67%;
    background: $color_black_gradien_opacity;

    @include mb() {
      position: relative;
      width: auto;
      height: auto;
    }

    @include screen(map-get($breakpoints, md), map-get($breakpoints, lg)) {
      width: 86%;
    }

    &.-position {
      &--left {
        left: 0;
        padding: $spacing_8x $spacing_14x $spacing_24x calc((100% - #{$default_contents_W}) / 2);

        @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
          padding: $spacing_7x $spacing_7x $spacing_7x $spacing_20x;
        }

        @include mb() {
          padding: $spacing_4x$spacing_4x $spacing_14x $spacing_4x;
        }
      }

      &--right {
        right: 0;
        padding: $spacing_8x calc((100% - #{$default_contents_W}) / 2) $spacing_24x $spacing_14x;

        @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
          padding: $spacing_7x $spacing_20x $spacing_7x $spacing_7x;
        }

        @include mb() {
          padding: $spacing_4x $spacing_4x $spacing_14x $spacing_4x;
        }
      }
    }
  }

  &_first {
    display: flex;
    align-items: center;

    &_number {
      font-weight: $font_weight_light;
      line-height: 1;
      color: $color-white;
      @include fz($font_size_xxxlarge);

      @include mb() {
        @include fz($font_size_xxxlarge_mb);
        width: 80px;
        text-align: center;
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
        @include fz($font_size_xxlarge);
      }
    }

    &_line {
      display: flex;
      align-items: center;

      @include mb() {
        margin-right: $spacing_2x;
      }
    }

    &_forwardSlash {
      position: relative;
      width: 130px;
      height: 0;
      left: -12px;
      top: 12px;
      border-top: 1px solid $color-white;
      transform: rotate(120deg);

      @include mb() {
        display: none;
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
        width: 57px;
        left: -10px;
        top: 2px;
      }
    }

    &_title {
      color: $color-white;
      font-weight: $font_weight_bold;
      margin: $spacing_8x 0 0 0;
      position: relative;
      @include fz($font_size_large);

      @include max-screen(map-get($breakpoints, xl)) {
        margin-top: $spacing_2x;
        @include fz($font_size_standard);
      }

      // custom number
      &.-hasNumber {
        left: -32px;
        top: 12px;
        margin: 0;

        @include mb() {
          left: 0;
        }

        @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
          @include fz($font_size_standard);
          left: -14px;
          top: 2px;
        }
      }
    }
  }

  &_second {
    margin-top: $spacing_4x;

    @include mb() {
      margin-top: $spacing_6x;
    }

    // custom number
    &.-hasNumber {
      margin-top: $spacing_5x;

      @include mb() {
        margin-top: $spacing_6x;
      }
    }

    p {
      color: $color-white;
      margin: 0;
      @include fz($font_size_standard);
      line-height: 1.8;

      @include mb() {
        @include fz($font_size_xsmall);
      }

      @include screen(map-get($breakpoints, md), map-get($breakpoints, xl)) {
        @include fz($font_size_small);
      }
    }
  }
}

@keyframes myscale {
  from {
    transform: scale(1.3);
  }
  to {
    transform: scale(1);
  }
}

// slide from left / right
.slideItems {
  &.-rightSide {
    .box {
      transform: translateX(100%);
    }
    &.--animated {
      .box {
        animation: mymoveRight 0.5s;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out;
      }
    }
  }

  &.-leftSide {
    .box {
      transform: translateX(-100%);
    }

    &.--animated {
      .box {
        animation: mymoveLeft 0.5s;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out;
      }
    }
  }
}
</style>
