<template>
  <base-tooltip :title="text" :disabled="text.length < maxLength">
    <div class="cursor-pointer">
      {{ truncateText(text, maxLength) }}
    </div>
  </base-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { truncateText } from '@vt7/utils'
import BaseTooltip from '../elements/base-tooltip.vue'

export default defineComponent({
  name: 'ColumnTruncateText',
  components: { BaseTooltip },

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: '',
    },
  },

  setup() {
    return {
      truncateText,
    }
  },
})
</script>

<style scoped></style>
