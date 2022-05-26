<template>
  <div class="squareImage" :style="styles">
    <img
      class="squareImage_image"
      :src="path"
      :alt="alt"
      :class="classes"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
// props type
type SquareImageProps = {
  path: string
  alt: string
  width: string
  height: string
  rounded: boolean
}

export default defineComponent({
  name: 'SquareImage',

  props: {
    path: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '50px'
    },
    width: {
      type: String,
      default: '50px'
    },
    rounded: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'small', 'medium', 'xsmall'].includes(value)
      }
    }
  },

  setup(props: SquareImageProps) {
    const styles = computed(() => {
      return {
        width: props.width,
        height: props.height
      }
    })

    const classes = computed(() => {
      return {
        [`-rounded--${props.rounded}`]: props.rounded
      }
    })

    return {
      styles,
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.squareImage {
  position: relative;
  display: block;
  flex: 0 0 auto;

  &_image {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    object-fit: cover;

    &.-rounded {
      &--default {
        border-radius: $input_BorderRadius;
      }

      &--small {
        border-radius: $userProfile_BorderRadius_small;
      }

      &--medium {
        border-radius: $userProfile_BorderRadius_medium;
      }

      &--xsmall {
        border-radius: $userProfile_BorderRadius_xsmall;
      }
    }
  }
}
</style>
