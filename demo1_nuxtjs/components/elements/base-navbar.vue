<template>
  <div class="flex items-center space-x-4 p-2 border-b bg-light-100">
    <a-icon
      class="cursor-pointer p-2"
      type="arrow-left"
      @click="$emit('back')"
    />

    <template v-if="title">
      <span class="text-lg font-bold">{{ title }}</span>
    </template>

    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'BaseNavbar',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
})
</script>
