<template>
  <a-input-number
    v-model="internalValue"
    :formatter="formatter({ thousandsSeparator: ',' })"
    :placeholder="placeholder"
    class="!w-full"
  ></a-input-number>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { formatter } from '@/utils'

export default defineComponent({
  name: 'InputSearchCurrency',

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
      default: '',
    },
    routeKey: {
      type: String,
      default: '',
      required: true,
    },
  },

  setup(props) {
    return {
      formatter,
      ...useQueryValue(toRef(props, 'value'), props.routeKey, props.debounce),
    }
  },
})
</script>

<style scoped></style>
