<template>
  <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      v-if="direction === 'back'"
      d="M12 18.6603L27 10V27.3205L12 18.6603Z"
      :fill="colorArrow"
    />
    <path
      v-if="direction === 'next'"
      d="M27 18.6603L12 27.3205L12 10L27 18.6603Z"
      :fill="colorArrow"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'IconArrowPagination',

  props: {
    direction: {
      type: String,
      default: 'next',
      validator: (value: string) => {
        return ['back', 'next'].includes(value)
      }
    },
    colorArrow: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['white', 'black'].includes(value)
      }
    }
  }
})
</script>
