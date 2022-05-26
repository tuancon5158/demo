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
  name: 'SelectGender',
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
    const genders = ref([
      { value: 0, label: 'Nam' },
      { value: 1, label: 'Nữ' },
    ])

    const options = computed(() => {
      if (props.all) return genders.value

      return genders.value.filter(item => item.value)
    })

    return { options, ...useQueryValue(toRef(props, 'value'), 'type') }
  },
})
</script>
