<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
    :allow-clear="allowClear"
  >
    <a-select-option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from '@nuxtjs/composition-api'
import { useLevelReportDepartment } from '@/state'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectLevelReportDepartment',
  props: {
    value: {
      type: [Array, String],
      default: undefined,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    all: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { levels } = useLevelReportDepartment()

    const options = computed(() => {
      if (props.all) return levels.value

      return levels.value.filter(item => item.value)
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'level') }
  },
})
</script>
