<template>
  <div class="contents" :class="classes">
    <Breadcrumbs :title="title" :color="color" class="contents_breadcrumbs" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Breadcrumbs from '~/components/molecules/Breadcrumbs/Breadcrumbs.vue'

interface I_CardProps {
  bgColor: string
  title: string
  isBreadcrumb: boolean
}

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    Breadcrumbs
  },

  props: {
    bgColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'gray', 'whiteGradient', 'blackGradient'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'black'].includes(value)
      }
    },
    title: {
      type: String,
      default: ''
    },
    isBreadcrumb: {
      type: Boolean,
      default: true
    }
  },

  setup(props: I_CardProps) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contents {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - #{$header_H_pc} - 40px);
  flex: 1 1 auto;
  position: relative;

  @include header-mb() {
    margin-top: $header_H_sp;
  }

  &_breadcrumbs {
    top: 0;
    position: absolute;
    z-index: 2;
    padding: $spacing_6x;

    @include mb() {
      padding: $spacing_4x;
    }
  }

  &.-bgColor {
    &--white {
      background-color: $color_white;
    }

    &--gray {
      background-color: $color_gray_lighten3;
    }

    &--whiteGradient {
      background: $color_white_gradient;
    }

    &--blackGradient {
      background: $color_black_gradient;
    }
  }
}
</style>
