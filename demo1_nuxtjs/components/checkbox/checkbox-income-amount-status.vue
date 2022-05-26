<template>
  <a-checkbox-group
    v-model="internalValue"
    :options="options"
    class="col-span-2"
  />
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'CheckboxIncomeAmountStatus',

  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
  },

  setup(props) {
    const options = computed(() => {
      return [
        { label: 'Áp dụng', value: 'APPROVED' },
        { label: 'Bị huỷ', value: 'REJECTED' },
      ]
    })

    return {
      options,
      ...useQueryValue(toRef(props, 'value'), 'status'),
    }
  },
})
</script>
