<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :options="options"
    :placeholder="placeholder"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectIncomeAmountType',

  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Nguồn khoản',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const options = computed(() => [
      {
        label: 'Trong hệ thống',
        value: 1,
      },
      {
        label: 'Ngoài hệ thống',
        value: 8,
      },
    ])

    return {
      options,
      ...useQueryValue(toRef(props, 'value'), 'type_id'),
    }
  },
})
</script>
