<template>
  <div :class="labelClasses" class="headingSet" :style="{ textAlign: align }">
    <div v-if="label" class="headingSet_label">
      {{ label }}
    </div>

    <Heading :level="level" :align="align" :headings="headings" :font-weight="fontWeight" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="note" :class="noteClasses" class="headingSet_note" v-html="note" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import Heading from '~/components/atoms/Heading/Heading.vue'

// props type
export interface HeadingLineInterface {
  text: string
  color: string
  spBreak: boolean
}

type HeadingSetProps = {
  label: string
  note: string
  labelColor: string
  level: string
  align: string
  labelSize: string
  headings: HeadingLineInterface[]
  fontWeight: string
  noteSize: string
}

export default defineComponent({
  name: 'HeadingSet',

  components: {
    Heading
  },

  props: {
    label: {
      type: String,
      default: ''
    },
    note: {
      type: String,
      default: ''
    },
    labelColor: {
      type: String,
      default: 'primary',
      validator: (value: string) => {
        return ['primary', 'secondary', 'black', 'white', 'darkblue', 'alert'].includes(value)
      }
    },
    labelSize: {
      type: String,
      default: 'small',
      validator: (value: string) => {
        return ['small', 'medium', 'large', 'extra'].includes(value)
      }
    },
    noteSize: {
      type: String,
      default: 'small',
      validator: (value: string) => {
        return ['small', 'medium', 'large', 'extra'].includes(value)
      }
    },
    level: {
      type: String,
      default: '1'
    },
    align: {
      type: String,
      default: 'center',
      validator: (value: string) => {
        return ['left', 'center', 'right'].includes(value)
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

  setup(props: HeadingSetProps) {
    const labelClasses = computed(() => {
      return {
        [`-labelColor--${props.labelColor}`]: props.labelColor,
        [`-labelSize--${props.labelSize}`]: props.labelSize
      }
    })
    const noteClasses = computed(() => {
      return {
        [`-labelColor--${props.labelColor}`]: props.labelColor,
        [`-noteSize--${props.noteSize}`]: props.noteSize
      }
    })

    return {
      labelClasses,
      noteClasses
    }
  }
})
</script>

<style scoped lang="scss">
.headingSet {
  text-align: center;

  @include pc() {
    margin-bottom: $spacing_15x;
  }

  @include mb() {
    margin-bottom: $spacing_10x;
  }

  &_label {
    margin-bottom: $spacing_2x;
    font-weight: $font_weight_bold;

    &.-labelSize {
      &--small {
        @include fz($font_size_base);
      }

      &--medium {
        @include fz($font_size_label_l);
      }

      &--large {
        @include fz($font_size_l);
      }

      &--extra {
        @include fz($font_size_heading4);
      }
    }

    &.-labelColor {
      &--primary {
        color: $color_primary;
      }

      &--secondary {
        color: $color_secondary;
      }

      &--black {
        color: $color_gray_1000;
      }

      &--white {
        color: $color_white !important;
      }

      &--darkblue {
        color: $color_darkblue;
      }
      &--alert {
        color: $color_notice;
      }
    }
  }

  &_note {
    @include pc() {
      @include fz($font_size_s);
      margin-top: $spacing_5x;
    }

    @include mb() {
      margin-bottom: $spacing_3x;
    }
    &.-labelColor {
      &--primary {
        color: $color_primary;
      }

      &--secondary {
        color: $color_secondary;
      }

      &--black {
        color: $color_gray_1000;
      }

      &--white {
        color: $color_white !important;
      }

      &--darkblue {
        color: $color_darkblue;
      }
      &--alert {
        color: $color_notice;
      }
    }

    &.-noteSize {
      &--small {
        @include fz($font_size_xsmall);
      }

      &--medium {
        @include fz($font_size_small);
      }

      &--large {
        @include fz($font_size_standard);
      }

      &--extra {
        @include fz($font_size_medium);
      }
    }
  }
}
</style>
