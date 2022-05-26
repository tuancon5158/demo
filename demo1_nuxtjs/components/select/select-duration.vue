<template>
  <a-select
    :placeholder="placeholder"
    @change="$emit('update:duration-value', $event)"
  >
    <a-select-option :value="E_Duration.Month">Kỳ theo Tháng</a-select-option>
    <a-select-option :value="E_Duration.Quarter">Kỳ theo Quý</a-select-option>
    <a-select-option :value="E_Duration.Year">Kỳ theo Năm</a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { E_Duration } from '@/enums/incomeAmount'

export default defineComponent({
  name: 'SelectDuration',

  props: {
    placeholder: {
      type: String,
      default: 'Chọn loại kỳ khoản',
    },
  },

  setup() {
    return {
      E_Duration,
    }
  },
})
</script>
