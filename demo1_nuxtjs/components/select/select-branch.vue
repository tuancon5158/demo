<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :options="options"
    :placeholder="placeholder"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRef,
} from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { useBranchs } from '@/state'

export default defineComponent({
  name: 'SelectBranch',

  props: {
    value: {
      type: [Array, Number] as PropType<number | number[]>,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Chi nhánh',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { branches } = useBranchs()

    const options = computed(() => {
      return branches.value.map(branch => ({
        label: branch.name,
        value: branch.id,
      }))
    })

    return {
      options,
      ...useQueryValue(toRef(props, 'value'), 'branch_id'),
    }
  },
})
</script>
