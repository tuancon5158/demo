<template>
  <div class="figureCaptionItem" :class="[{ 'slide-in-item': isScroll }, classes]">
    <h3 class="figureCaptionItem_title">{{ title }}</h3>
    <div class="figureCaptionItem_image">
      <img
        v-lazy="require(`~/assets/images/${image}`)"
        :alt="title"
        width="330"
        :height="size === 'small' ? '240' : '422'"
      />
    </div>
    <p v-html="text" class="figureCaptionItem_text" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'FigureCaptionItem',

  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium'].includes(value)
      }
    }
  },

  setup(props) {
    const classes = computed(() => {
      return {
        [`-size--${props.size}`]: props.size
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.figureCaptionItem {
  position: relative;
  max-width: 330px;
  flex-basis: 33.3%;

  @include mb() {
    max-width: 100%;
  }

  &.-size {
    &--medium {
      & .figureCaptionItem_image {
        height: 42.2rem;
      }
    }

    &--small {
      & .figureCaptionItem_image {
        height: 24rem;
      }
    }
  }

  &_title {
    font-weight: $font_weight_bold;
    @include fz($font_size_large);
    color: $color_white;
    margin-bottom: $spacing_6x;

    @include mb() {
      @include fz($font_size_medium);
    }
  }

  &_image {
    width: 100%;
    margin: $spacing_6x 0;
    height: 42.2rem;

    @include mb() {
      margin: $spacing_6x 0 $spacing_4x;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      @include mb() {
        width: 100%;
      }
    }
  }

  &_text {
    font-weight: $font_weight_normal;
    @include fz($font_size_standard);
    color: $color_white;
    margin: 0;
    padding: 0;

    @include mb() {
      @include fz($font_size_xsmall);
    }
  }
}
</style>
