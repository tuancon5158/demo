<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :options="outsideTypes"
    :placeholder="placeholder"
    @change="$emit('change')"
  ></a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useOutsideType } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectOutsideType',

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
    const { outsideTypes } = useOutsideType()

    return { outsideTypes, ...useQueryValue(toRef(props, 'value'), 'type') }
  },
})
</script>
