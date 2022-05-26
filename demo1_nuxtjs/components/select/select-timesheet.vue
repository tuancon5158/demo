<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :options="options"
    :placeholder="placeholder"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@nuxtjs/composition-api'
import { useTimesheets } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectTimesheet',

  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Timesheet áp dụng',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { timesheets } = useTimesheets()

    const options = computed(() => {
      return [...timesheets.value]
        .sort((a, b) => b.status - a.status)
        .map(item => {
          const note = item.note ? ` - ${item.note}` : ''

          return {
            value: item.id,
            label: `${item.name}${note}`,
            disabled: item.status === 0,
          }
        })
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'time_sheet_id') }
  },
})
</script>
