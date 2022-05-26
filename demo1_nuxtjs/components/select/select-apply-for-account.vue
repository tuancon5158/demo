<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :options="applyForAccounts"
    placeholder="Kỳ áp dụng"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { useApplyForAccount } from '@/state'

export default defineComponent({
  name: 'SelectApplyForAccount',

  props: {
    value: { type: [Array, Number], default: undefined },
    multiple: { type: Boolean, default: false },
  },

  setup(props) {
    const { applyForAccounts } = useApplyForAccount()

    return {
      applyForAccounts,
      ...useQueryValue(toRef(props, 'value'), 'apply_for_account'),
    }
  },
})
</script>
