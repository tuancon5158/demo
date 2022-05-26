<template>
  <a-select
    v-model="internalValue"
    :options="options"
    class="!w-full"
  ></a-select>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { usePositions } from '@/state'

export default defineComponent({
  name: 'SelectListingPosition',

  props: {
    value: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },

  setup(props) {
    const { positions } = usePositions()

    const internalValue = props.value.length ? ref(props.value[0]) : ref()

    const options = computed(() => {
      return positions.value
        .filter(position => props.value?.includes(position.id))
        .map(item => ({ value: item.id, label: item.name }))
    })

    return { options, internalValue }
  },
})
</script>
