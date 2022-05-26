<template>
  <a-badge
    v-if="status === 'APPROVED' || status === 1"
    status="success"
    text="Áp dụng"
  />
  <a-badge
    v-else-if="status === 'REJECTED' || status === -1"
    status="default"
    text="Bị huỷ"
  />
  <a-badge
    v-else-if="status === 'PENDING' || status === 0"
    status="warning"
    text="Chưa được duyệt"
  />
  <span v-else>Không phù hợp</span>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from '@nuxtjs/composition-api'
import { useServiceStatus } from '@/composables'
type Status = 'APPROVED' | 'REJECTED' | 'PENDING' | -1 | 0 | 1

export default defineComponent({
  name: 'SectionStatus',

  props: {
    status: {
      type: [String, Number] as PropType<Status>,
      required: true,
    },
  },

  setup(props) {
    const { status } = toRefs(props)

    return {
      ...useServiceStatus(status),
    }
  },
})
</script>
