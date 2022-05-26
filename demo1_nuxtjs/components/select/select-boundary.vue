<template>
  <base-tooltip
    :disabled="multiple ? !internalValue.length : !internalValue"
    placement="top"
  >
    <template slot="title">
      <span>{{ placeholder }}</span>
    </template>
    <a-select
      v-model="internalValue"
      :mode="multiple ? 'multiple' : 'default'"
      :options="options"
      :placeholder="placeholder"
      :allow-clear="allowClear"
      v-bind="$attrs"
    ></a-select>
  </base-tooltip>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRef,
} from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { useBoundaryTitles } from '@/state'

export default defineComponent({
  name: 'SelectBoundary',

  props: {
    value: {
      type: [Array, Number] as PropType<number | number[]>,
      default: undefined,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    placeholder: { type: String, default: 'Phòng ban' },
    multiple: { type: Boolean, default: false },
    all: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const { boundarys } = useBoundaryTitles()
    const options = computed(() => {
      if (props.all) return boundarys.value

      return boundarys.value.filter(boundary => boundary.value)
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'boundary') }
  },
})
</script>
