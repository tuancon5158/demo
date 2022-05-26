<template>
  <section class="section" :class="classes">
    <div class="section_inner" :class="sizeClass">
      <div><slot name="head" /></div>
      <div class="section_contents">
        <div v-for="i in Number(columns)" :key="i" class="section_column" :class="colClasses">
          <slot :name="`column-${i}`" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
// props type
type SectionContainerProps = {
  columns: string
  containerSize: string
  position: string
  bgColor: string
  borderTopColor: string
  wrapSize: string
  fullWidth: boolean
}

export default defineComponent({
  name: 'SectionContainer',

  props: {
    columns: {
      type: String,
      default: '1'
    },
    containerSize: {
      type: String,
      default: 'lg',
      validator: (value: string) => {
        return ['lg', 'xlg', 'xxlg', 'full'].includes(value)
      }
    },
    position: {
      type: String,
      default: 'center',
      validator: (value: string) => {
        return ['left', 'center'].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return [
          'primary',
          'secondary',
          'darkblue',
          'white',
          'gray',
          'black',
          'darkgray',
          'transparent',
          'black-gradient',
          'white-gradient'
        ].includes(value)
      }
    },
    borderTopColor: {
      type: String,
      default: 'none',
      validator: (value: string) => {
        return ['primary', 'secondary', 'none'].includes(value)
      }
    },
    wrapSize: {
      type: String,
      default: 'normal',
      validator: (value: string) => {
        return ['normal', 'large'].includes(value)
      }
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },

  setup(props: SectionContainerProps) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-borderTopColor--${props.borderTopColor}`]: props.borderTopColor,
        [`-position--${props.position}`]: props.position,
        [`-wrapSize--${props.wrapSize}`]: props.wrapSize,
        [`--fullWidth`]: props.fullWidth
      }
    })

    const sizeClass = computed(() => {
      return {
        [`-containerSize--${props.containerSize}`]: props.containerSize
      }
    })

    const colClasses = computed(() => {
      return {
        [`-col--${props.columns}`]: props.columns
      }
    })

    return {
      classes,
      sizeClass,
      colClasses
    }
  }
})
</script>

<style lang="scss" scoped>
.section {
  position: relative;
  z-index: 1;

  &.-wrapSize {
    &--normal {
      @include mb() {
        padding: $spacing_6x $spacing_4x $spacing_14x;
      }

      @include pc() {
        padding: $spacing_14x $spacing_8x $spacing_24x;
      }
    }

    &--large {
      @include mb() {
        padding: $spacing_14x $spacing_4x;
      }

      @include pc() {
        padding: $spacing_24x $spacing_8x;
      }
    }
  }

  &.-position {
    &--center {
      text-align: center;
    }

    &--left {
      text-align: left;
    }
  }

  &.-bgColor {
    &--white {
      color: $font_color_base;
      background-color: $color_white;
    }

    &--primary {
      color: $color_white;
      background-color: $color_primary;
    }

    &--secondary {
      color: $color_white;
      background-color: $color_secondary;
    }

    &--darkblue {
      color: $color_white;
      background-color: $color_darkblue;
    }

    &--gray {
      color: $font_color_base;
      background-color: $color_gray_lighten3;
    }

    &--black {
      color: $color_white;
      background-color: $color_gray_1000;
    }

    &--transparent {
      color: inherit;
      background-color: transparent;
    }

    &--darkgray {
      color: $color_white;
      background-color: $font_color_base;
    }

    &--black-gradient {
      color: $color_white;
      background: $color_black_gradient;
    }

    &--white-gradient {
      color: $color_gray_1000;
      background: $color_white_gradient;
    }
  }

  &.-borderTopColor {
    &--primary {
      border-top: 2rem solid $color_primary;
    }

    &--secondary {
      border-top: 2rem solid $color_secondary;
    }

    &--none {
      border-top: none;
    }
  }

  &_inner {
    margin: 0 auto;

    &.-containerSize {
      &--lg {
        max-width: $default_contents_W; // 1044px
      }

      &--xlg {
        max-width: $default_contents_W_medium; // 1120px
      }

      &--xxlg {
        max-width: $default_contents_W_large; // 1280px
      }

      &--full {
        width: 100%;
      }
    }
  }

  &_contents {
    @include pc() {
      display: flex;
      justify-content: space-around;
    }
  }

  &_column {
    &.-col {
      &--1 {
        width: 100%;
      }

      &--3 {
        @include pc() {
          width: calc((100% - 2rem * 2) / 3);
        }

        &:not(:last-child) {
          @include mb() {
            margin-bottom: $spacing_10x;
          }
        }
      }
    }
  }

  &.--fullWidth {
    padding: inherit 0;
  }
}
</style>
