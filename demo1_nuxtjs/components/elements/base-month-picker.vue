<template>
  <a-month-picker v-model="internalValue" v-bind="$attrs" />
</template>

<script lang="ts">
import { PropType, toRef, watch } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useLazyValue, useRouteQuery } from '@/composables'

export default {
  name: 'BaseMonthPicker',
  props: {
    value: {
      type: Object as PropType<moment.Moment>,
      default: undefined,
    },
  },
  setup(props: any) {
    const { lazyValue, internalValue } = useLazyValue(toRef(props, 'value'))

    const monthQuery = useRouteQuery<string | undefined>('month')
    const yearQuery = useRouteQuery<string | undefined>('year')

    watch(internalValue, value => {
      if (!value) {
        monthQuery.value = undefined
        yearQuery.value = undefined

        return
      }

      monthQuery.value = String(value.month() + 1)

      setTimeout(() => (yearQuery.value = String(value.year())))
    })

    return { internalValue, lazyValue }
  },
}
</script>
