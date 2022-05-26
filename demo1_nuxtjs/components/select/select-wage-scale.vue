<template>
  <a-select
    v-model="wageScaleModel"
    :mode="multiple ? 'multiple' : 'default'"
    :options="options"
    :placeholder="placeholder"
    :size="size"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'
import { useWageScales } from '@/state'

export default defineComponent({
  name: 'SelectWageScale',
  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  setup(props) {
    const wageScaleModel = useVModel(props)

    const { wageScales } = useWageScales()

    const options = computed(() => {
      return [...wageScales.value]
        .sort((a, b) => b.status - a.status)
        .map(item => ({
          value: item.id,
          label: item.code,
          disabled: item.status === 0,
        }))
    })

    return { wageScaleModel, options }
  },
})
</script>
