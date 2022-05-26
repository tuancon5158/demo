<template>
  <div class="spinner" :class="[classes]" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
// props type
type SpinnerProps = {
  size: string
  color: string
  bgColor: string
}

export default defineComponent({
  name: 'Spinner',

  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value: string) => {
        return ['primary', 'secondary', 'black', 'white'].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['gray', 'white', 'transparent'].includes(value)
      }
    }
  },

  setup(props: SpinnerProps) {
    const classes = computed(() => {
      return {
        [`-size--${props.size}`]: props.size,
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-color--${props.color}`]: props.color
      }
    })

    return {
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &::after {
    content: '';
    border-radius: 50%;
    animation: spinner 0.8s ease infinite;
    border-color: $color_white;
  }

  &.-size {
    &--small {
      &::after {
        width: 18px;
        height: 18px;
        border: 3px solid $color_white;
        border-top-color: transparent;
      }
    }

    &--medium {
      &::after {
        width: 38px;
        height: 38px;
        border: 5px solid $color_white;
        border-top-color: transparent;
      }
    }

    &--large {
      &::after {
        width: 58px;
        height: 58px;
        border: 8px solid $color_white;
        border-top-color: transparent;
      }
    }
  }

  &.-bgColor {
    &--gray {
      &::after {
        border-color: $color_gray_lighten3;
      }
    }

    &--transparent {
      &::after {
        border-color: transparent;
      }
    }
  }

  &.-color {
    &--white {
      &::after {
        border-top-color: $color_white;
      }
    }

    &--primary {
      &::after {
        border-top-color: $color_primary;
      }
    }

    &--secondary {
      &::after {
        border-top-color: $color_secondary;
      }
    }

    &--black {
      &::after {
        border-top-color: $color_gray_1000;
      }
    }
  }
}

@keyframes spinner {
  to {
    transform: rotate(1turn);
  }
}
</style>
