<template>
  <div class="base-table" :class="tableClasses">
    <div class="base-table__wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  toRefs,
  ref,
  computed,
} from '@nuxtjs/composition-api'
import { Colgroup } from '@/components/elements/table/useColgroup'

export default defineComponent({
  name: 'BaseTable',
  props: {
    scroll: {
      type: Number,
      default: 0,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    hovered: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { scroll, striped, hovered, borderless, bordered, small } =
      toRefs(props)
    const colgroup = ref<Colgroup[]>([])

    provide('scroll', scroll)
    provide('colgroup', colgroup)

    const tableClasses = computed(() => {
      return {
        'base-table--striped': striped.value,
        'base-table--hovered': hovered.value,
        'base-table--small': small.value,
        'base-table--borderless': borderless.value,
        'base-table--bordered': bordered.value,
      }
    })

    return { tableClasses }
  },
})
</script>

<style>
.base-table {
  @apply min-w-max w-full table-auto;
}

.base-table__wrapper {
  @apply overflow-x-hidden overflow-y-auto;
}

.base-table table {
  @apply w-full;
}

.base-table thead > tr {
  @apply bg-gray-200 text-gray-600 uppercase text-sm leading-normal;
}

.base-table thead > tr > th {
  @apply py-3 px-6 text-left;

  overflow-wrap: break-word;
}

.base-table tbody {
  @apply text-gray-600 text-sm;
}

.base-table tbody > tr {
  @apply border-b border-gray-200;
}

.base-table tbody > tr > td {
  @apply py-3 px-6 text-left;

  overflow-wrap: break-word;
}

.base-table.base-table--hovered tbody > tr:hover {
  @apply bg-gray-100;
}

.base-table.base-table--bordered tbody > tr > td {
  @apply border;
}

.base-table.base-table--borderless tbody > tr,
.base-table.base-table--borderless tbody > tr > td {
  border-width: 0;
}

.base-table.base-table--small tbody > tr > td,
.base-table.base-table--small thead > tr > th {
  @apply py-2 px-4 text-xs;
}
</style>
