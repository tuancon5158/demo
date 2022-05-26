<template>
  <a-month-picker
    v-model="defaultValue"
    placeholder="Chọn theo tháng"
    @change="onChangeMonth"
  ></a-month-picker>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useMonthPicker } from '@/composables'

export default defineComponent({
  name: 'SelectMonth',

  setup() {
    return {
      ...useMonthPicker(),
    }
  },
})
</script>
