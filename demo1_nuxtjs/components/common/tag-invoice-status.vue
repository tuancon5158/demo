<template>
  <component :is="component" :class="classes" class="font-bold">
    {{ currentInvoiceStatus.label }}
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'

export const invoiceStatuses = [
  {
    label: 'Thành công',
    value: 1,
  },
  {
    label: 'Chờ tài liệu',
    value: 0,
  },
  {
    label: 'Bị huỷ',
    value: -1,
  },
]

export default defineComponent({
  name: 'TagInvoiceStatus',
  props: {
    status: {
      type: Number,
      required: true,
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { status, text } = toRefs(props)

    const currentInvoiceStatus = computed(() => {
      return (
        invoiceStatuses.find(
          invoiceStatuse => invoiceStatuse.value === status.value
        ) || {}
      )
    })

    const component = computed(() => {
      if (text.value) return 'span'

      return 'base-tag'
    })

    const classes = computed(() => {
      if (text.value) {
        if (status.value === 1) return 'text-success'

        if (status.value === 0) return 'text-warning'

        if (status.value === -1) return 'text-error'
      } else {
        if (status.value === 1) return 'bg-success text-white'

        if (status.value === 0) return 'bg-warning text-white'

        if (status.value === -1) return 'bg-error text-white'
      }
    })

    return { currentInvoiceStatus, classes, component }
  },
})
</script>
