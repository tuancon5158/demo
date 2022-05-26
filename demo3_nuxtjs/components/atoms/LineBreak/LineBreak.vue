<template>
  <div :class="['lineBreak', classes]" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type LineBreakProps = {
  color: string
  size: string
  align: string
}

const colorValues = ['white', 'darkblue']
const sizeValues = ['auto', 'sm', 'xs']
const alignValues = ['left', 'right', 'center']

export default defineComponent({
  name: 'LineBreak',

  props: {
    color: {
      type: String,
      default: 'white',
      validator: (value: string) => colorValues.includes(value)
    },
    size: {
      type: String,
      default: 'auto',
      validator: (value: string) => sizeValues.includes(value)
    },
    align: {
      type: String,
      default: 'center',
      validator: (value: string) => alignValues.includes(value)
    }
  },

  setup(props: LineBreakProps) {
    const classes = computed(() => {
      return {
        [`-color--${props.color}`]: props.color,
        [`-size--${props.size}`]: props.size,
        [`-position--${props.align}`]: props.align
      }
    })

    return {
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.lineBreak {
  height: 2px;
  margin: $spacing_8x 0;

  @include mb() {
    margin-top: $spacing_4x;
    margin-bottom: $spacing_4x;
  }

  &.-color {
    &--white {
      background-color: $color_white;
    }

    &--darkblue {
      background-color: $color_darkblue;
    }
  }

  &.-size {
    &--auto {
      width: 100%;
    }

    &--sm {
      @include pc() {
        width: 20%;
      }

      @include mb() {
        width: 40%;
      }
    }

    &--xs {
      width: 10%;
    }
  }

  &.-position {
    &--center {
      margin-left: auto;
      margin-right: auto;
    }

    &--left {
      margin-left: 0;
    }
    &--right {
      margin-left: auto;
    }
  }
}
</style>
