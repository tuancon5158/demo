<template>
  <a-select
    v-model="internalValue"
    :options="options"
    :placeholder="placeholder"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectTimekeepingStatus',

  props: {
    value: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Tình trạng chấm công',
    },
  },

  setup(props) {
    const options = computed(() => {
      return [
        { value: 'APPROVED', label: 'Duyệt' },
        { value: 'PENDING', label: 'Chờ duyệt' },
        { value: 'REJECTED', label: 'Từ chối' },
      ]
    })

    return {
      options,
      ...useQueryValue(toRef(props, 'value'), 'status'),
    }
  },
})
</script>
