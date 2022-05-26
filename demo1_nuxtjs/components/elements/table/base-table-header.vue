<template>
  <div class="base-table-header">
    <table>
      <colgroup v-if="colgroup.length">
        <col
          v-for="(col, key) in colgroup"
          :key="key"
          :style="genStyleCol(col)"
        />
      </colgroup>
      <thead>
        <tr>
          <slot></slot>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useColgroup from './useColgroup'

export default defineComponent({
  name: 'BaseTableHeader',
  setup() {
    const { colgroup, genStyleCol } = useColgroup()

    return { colgroup, genStyleCol }
  },
})
</script>
