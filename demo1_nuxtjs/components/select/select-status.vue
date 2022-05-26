<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
  >
    <a-select-option
      v-for="item in statuses"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useStatus } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectStatus',
  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Trạng thái sử dung',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { statuses } = useStatus()

    return { statuses, ...useQueryValue(toRef(props, 'value'), 'status') }
  },
})
</script>
