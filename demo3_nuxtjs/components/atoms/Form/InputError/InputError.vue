<template>
  <span class="inputError">{{ value }}</span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InputError',

  props: {
    value: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.inputError {
  @include fz($font_size_xxxs);
  color: $color_notice;
  line-height: 1.5;
  display: block;
  // keep current 2px
  margin: $spacing_1x 2px;
}
</style>
