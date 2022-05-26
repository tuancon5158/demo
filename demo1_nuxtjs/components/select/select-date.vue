<template>
  <a-date-picker v-model="defaultValue" @change="onChangeDate" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useDatePicker } from '@/composables'

export default defineComponent({
  name: 'SelectDate',

  setup() {
    return {
      ...useDatePicker(),
    }
  },
})
</script>
