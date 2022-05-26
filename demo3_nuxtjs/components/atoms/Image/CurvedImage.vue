<template>
  <div :class="classes" class="curvedImage">
    <img
      class="curvedImage_image"
      v-lazy="path"
      :class="{ curvedImage_show: isLoaded }"
      :alt="alt"
      @load="handleLoad"
      width="574"
      height="448"
    />
    <div class="curvedImage_skelton" :class="{ curvedImage_show: !isLoaded }" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

// props type
interface I_CurvedImageProps {
  path: string
  alt: string
  size: string
  type: string
}

export default defineComponent({
  name: 'CurvedImage',

  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'gallery'].includes(value)
      }
    },
    path: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  },

  setup(props: I_CurvedImageProps) {
    const isLoaded = ref(false)
    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type
      }
    })

    // handle lazy load image
    const handleLoad = (e): void => {
      setTimeout(() => {
        isLoaded.value = true
      }, 500)
    }

    return { classes, isLoaded, handleLoad }
  }
})
</script>

<style lang="scss" scoped>
.curvedImage {
  position: relative;
  width: 100%;
  overflow: hidden;

  -webkit-mask-image: url('../../../assets/images/mask-curved.png');
  mask-image: url('../../../assets/images/mask-curved.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;

  &_image {
    transition: 0.5s all;
    opacity: 0;
    position: relative;
  }

  &.-type {
    &--gallery {
      @include aspect-ratio(920, 652);
    }
  }

  &_skelton {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    background: linear-gradient(
      to right,
      lighten($color_gray_lighten1, 7%),
      $color_gray_lighten1,
      lighten($color_gray_lighten1, 7%)
    );
    background-size: 200%;
    background-position: left;
    animation: load 1s ease-out 0s infinite normal;
  }

  &_show {
    opacity: 1;
  }

  img {
    margin: 0 auto;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
}
</style>
