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

export default defineComponent({
  name: 'SelectAmountTypeTimeYear',

  props: {
    multiple: { type: Boolean, default: false },
    placeholder: {
      type: String,
      default: 'Kỳ theo năm',
    },
  },

  setup() {
    const currentYear = new Date().getFullYear()
    const options = computed(() => [
      {
        label: `Năm ${currentYear}`,
        value: currentYear,
      },
    ])

    return { options }
  },
})
</script>
