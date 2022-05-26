<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="mediaTextBlock" :class="[{ '-reverse': reverse }, classes]">
    <div v-if="imagePath" class="mediaTextBlock_image">
      <img :alt="title" v-lazy="imagePath" />
    </div>
    <div class="mediaTextBlock_text">
      <div class="mediaTextBlock_title">{{ title }}</div>
      <p class="mediaTextBlock_phrase" v-html="text" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

// props type
type MediaTextBlockProps = {
  imagePath: string
  reverse: boolean
  direction: string
  title: string
  text: string
}

export default defineComponent({
  name: 'MediaTextBlock',

  props: {
    imagePath: {
      type: String,
      default: ''
    },
    reverse: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: (value: string) => {
        return ['vertical', 'horizontal'].includes(value)
      }
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    }
  },

  setup(props: MediaTextBlockProps) {
    const classes = computed(() => {
      return {
        [`-direction--${props.direction}`]: props.direction
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
$Vertical_Image_maxH: 578px;
$Horizontal_Image_maxH: 689px;

.mediaTextBlock {
  margin: 0 auto $spacing_14x;

  @include mb() {
    margin-bottom: $spacing_4x;
  }

  &_image {
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &.-direction {
    &--vertical {
      // @include max-screen(map-get($breakpoints, xxxl)) {
      //   max-width: $interview_contents_W_medium;
      // }

      @include pc() {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      @include mb() {
        max-width: 100%;
      }

      &::after {
        content: '';
        display: block;
        clear: both;
      }

      .mediaTextBlock_image {
        flex: 0 0 auto;
        max-width: 50%;

        @include mb() {
          float: left;
          margin-right: $spacing_4x;
        }

        @include pc() {
          margin-right: 4%;
        }

        @include min-screen(map-get($breakpoints, xxxl)) {
          margin-right: $spacing_20x;
        }

        img {
          @include pc() {
            max-height: $Vertical_Image_maxH;
          }
        }
      }

      .mediaTextBlock_text {
        text-align: left;

        // @include pc() {
        //   width: 50%;
        // }

        @include mb() {
          width: 100%;
        }

        @include min-screen(map-get($breakpoints, lg)) {
          margin-right: calc((100% - #{$default_contents_W}) / 2);
        }
      }

      &.-reverse {
        flex-direction: row-reverse;

        & .mediaTextBlock_image {
          margin-right: 0;

          @include mb() {
            float: right;
            width: 50%;
            margin-left: $spacing_4x;
          }

          @include pc() {
            margin-left: 4%;
          }

          @include min-screen(map-get($breakpoints, xxxl)) {
            margin-left: $spacing_20x;
          }
        }

        & .mediaTextBlock_text {
          @include min-screen(map-get($breakpoints, lg)) {
            margin-left: calc((100% - #{$default_contents_W}) / 2);
            margin-right: 0;
          }
        }
      }
    }

    &--horizontal {
      .mediaTextBlock_image {
        @include pc() {
          margin-bottom: $spacing_14x;
        }

        @include mb() {
          margin-bottom: $spacing_4x;
        }

        img {
          @include pc() {
            max-height: $Horizontal_Image_maxH;
          }
        }
      }

      .mediaTextBlock_text {
        max-width: $interview_contents_W;
        margin: auto;

        @include mb() {
          max-width: 100%;
        }
      }
    }
  }

  &_title {
    font-weight: $font_weight_bold;

    @include pc() {
      @include fz($font_size_m);
      margin-bottom: $spacing_10x;
    }

    @include mb() {
      @include fz($font_size_s);
      margin-bottom: $spacing_4x;
    }
  }

  &_phrase {
    color: $color_gray_1000;
    line-height: $line_height_article;
    margin: 0;

    @include pc() {
      @include fz($font_size_s);
    }

    @include mb() {
      @include fz($font_size_xxxs);
    }
  }
}
</style>
