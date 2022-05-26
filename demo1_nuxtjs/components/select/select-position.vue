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
import { usePositions } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectPosition',
  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Chức danh',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { positions } = usePositions()

    const options = computed(() => {
      return [...positions.value]
        .sort((a, b) => b.status - a.status)
        .map(item => ({
          value: item.id,
          label: item.name,
          disabled: item.status === 0,
        }))
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'title_id') }
  },
})
</script>
