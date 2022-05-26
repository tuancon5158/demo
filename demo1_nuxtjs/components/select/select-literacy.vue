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
import { computed, defineComponent, ref, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectLiteracy',
  props: {
    allowClear: {
      type: Boolean,
      default: true,
    },
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
    all: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const literacys = ref([
      { value: '1', label: 'Không có' },
      { value: '2', label: 'THCS' },
      { value: '3', label: 'THPT' },
      { value: '4', label: 'Trung cấp' },
      { value: '5', label: 'Cao đẳng' },
      { value: '6', label: 'Đại học' },
      { value: '7', label: 'Cao học' },
      { value: '8', label: 'Tiến sĩ' },
    ])

    const options = computed(() => {
      if (props.all) return literacys.value

      return literacys.value.filter(item => item.value)
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'literacy') }
  },
})
</script>
