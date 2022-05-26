<template>
  <g>
    <path
      d="M12 6L10.9425 4.9425L6.75 9.1275V0H5.25V9.1275L1.065 4.935L0 6L6 12L12 6Z"
      :fill="fill"
    />
  </g>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'IconArrowDown',

  props: {
    fill: {
      type: String,
      default: '#E0DFE2'
    }
  }
})
</script>
