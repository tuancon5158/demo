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
import { useGroupTitles } from '@/state'

export default defineComponent({
  name: 'SelectGroupTitles',

  props: {
    value: {
      type: [Array, String] as PropType<String | String[]>,
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
    const { groups } = useGroupTitles()
    const options = computed(() => {
      if (props.all)
        return groups.value.map(item => {
          return {
            ...item,
            label: `${item.label} - (${item.detail})`,
          }
        })

      return groups.value
        .filter(item => item.value)
        .map(item => {
          return {
            ...item,
            label: `${item.label} - (${item.detail})`,
          }
        })
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'career_paths') }
  },
})
</script>
