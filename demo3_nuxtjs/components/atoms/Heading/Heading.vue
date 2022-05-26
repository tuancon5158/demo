<template>
  <!-- eslint-disable vue/no-v-html -->
  <component :is="`h${level}`" class="heading" :class="classes" :style="styles">
    <span
      v-for="(heading, item) in headings"
      :key="item"
      :class="[`-fontColor--${heading.color}`, { '-spBreak': heading.spBreak }]"
      v-html="heading.text"
    />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'

// props type
interface HeadingLineInterface {
  text: string
  color: string
  spBreak: boolean
}

type HeadingProps = {
  align: string
  level: string
  headings: HeadingLineInterface[]
  fontWeight: string
}

export default defineComponent({
  name: 'Heading',

  props: {
    align: {
      type: String,
      default: 'center',
      validator: (value: string) => {
        return ['left', 'center', 'right'].includes(value)
      }
    },
    level: {
      type: String,
      default: '1',
      validator: (value: string) => {
        return ['1', '2', '3', '4', '5', '6'].includes(value)
      }
    },
    headings: {
      type: Array as PropType<HeadingLineInterface[]>,
      required: true
    },
    fontWeight: {
      type: String,
      default: '400'
    }
  },

  setup(props: HeadingProps) {
    const classes = computed(() => {
      return {
        [`-lv--${props.level}`]: props.level
      }
    })

    const styles = computed(() => {
      return {
        fontWeight: props.fontWeight,
        textAlign: props.align
      }
    })

    return {
      classes,
      styles
    }
  }
})
</script>

<style lang="scss" scoped>
.heading {
  color: $font_color_base;

  &.-lv {
    &--1 {
      @include pc() {
        @include fz($font_size_hero);
      }

      @include mb() {
        @include fz($font_size_hero_mb);
      }
    }

    &--2 {
      // modify from 40px to 46px
      @include pc() {
        @include fz($font_size_xlarge);
      }

      @include mb() {
        @include fz($font_size_xlarge_mb);
      }
    }

    &--3 {
      @include pc() {
        @include fz($font_size_heading3);
      }

      @include mb() {
        @include fz($font_size_l);
      }
    }

    &--4 {
      @include pc() {
        @include fz($font_size_heading4);
      }

      @include mb() {
        @include fz($font_size_xl);
      }
    }

    &--5 {
      @include pc() {
        @include fz($font_size_heading5);
      }

      @include mb() {
        @include fz($font_size_s);
      }
    }

    &--6 {
      @include pc() {
        @include fz($font_size_xxl);
      }
    }
  }

  & .-fontColor {
    &--primary {
      color: $color_primary;
    }

    &--secondary {
      color: $color_secondary;
    }

    &--white {
      color: $color_white;
    }

    &--black {
      color: $font_color_base;
    }
    &--alert {
      color: $color_notice;
    }
  }

  & .-spBreak {
    @include mb() {
      display: block;
      margin: 0;
    }
  }
}
</style>
