<template>
  <a-input v-model="internalValue" :placeholder="placeholder">
    <a-icon slot="addonAfter" style="opacity: 0.85" type="search" />
  </a-input>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'

export default defineComponent({
  name: 'InputSearch',

  props: {
    value: {
      type: String,
      default: '',
    },
    debounce: {
      type: Number,
      default: 300,
    },
    placeholder: {
      type: String,
      default: 'Tìm kiếm',
    },
  },

  setup(props) {
    return {
      ...useQueryValue(toRef(props, 'value'), 'search', props.debounce),
    }
  },
})
</script>
