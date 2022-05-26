<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="imageTextBlock" :class="{ '-reverse': reverse }">
    <div class="imageTextBlock_image">
      <ImageLoader width="100%" ratio-type="2" alt="dummy image" :path="imagePath" />
    </div>
    <div class="imageTextBlock_text">
      <div class="imageTextBlock_title" :class="lineColorClasses">
        <Heading
          level="4"
          align="left"
          font-weight="700"
          :headings="[{ text: title, color: fontColor, spBreak: false }]"
        />
      </div>
      <p class="imageTextBlock_phrase" v-html="text" />
      <slot name="foot" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ImageLoader from '~/components/atoms/Image/ImageLoader.vue'
import Heading from '~/components/atoms/Heading/Heading.vue'

// props type
type ImageTextBlockProps = {
  imagePath: string
  reverse: boolean
  title: string
  text: string
  fontColor: string
  lineColor: string
}

export default defineComponent({
  name: 'ImageTextBlock',

  components: {
    Heading,
    ImageLoader
  },

  props: {
    imagePath: {
      type: String,
      required: true
    },
    reverse: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    fontColor: {
      type: String,
      default: 'black'
    },
    lineColor: {
      type: String,
      default: 'primary',
      validator: (value: string) => {
        return ['primary', 'secondary', 'white'].includes(value)
      }
    }
  },

  setup(props: ImageTextBlockProps) {
    const lineColorClasses = computed(() => {
      return {
        [`-lineColor--${props.lineColor}`]: props.lineColor
      }
    })

    return {
      lineColorClasses
    }
  }
})
</script>

<style scoped lang="scss">
.imageTextBlock {
  @include pc() {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &_image {
    @include pc() {
      width: 48%;
    }

    @include mb() {
      width: 100%;
    }
  }

  &_title {
    position: relative;
    font-weight: $font_weight_bold;

    @include pc() {
      padding-top: $spacing_10x;
    }

    @include mb() {
      padding-top: $spacing_5x;
    }

    &::after {
      @include pc() {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 2px;
      }
    }

    &.-lineColor {
      &--primary {
        &::after {
          @include pc() {
            background: $color_primary;
          }
        }
      }

      &--secondary {
        &::after {
          @include pc() {
            background: $color_secondary;
          }
        }
      }
    }
  }

  &_text {
    text-align: left;

    @include pc() {
      width: 44%;
      margin-right: $spacing_5x;
    }

    @include mb() {
      width: 100%;
      margin-bottom: $spacing_5x;
    }
  }

  &.-reverse {
    flex-direction: row-reverse;

    & .imageTextBlock_text {
      @include pc() {
        margin-left: $spacing_5x;
        margin-right: 0;
      }
    }
  }

  &_phrase {
    line-height: 2;
    line-height: 1.75;
    @include ls(35);
    margin: $spacing_5x auto;
  }
}
</style>
