<template>
  <a-select
    v-model="behaviorApplyFor"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
    :size="size"
    :options="behaviorApplyForItems"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'
import { useBehaviorApplyFor } from '@/state'

export default defineComponent({
  name: 'SelectBehaviorApplyFor',
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
    const behaviorApplyFor = useVModel(props)

    const { behaviorApplyForItems } = useBehaviorApplyFor()

    return { behaviorApplyFor, behaviorApplyForItems }
  },
})
</script>
