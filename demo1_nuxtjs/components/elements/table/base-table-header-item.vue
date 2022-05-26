<template>
  <th>
    <slot></slot>
  </th>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  toRefs,
  ref,
  Ref,
} from '@nuxtjs/composition-api'
import { Colgroup } from '@/components/elements/table/useColgroup'

export default defineComponent({
  name: 'BaseTableHeaderItem',
  props: {
    width: {
      type: Number,
      default: undefined,
    },
    align: {
      type: String,
      default: 'left',
    },
  },
  setup(props) {
    const { width, align } = toRefs(props)
    const colgroup = inject('colgroup', ref([])) as Ref<Colgroup[]>

    colgroup.value.push({ width: width.value, align: align.value })
  },
})
</script>
