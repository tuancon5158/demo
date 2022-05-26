<template>
  <a-badge v-if="type === 'CHECKIN'" status="success" text="Check in" />
  <a-badge v-else status="error" text="Check out" />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ITimeKeepingType } from '@/interfaces/timeKeeping'

export default defineComponent({
  name: 'SectionType',

  props: {
    type: {
      type: String as PropType<ITimeKeepingType>,
      default: '',
    },
  },
})
</script>
