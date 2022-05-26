<template>
  <a-select
    v-model="internalValue"
    :placeholder="placeholder"
    :mode="multiple ? 'multiple' : 'default'"
    :options="incomeAmountAccount"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useIncomeAmountAccount } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectIncomeAmountDuration',

  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Loại kì khoản',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { incomeAmountAccount } = useIncomeAmountAccount()

    return {
      incomeAmountAccount,
      ...useQueryValue(toRef(props, 'value'), 'duration'),
    }
  },
})
</script>
