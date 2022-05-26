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
      :options="serviceStatuses"
      :placeholder="placeholder"
      v-bind="$attrs"
    ></a-select>
  </base-tooltip>
</template>

<script lang="ts">
import { defineComponent, toRef } from '@nuxtjs/composition-api'
import { serviceStatuses, useQueryValue } from '@/composables'

export default defineComponent({
  name: 'SelectServiceStatus',

  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Trạng thái',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    return {
      serviceStatuses,
      ...useQueryValue(toRef(props, 'value'), 'status'),
    }
  },
})
</script>
