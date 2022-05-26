<template>
  <blockquote :cite="cite" class="blockquote" :class="classes">
    {{ msg }}
  </blockquote>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type BlockquoteProps = {
  msg: string
  color: string
  cite: string
  position: string
}

export default defineComponent({
  name: 'Blockquote',
  props: {
    cite: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'gray',
      validator: (value: string) => {
        return ['black', 'gray'].includes(value)
      }
    },
    msg: {
      type: String,
      required: true,
      default:
        '出展：日本経済社（新型コロナウイルス感染拡大が注文住宅購入検討層に与えた影響の把握）'
    },
    position: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['left', 'center', 'right'].includes(value)
      }
    }
  },

  setup(props: BlockquoteProps) {
    const classes = computed(() => {
      return {
        [`-color--${props.color}`]: props.color,
        [`-position--${props.position}`]: props.position
      }
    })

    return {
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.blockquote {
  font-style: normal;
  font-weight: $font_weight_normal;
  @include fz($font_size_xs);

  &.-color {
    &--gray {
      color: $color_gray_darken1;
    }

    &--black {
      color: $font_color_base;
    }
  }

  &.-position {
    &--left {
      text-align: left;
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }
}
</style>
