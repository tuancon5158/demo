<template>
  <a-checkbox-group v-model="internalValue" :options="options" />
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { E_Level } from '@/enums'

export default defineComponent({
  name: 'CheckboxDepartmmentStatus',

  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
  },

  setup(props) {
    const options = computed(() => {
      return [
        { label: 'Áp dụng', value: E_Level.Approved },
        { label: 'Bị huỷ', value: E_Level.Cancel },
      ]
    })

    return {
      options,
      ...useQueryValue(toRef(props, 'value'), 'status'),
    }
  },
})
</script>
