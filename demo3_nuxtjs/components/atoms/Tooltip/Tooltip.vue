<template>
  <div class="tooltip" :class="classes">
    <span class="tooltip_text">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
// props type
type BgColorPropValue = 'primary' | 'black'
type SizePorpValue = 'small' | 'medium' | 'large'
type TextAlignPorpValue = 'left' | 'center' | 'right'
type TooltipProps = {
  bgColor: string
  size: string
  text: string
  textAlign: string
}

export default defineComponent({
  name: 'Tooltip',

  props: {
    bgColor: {
      type: String as PropType<BgColorPropValue>,
      default: 'black',
      validator: (value: string) => {
        return ['primary', 'black'].includes(value)
      }
    },
    size: {
      type: String as PropType<SizePorpValue>,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    text: {
      type: String,
      require: true,
      default: 'text'
    },
    textAlign: {
      type: String as PropType<TextAlignPorpValue>,
      default: 'center',
      validator: (value: string) => {
        return ['left', 'center', 'right'].includes(value)
      }
    }
  },

  setup(props: TooltipProps) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-size--${props.size}`]: props.size,
        [`-textAlign--${props.textAlign}`]: props.textAlign
      }
    })

    return {
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.tooltip {
  width: auto;
  position: relative;
  display: inline-block;
  border-radius: 5px;
  padding: $spacing_2x;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-color: transparent;
  }

  &_text {
    color: $color_white;
    word-break: inherit;
  }

  &.-bgColor {
    &--black {
      color: $color_white;
      background-color: $color_gray_1000;

      &::before {
        border-top-color: $color_gray_1000;
      }
    }

    &--primary {
      color: $color_white;
      background-color: $color_primary;

      &::before {
        border-top-color: $color_primary;
      }
    }
  }

  &.-size {
    &--small {
      @include fz($font_size_label_s);

      &::before {
        border-width: 5px;
        bottom: -10px;
      }
    }

    &--medium {
      max-width: 85px;
      @include fz($font_size_xs);

      &::before {
        border-width: 7px;
        bottom: -14px;
      }
    }

    &--large {
      max-width: 215px;
      @include fz($font_size_base);

      &::before {
        border-width: 10px;
        bottom: -20px;
      }
    }
  }

  &.-textAlign {
    &--center {
      text-align: center;
    }

    &--left {
      text-align: left;
    }

    &--right {
      text-align: right;
    }
  }
}
</style>
