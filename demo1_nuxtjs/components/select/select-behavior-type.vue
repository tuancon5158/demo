<template>
  <a-select
    v-model="internalValue"
    :placeholder="placeholder"
    :mode="multiple ? 'multiple' : 'default'"
    :options="behaviorTypes"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useBehaviorType } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectBehaviorType',
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
    const { behaviorTypes } = useBehaviorType()

    return {
      behaviorTypes,
      ...useQueryValue(toRef(props, 'value'), 'type'),
    }
  },
})
</script>
