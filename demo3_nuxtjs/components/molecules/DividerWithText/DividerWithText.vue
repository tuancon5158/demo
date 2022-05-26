<template>
  <div class="dividerWithText">
    <span :style="{ fontSize: fontSize }">{{ msg }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DividerWithText',

  props: {
    msg: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      default: '1.5rem'
    }
  }
})
</script>

<style scoped lang="scss">
.dividerWithText {
  display: flex;
  align-items: center;
  text-align: center;

  &::before,
  &::after {
    content: '';
    height: 1px;
    flex-grow: 1;
    background-color: $color_gray_darken2;
  }

  &:not(:empty)::before {
    margin-right: $spacing_3x;
  }

  &:not(:empty)::after {
    margin-left: $spacing_3x;
  }
}
</style>
