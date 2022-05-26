<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
    v-bind="$attrs"
  >
    <a-select-option
      v-for="item in orientations"
      :key="item.id"
      :value="item.id"
    >
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useOrientation } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectOrientation',
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
    const { orientations } = useOrientation()

    return {
      orientations,
      ...useQueryValue(toRef(props, 'value'), 'career_path'),
    }
  },
})
</script>
