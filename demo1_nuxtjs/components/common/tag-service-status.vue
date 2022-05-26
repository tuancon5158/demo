<template>
  <span v-if="text" :class="classes" class="font-bold">
    {{ currentServiceStatus.label }}
  </span>
  <base-tag v-else :class="classes" class="font-bold">
    {{ currentServiceStatus.label }}
  </base-tag>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from '@nuxtjs/composition-api'
import { useServiceStatus } from '@/composables'

export default defineComponent({
  name: 'TagServiceStatus',
  props: {
    status: {
      type: Number,
      required: true,
    },
    text: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { status } = toRefs(props)

    const { currentServiceStatus, isPending, isSuccess, isCancel } =
      useServiceStatus(status)

    const classes = computed(() => {
      if (props.text) {
        if (isSuccess.value) return 'text-success'

        if (isPending.value) return 'text-warning'

        if (isCancel.value) return 'text-error'
      } else {
        if (isSuccess.value) return 'bg-success text-white'

        if (isPending.value) return 'bg-warning text-white'

        if (isCancel.value) return 'bg-error text-white'
      }
    })

    return { currentServiceStatus, classes }
  },
})
</script>
