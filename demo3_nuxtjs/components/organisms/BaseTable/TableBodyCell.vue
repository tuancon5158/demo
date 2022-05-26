<template>
  <td class="td">
    <slot />
  </td>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TableBodyCell'
})
</script>
<style lang="scss" scoped>
.td {
  padding: $spacing_3x $spacing_5x;
}
</style>
