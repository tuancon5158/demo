<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :options="policyTypes"
    :placeholder="placeholder"
    @change="$emit('change')"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { usePolicyType } from '@/state'

export default defineComponent({
  name: 'SelectPolicyType',
  props: {
    value: { type: [Array, Number], default: undefined },
    placeholder: { type: String, default: 'Loại chính sách' },
    multiple: { type: Boolean, default: false },
  },
  setup(props) {
    const { policyTypes } = usePolicyType()

    return { policyTypes, ...useQueryValue(toRef(props, 'value'), 'type') }
  },
})
</script>
