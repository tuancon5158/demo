<template>
  <a-tooltip>
    <template slot="title">{{ copied ? 'Đã copy' : 'Copy' }}</template>

    <div class="cursor-pointer" @click="copy(value)">
      {{ value }}
    </div>
  </a-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { useClipboard } from '@vueuse/core'

export default defineComponent({
  name: 'ColumnCopy',

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    valueCopy: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { copy, copied } = useClipboard()

    return {
      copy,
      copied,
      value: props.valueCopy,
    }
  },
})
</script>

<style scoped></style>
