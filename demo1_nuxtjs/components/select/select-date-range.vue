<template>
  <a-range-picker v-model="defaultValue" @change="onChangeDateRange">
    <a-icon slot="suffixIcon" type="calendar" />
  </a-range-picker>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useDateRangePicker } from '@/composables'

export default defineComponent({
  name: 'SelectDateRange',

  setup() {
    return {
      ...useDateRangePicker(),
    }
  },
})
</script>
