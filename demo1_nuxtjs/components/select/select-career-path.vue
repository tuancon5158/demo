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
import { useCareerPathTitles } from '@/state'

export default defineComponent({
  name: 'SelectCarrerPath',

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
    const { careerPaths } = useCareerPathTitles()
    const options = computed(() => {
      if (props.all) return careerPaths.value

      return careerPaths.value.filter(item => item.value)
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'career_paths') }
  },
})
</script>
