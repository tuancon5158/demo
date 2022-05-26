<template>
  <a-date-picker
    :value="defaultValue"
    :default-value="defaultValue"
    class="!w-full"
    type="date"
    v-bind="$attrs"
    v-on="{ ...$listeners, change: onChangeDate }"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'BaseDatepicker',
  props: {
    value: {
      type: String,
      required: true,
    },
    routeKey: {
      type: String,
      default: 'date',
    },
  },
  setup(props, { emit }) {
    const defaultValue = computed(() => {
      return props.value ? moment(props.value) : null
    })

    const onChangeDate = (_: moment.Moment, dateString: string) => {
      emit('input', dateString || '')
    }

    return {
      defaultValue,
      onChangeDate,
      ...useQueryValue(toRef(props, 'value'), props.routeKey),
    }
  },
})
</script>
