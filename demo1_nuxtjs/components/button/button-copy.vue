<template>
  <a-tooltip>
    <template slot="title">{{ copied ? 'Đã copy' : 'Copy' }}</template>

    <button
      class="transition-all transform hover:scale-125 text-primary"
      @click="copy(value)"
    >
      <a-icon type="copy" />
    </button>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useClipboard } from '@vueuse/core'

export default defineComponent({
  name: 'ButtonCopy',

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },

  setup() {
    const { copy, copied } = useClipboard()

    return { copy, copied }
  },
})
</script>
