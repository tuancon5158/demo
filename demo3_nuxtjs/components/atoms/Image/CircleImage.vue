<template>
  <div class="circleImage" :class="classes" :style="styles">
    <img v-if="lazyLoad" v-lazy="path" :alt="alt" :width="size" :height="size" />
    <img v-if="!lazyLoad" :src="path" :alt="alt" :width="size" :height="size" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
// props type
type CircleImageProps = {
  path: string
  size: string
  type: string
  borderColor: string
}

export default defineComponent({
  name: 'CircleImage',

  props: {
    alt: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '280px'
    },
    type: {
      type: String,
      default: 'image',
      validator: (value: string) => {
        return ['image', 'icon'].includes(value)
      }
    },
    borderColor: {
      type: String,
      default: 'none',
      validator: (value: string) => {
        return ['primary', 'secondary', 'gray', 'none'].includes(value)
      }
    },
    lazyLoad: {
      type: Boolean,
      default: false
    }
  },

  setup(props: CircleImageProps) {
    const classes = computed(() => {
      return {
        [`-borderColor--${props.borderColor}`]: props.borderColor,
        [`-type--${props.type}`]: props.type
      }
    })

    const styles = computed(() => {
      return {
        width: props.size,
        height: props.size
      }
    })

    return {
      classes,
      styles
    }
  }
})
</script>

<style lang="scss" scoped>
.circleImage {
  border: 8px solid $color_gray_lighten2;
  border-radius: 100%;
  overflow: hidden;
  flex: 0 0 auto;
  background: $color_white;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;
  object-fit: cover;
  position: relative;

  &.-type {
    &--icon {
      background-size: contain;
      background-size: 50%;
      object-fit: contain;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &--image {
      background-size: cover;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &.-borderColor {
    &--primary {
      border: 8px solid lighten($color_primary, 35%);
    }
    r &--secondary {
      border: 8px solid lighten($color_secondary, 35%);
    }

    &--gray {
      border: 8px solid lighten($color_gray, 22%);
    }

    &--none {
      border: none;
    }
  }
}
</style>
