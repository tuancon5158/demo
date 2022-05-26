<template>
  <nuxt-link :to="link" class="labelButton" :class="classes">
    <div>{{ label }}</div>
    <span class="labelButton_arrow" />
  </nuxt-link>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type LabelButtonProps = {
  borderColor: string
  bgColor: string
  fontColor: string
  label: string
  link: string
  size: string
}

export default defineComponent({
  name: 'LabelButton',

  props: {
    borderColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['primary', 'secondary', 'white'].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'transparent',
      validator: (value: string) => {
        return ['primary', 'secondary', 'transparent'].includes(value)
      }
    },
    fontColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['primary', 'secondary', 'white'].includes(value)
      }
    },
    label: {
      type: String,
      default: 'label button text',
      required: true
    },
    link: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'full',
      validator: (value: string) => {
        return ['auto', 'full'].includes(value)
      }
    }
  },

  setup(props: LabelButtonProps) {
    const classes = computed(() => {
      return {
        [`-borderColor--${props.borderColor}`]: props.borderColor,
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-fontColor--${props.fontColor}`]: props.fontColor,
        [`-size--${props.size}`]: props.size
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.labelButton {
  position: relative;
  color: $color_white;
  text-align: center;
  transition: all 0.2s cubic-bezier(0.5, 0.05, 0.55, 0.95) 0ms;

  @include pc() {
    @include fz($font_size_m);
    padding: $spacing_7x $spacing_25x $spacing_7x $spacing_7x;
  }

  @include mb() {
    @include fz($font_size_s);
    text-align: left;
    padding: $spacing_5x $spacing_25x $spacing_5x $spacing_5x;
  }

  &.-borderColor {
    &--primary {
      border: 1px solid $color_primary;
    }

    &--secondary {
      border: 1px solid $color_secondary;
    }

    &--white {
      border: 1px solid $color_white;
    }
  }

  &.-bgColor {
    &--primary {
      background-color: $color_primary;
    }

    &--secondary {
      background-color: $color_secondary;
    }

    &--transparent {
      background-color: transparent;
    }
  }

  &.-fontColor {
    &--primary {
      color: $color_primary;
    }

    &--secondary {
      color: $color_secondary;
    }

    &--white {
      color: $color_white;
    }
  }

  &.-size {
    &--auto {
      display: inline-block;
      width: auto;
      padding-right: $spacing_25x;
      font-size: inherit;
    }

    &--full {
      display: block;
      width: 100%;
      font-weight: $font_weight_medium;
    }
  }

  &_arrow {
    position: absolute;
    top: 50%;
    right: 50px;
    display: inline-block;
    padding: 0 0 0 $spacing_4x;
    vertical-align: middle;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.5, 0.05, 0.55, 0.95) 0ms;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      content: '';
      vertical-align: middle;
      transition: all 0.2s cubic-bezier(0.5, 0.05, 0.55, 0.95) 0ms;
    }

    &::before {
      left: 3px;
      width: 23px;
      height: 1px;
      background: $color_white;
    }

    &::after {
      left: 12px;
      width: 13px;
      height: 13px;
      border-top: 1px solid $color_white;
      border-right: 1px solid $color_white;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  &:hover {
    & .labelButton_arrow {
      right: 30px;

      &::before {
        width: 30px;
        left: -3px;
      }
    }
  }
}
</style>
