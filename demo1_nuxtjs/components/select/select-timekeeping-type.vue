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
  name: 'SelectTimekeepingType',

  props: {
    value: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Loại chấm công',
    },
  },

  setup(props) {
    const options = computed(() => {
      return [
        { value: 'CHECKIN', label: 'Checkin' },
        { value: 'CHECKOUT', label: 'Checkout' },
      ]
    })

    return {
      options,
      ...useQueryValue(toRef(props, 'value'), 'type'),
    }
  },
})
</script>
