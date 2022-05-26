<template>
  <a-select
    v-model="internalValue"
    :options="options"
    class="!w-full"
  ></a-select>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { useTimesheets } from '@/state'

export default defineComponent({
  name: 'SelectListingTimesheet',

  props: {
    value: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },

  setup(props) {
    const { timesheets } = useTimesheets()

    const internalValue = props.value.length ? ref(props.value[0]) : ref()

    const options = computed(() => {
      return timesheets.value
        .filter(timesheet => {
          return props.value?.includes(timesheet.id)
        })
        .map(item => {
          const note = item.note ? ` - ${item.note}` : ''

          return {
            value: item.id,
            label: `${item.name}${note}`,
          }
        })
    })

    return { options, internalValue }
  },
})
</script>
