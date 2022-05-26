<template>
  <component
    :is="externalLink ? 'a' : link !== '' ? 'nuxt-link' : 'button'"
    :to="!externalLink ? link : false"
    :href="externalLink ? link : false"
    :target="externalLink ? '_blank' : false"
    :class="classes"
    class="CTAButton"
    v-on="externalLink ? {} : link !== '' ? {} : { click: handleClick }"
  >
    <span class="CTAButton_label">{{ label }}</span>
    <span v-if="textChangeHover" class="CTAButton_label">
      {{ $t('buttonTextChange') }}
    </span>
    <span v-if="icon" class="CTAButton_icon" :class="iconClasses"></span>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
interface I_ButtonProps {
  type: string
  label: string
  size: string
  icon: boolean
  iconColor: string
  externalLink: boolean
  link: string
  disabled: boolean
  textChangeHover: boolean
}

export default defineComponent({
  name: 'CTAButton',

  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return [
          'default',
          'outline',
          'whiteBgr',
          'transparent',
          'outlineBlack',
          'blackBgr'
        ].includes(value)
      }
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'standard'].includes(value)
      }
    },
    icon: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['black', 'white'].includes(value)
      }
    },
    link: {
      type: String,
      default: ''
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textChangeHover: {
      type: Boolean,
      default: false
    }
  },

  emits: ['onClick'],

  setup(props: I_ButtonProps, { emit }) {
    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type,
        [`-size--${props.size}`]: props.size,
        '-disabled': props.disabled,
        '-textChanged': props.textChangeHover
      }
    })

    const iconClasses = computed(() => {
      return {
        [`-iconColor--${props.iconColor}`]: props.iconColor
      }
    })

    const handleClick = () => {
      emit('onClick')
    }

    return {
      classes,
      iconClasses,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.CTAButton {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-align: center;
  font-weight: $font_weight_bold;
  line-height: 1;
  justify-content: center;
  width: fit-content;
  letter-spacing: normal;

  // Right arrow icon
  &_icon {
    position: relative;
    width: 30px;
    margin-left: auto;

    &::before {
      content: '';
      width: 27px;
      height: 1px;
      position: absolute;
      top: 50%;
      margin-top: -1px;
      right: 9px;
      transition: all 0.5s ease;
    }

    &::after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 9px;
      position: absolute;
      top: 50%;
      margin-top: -5px;
      left: calc(100% - 9px);
      transition: all 0.5s ease;
    }

    // arrow color
    &.-iconColor {
      &--black {
        &::before {
          background: $color_gray_1000;
        }

        &::after {
          border-color: transparent transparent transparent $color_gray_1000;
        }
      }

      &--white {
        &::before {
          background: $color_white;
        }

        &::after {
          border-color: transparent transparent transparent $color_white;
        }
      }
    }
  }

  &_label {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s;
  }

  // slide background
  &::after {
    position: absolute;
    z-index: -1;
    display: block;
    transition: all 0.5s ease;
    top: 0;
    bottom: 0;
    left: -100%;
    right: 100%;
  }

  // hover effect
  &:hover {
    &::after {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transition: all 0.5s ease;
    }

    & .CTAButton_icon {
      &::before {
        width: 40px;
        height: 0.5px;

        @include mb() {
          width: 20px;
        }
      }
    }
  }

  // Button type color, background
  &.-type {
    // default is yellow gradient
    &--default {
      background: $color_yellow_gradient;
      color: $color_gray_1000;
      border: 1px solid transparent;
      border-image: linear-gradient(103.27deg, #ffc700 18.62%, #ffe600 82.01%);
      border-image-slice: 1;

      &::after {
        content: '';
        background: $color_gray_1000;
      }

      &:hover {
        color: $color_white;
        border: 1px solid $color_white;

        & .CTAButton_icon {
          &::before {
            background: $color_white;
          }

          &::after {
            border-color: transparent transparent transparent $color_white;
          }
        }
      }
    }

    // transparent background with white color
    &--outline {
      background: transparent;
      color: $color_white;
      border: 1px solid $color_white;

      &::after {
        content: '';
        background: $color_yellow_gradient;
      }

      &:hover {
        color: $color_gray_1000;
        border: 1px solid transparent;
        border-image: linear-gradient(103.27deg, #ffc700 18.62%, #ffe600 82.01%);
        border-image-slice: 1;

        & .CTAButton_icon {
          &::before {
            background: $color_gray_1000;
          }

          &::after {
            border-color: transparent transparent transparent $color_gray_1000;
          }
        }
      }
    }

    // transparent background with black color
    &--outlineBlack {
      background: transparent;
      color: $color_gray_1000;
      border: 1px solid $color_gray_1000;

      &::after {
        content: '';
        background: transparent;
        color: $color_white;
      }

      &:hover {
        opacity: $opacity_hover;
      }
    }

    //  black background with white color
    &--blackBgr {
      background: $color_gray_1000;
      color: $color_white;
      border: 1px solid $color_gray_1000;
    }

    //  white background with black color
    &--whiteBgr {
      background: $color_white;
      color: $color_black;
      border: 1px solid $color_white;
    }

    // transparent background with white color - no hover effect
    &--transparent {
      background: transparent;
      color: $color_white;
      border: 1px solid $color_white;
    }
  }

  // Button Size
  &.-size {
    &--small {
      @include pc() {
        min-width: 15.2rem;
        height: 3.9rem;
        @include fz($font_size_base);
        padding: $spacing_3x;
      }

      @include mb() {
        @include fz($font_size_xsmall);
        padding: $spacing_3x;
        // padding: $spacing_1x $spacing_2x;
      }
    }

    &--standard {
      @include fz($font_size_standard);
      min-width: 12.2rem;
      padding: $spacing_3x $spacing_4x;
      height: 4.4rem;
    }

    &--medium {
      @include pc() {
        @include fz($font_size_large);
        min-width: 44.8rem;
        padding: $spacing_9x $spacing_6x;
        height: 9.2rem;
      }

      @include mb() {
        @include fz($font_size_medium);
        padding: $spacing_6x;
        min-width: 30rem;
        height: 6.4rem;
      }
    }
  }

  // Disabled button
  &.-disabled {
    cursor: default;
    pointer-events: none;
    background: rgba($color_gray_1000, 0.3);
    color: $color_white;
    border: 0;

    & .CTAButton_icon {
      &::before,
      &::after {
        display: none;
      }
    }
  }

  // Text Changed when hover
  &.-textChanged {
    @include mb() {
      padding: $spacing_3x;
    }

    & .CTAButton_label {
      &:nth-child(2) {
        opacity: 0;
      }
    }

    &:hover {
      & .CTAButton_label {
        &:first-child {
          opacity: 0;
        }

        &:nth-child(2) {
          opacity: 1;
        }
      }
    }
  }
}
</style>
