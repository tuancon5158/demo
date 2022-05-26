<template>
  <a-select
    :options="options"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
    v-bind="$attrs"
    @change="$emit('update:externalValue', $event)"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { range } from '@vt7/utils'
export default defineComponent({
  name: 'SelectAmountTypeTimeMonth',

  props: {
    multiple: { type: Boolean, default: false },
    placeholder: {
      type: String,
      default: 'Kỳ theo tháng',
    },
  },

  setup() {
    const currentYear = new Date().getFullYear()

    const options = computed(() =>
      range(1, 13).map(index => ({
        label: `Tháng ${index} - ${currentYear}`,
        value: index,
      }))
    )

    return { options }
  },
})
</script>
