<template>
  <span :class="classes" class="py-1 px-2 rounded-sm">{{ label }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useStatusIncomeAmountDetail } from '@/state'

export default defineComponent({
  name: 'BadgeStatus',

  props: {
    status: {
      type: Number,
      required: true,
    },
    date: {
      type: Object as PropType<moment.Moment>,
      default: () => moment(),
    },
  },

  setup(props) {
    const { getStatusLabel, getStatus } = useStatusIncomeAmountDetail()

    const isSameMonth = computed(() => {
      return props.date?.isSame(moment().format('YYYY-MM-DD'), 'month')
    })

    const label = computed(() => {
      if (props.status === 0) {
        return isSameMonth.value ? 'Đang thực hiện' : 'Chờ duyệt'
      }

      return getStatusLabel(props.status)
    })

    const classes = computed(() => {
      const status = getStatus(props.status)

      return status?.classes
    })

    return { label, classes, isSameMonth }
  },
})
</script>

<style lang="postcss">
.badge-blue {
  @apply bg-blue-400 text-white;
}

.badge-green {
  @apply bg-green-300 text-white;
}

.badge-warning {
  @apply bg-yellow-300 text-white;
}

.badge-error {
  @apply bg-red-300 text-white;
}
</style>
