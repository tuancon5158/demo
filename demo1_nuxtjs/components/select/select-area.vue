<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
    v-bind="$attrs"
  >
    <a-select-option
      v-for="item in areas"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { useArea } from '@/state'

export default defineComponent({
  name: 'SelectArea',
  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Khu vực',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { areas } = useArea()

    return {
      areas,
      ...useQueryValue(toRef(props, 'value'), 'area_id'),
    }
  },
})
</script>
