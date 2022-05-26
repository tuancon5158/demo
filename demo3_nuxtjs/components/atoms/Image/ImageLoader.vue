<template>
  <div class="imageLoader" :style="styles" :class="classes">
    <img
      class="imageLoader_image"
      :class="{ '-show': isLoaded }"
      :src="path"
      :alt="alt"
      @load="handleLoad"
    />
    <div v-if="!isLoaded" class="imageLoader--skelton" :style="styles" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
// props type
type ImageLoaderProps = {
  path: string
  alt: string
  width: string
  ratioType: string
}

export default defineComponent({
  name: 'ImageLoader',

  props: {
    path: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '300px'
    },
    ratioType: {
      type: String,
      default: '1',
      validator: (value: string) => {
        return ['1', '2', '3', '4', '5', '6'].includes(value)
      }
    }
  },

  setup(props: ImageLoaderProps) {
    const isLoaded = ref(false)

    // load styles
    const styles = computed(() => {
      return {
        width: props.width
      }
    })

    const classes = computed(() => {
      return {
        [`-ratioType--${props.ratioType}`]: props.ratioType
      }
    })

    // handle load image
    const handleLoad = (): void => {
      setTimeout(() => {
        isLoaded.value = true
      }, 500)
    }

    return {
      styles,
      handleLoad,
      isLoaded,
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.imageLoader {
  &_image {
    display: none;

    &.-show {
      display: block;
    }
  }

  &--skelton {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    background: linear-gradient(
      to right,
      lighten($color_gray_400, 7%),
      $color_gray_400,
      lighten($color_gray_400, 7%)
    );
    background-size: 200%;
    background-position: left;
    animation: load 1s ease-out 0s infinite normal;
  }

  &.-ratioType {
    &--1 {
      @include aspect-ratio(75, 37);
    }

    &--2 {
      @include aspect-ratio(5, 3);
    }

    &--3 {
      @include aspect-ratio(20, 13);
    }

    &--4 {
      @include aspect-ratio(20, 11);
    }

    &--5 {
      @include aspect-ratio(342, 289);
    }

    &--6 {
      @include aspect-ratio(1392, 689);
    }
  }
}
</style>
