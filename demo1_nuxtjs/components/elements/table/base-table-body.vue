<template>
  <div class="base-table-body" :style="styles">
    <table>
      <colgroup v-if="colgroup.length">
        <col
          v-for="(col, key) in colgroup"
          :key="key"
          :style="genStyleCol(col)"
        />
      </colgroup>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  ref,
  Ref,
} from '@nuxtjs/composition-api'
import useColgroup from '@/components/elements/table/useColgroup'

export default defineComponent({
  name: 'BaseTableBody',
  setup() {
    const scroll = inject<Ref>('scroll', ref(0))

    const styles = computed(() => {
      if (!scroll.value) return {}

      return {
        'overflow-y': 'scroll',
        'max-height': `${scroll.value}px`,
      }
    })

    const { colgroup, genStyleCol } = useColgroup()

    return { styles, colgroup, genStyleCol }
  },
})
</script>
