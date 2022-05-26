<template>
  <div class="label" :class="classes">{{ label }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type Label = {
  label: string
  bgColor: string
  labelColor: string
  size: string
  rounded: string
}

export default defineComponent({
  name: 'Label',

  props: {
    label: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'primary',
      validator: (value: string) => {
        return ['primary', 'secondary', 'darkblue', 'black', 'blue', 'green', 'red'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large', 'auto'].includes(value)
      }
    },
    labelColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'blue', 'green', 'red'].includes(value)
      }
    },
    rounded: {
      type: String,
      default: 'small',
      validator: (value: string) => {
        return ['none', 'small', 'large'].includes(value)
      }
    }
  },

  setup(props: Label) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-labelColor--${props.labelColor}`]: props.labelColor,
        [`-size--${props.size}`]: props.size,
        [`-rounded--${props.rounded}`]: props.rounded
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.label {
  cursor: pointer;
  display: flex;
  margin: 0;
  position: relative;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: auto;
  touch-action: manipulation;
  letter-spacing: normal;
  background: $color_gray_darken2;
  outline: none;

  &.-rounded {
    &--none {
      border-radius: 0;
    }

    &--small {
      border-radius: $label_BorderRadius_small;
    }

    &--large {
      border-radius: $label_BorderRadius_medium;
    }
  }

  &.-size {
    &--small {
      @include fz($font_size_xsmall);
      width: 44px;
      height: 20px;
      font-style: normal;
      font-weight: $font_weight_medium;
      line-height: 15px;

      @include mb() {
        @include fz($font_size_xsmall);
      }
    }

    &--medium {
      @include fz($font_size_s);
      width: 105px;
      height: 38px;
      font-style: italic;
      font-weight: $font_weight_medium;
      line-height: 20px;
    }

    &--large {
      @include fz($font_size_xxl);
      width: 904px;
      height: 130px;
      font-style: normal;
      font-weight: $font_weight_bold;
      @include fz($font_size_xxl);
      line-height: 36px;
      text-align: center;
    }

    &--auto {
      @include fz($font_size_xs);
      width: fit-content;
      font-style: normal;
      font-weight: $font_weight_medium;
      line-height: 20px;
      padding: $spacing_1x $spacing_3x;
    }
  }

  &.-bgColor {
    &--primary {
      background-color: $color_primary;
    }

    &--secondary {
      background-color: $color_secondary;
    }

    &--darkblue {
      background-color: $color_darkblue;
    }

    &--black {
      background-color: $color_gray_1000;
    }

    &--blue {
      background-color: $color_blue_50;
    }

    &--green {
      background-color: $color_green_100;
    }

    &--red {
      background-color: $color_red_100;
    }
  }

  &.-labelColor {
    &--white {
      color: $color_white;
    }

    &--blue {
      color: $color_blue_400;
    }

    &--green {
      color: $color_green_500;
    }

    &--red {
      color: $color_red_a_500;
    }
  }
}
</style>
