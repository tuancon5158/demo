<template>
  <div class="formMessage" :class="classes">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

type FormMessageProps = {
  value: string
  type: string
}

export default defineComponent({
  name: 'FormMessage',

  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'warning',
      validator: (value: string) => {
        return ['warning', 'success'].includes(value)
      }
    }
  },

  setup(props: FormMessageProps) {
    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
.formMessage {
  display: block;
  width: 100%;
  @include fz($font_size_xxxs);
  border-radius: 5px;
  padding: $spacing_3x $spacing_4x;
  margin-bottom: $spacing_5x;

  &.-type {
    &--warning {
      color: $color_notice;
      background-color: $color_notice_lighten1;
    }
  }
}
</style>
