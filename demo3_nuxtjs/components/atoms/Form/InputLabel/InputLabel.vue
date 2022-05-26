<template>
  <label class="label" :class="classes">
    {{ value }}
    <template v-if="required">
      <label v-if="tagRequired" class="label_required_tag">
        {{ $t('form.label.required') }}
      </label>
      <span v-else :class="requiredClasses" class="label_required">*</span>
    </template>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type InputLabelProps = {
  value: string
  color: string
  colorRequired: string
  size: string
  required: boolean
  tagRequired: boolean
}

export default defineComponent({
  name: 'InputLabel',

  props: {
    value: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['black', 'gray', 'label', 'white'].includes(value)
      }
    },
    colorRequired: {
      type: String,
      default: 'notice',
      validator: (value: string) => {
        return ['black', 'white', 'notice'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    tagRequired: {
      type: Boolean,
      default: false
    }
  },

  setup(props: InputLabelProps) {
    const classes = computed(() => {
      return {
        [`-color--${props.color}`]: props.color,
        [`-size--${props.size}`]: props.size
      }
    })
    const requiredClasses = computed(() => {
      return {
        [`-colorRequired--${props.colorRequired}`]: props.colorRequired
      }
    })

    return {
      classes,
      requiredClasses
    }
  }
})
</script>

<style lang="scss" scoped>
.label {
  @include fz($font_size_xs);
  font-weight: $font_weight_medium;
  line-height: 1;
  display: block;
  margin-bottom: $spacing_1x;

  &.-color {
    &--black {
      color: $font_color_base;
    }

    &--gray {
      color: $color_gray_darken2;
    }

    &--label {
      color: $color_gray_900;
    }
    &--white {
      color: $color_white;
    }
  }

  &.-size {
    &--small {
      @include fz($font_size_label_s);
    }

    &--medium {
      @include pc() {
        @include fz($font_size_s);
      }

      @include mb() {
        @include fz($font_size_xs);
      }
    }

    &--large {
      @include fz($font_size_xxl);

      @include mb() {
        @include fz($font_size_m);
      }
    }
  }
  &_required {
    &.-colorRequired {
      &--black {
        color: $color_gray_1000;
      }
      &--white {
        color: $color_white;
      }
      &--notice {
        color: $color_notice;
      }
    }

    &_tag {
      margin-left: $spacing_4x;
      @include fz($font_size_xs);
      width: fit-content;
      padding: $spacing_1x;
      color: $color_gray_1000;
      background-color: $color_yellow;
    }
  }
}
</style>
