<template>
  <a-select
    v-model="workStatusModel"
    :mode="multiple ? 'multiple' : 'default'"
    :options="options"
    :placeholder="placeholder"
  ></a-select>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'
import { useWorkStatuses } from '@/state/useWorkStatus'

export default defineComponent({
  name: 'SelectWorkStatus',

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
  },

  setup(props) {
    const workStatusModel = useVModel(props)

    const { workStatuses } = useWorkStatuses()

    const options = computed(() => {
      return [...workStatuses.value]
        .sort((a, b) => b.status - a.status)
        .map(item => ({
          value: item.id,
          label: item.name,
          disabled: item.status === 0,
        }))
    })

    return { workStatusModel, options }
  },
})
</script>
