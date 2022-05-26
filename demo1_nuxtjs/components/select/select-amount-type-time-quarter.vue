<template>
  <a-select
    :mode="multiple ? 'multiple' : 'default'"
    :options="options"
    :placeholder="placeholder"
    v-bind="$attrs"
    @change="$emit('update:externalValue', $event)"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { range } from '@vt7/utils'

export default defineComponent({
  name: 'SelectAmountTypeTimeQuarter',

  props: {
    multiple: { type: Boolean, default: false },
    placeholder: {
      type: String,
      default: 'Kỳ theo quý',
    },
  },

  setup() {
    const currentYear = new Date().getFullYear()

    const options = computed(() =>
      range(1, 5).map(index => ({
        label: `Quý ${index} - ${currentYear}`,
        value: index,
      }))
    )

    return { options }
  },
})
</script>
