<template>
  <a-select
    v-model="levelModel"
    :mode="multiple ? 'multiple' : 'default'"
    :placeholder="placeholder"
    :size="size"
    @change="$emit('change')"
    @blur="$emit('blur')"
  >
    <a-select-option v-for="i in 20" :key="i" :value="i">
      {{ i }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  name: 'SelectLevel',
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
    size: {
      type: String,
      default: 'default',
    },
  },
  setup(props) {
    const levelModel = useVModel(props)

    return { levelModel }
  },
})
</script>
