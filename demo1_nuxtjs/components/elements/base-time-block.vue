<template>
  <base-tooltip :title="description">
    <div class="flex flex-col items-center">
      <span class="text-xs">{{ times }}h</span>
      <span class="h-4 w-8 rounded" :style="styles"></span>
    </div>
  </base-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseTimeBlock',
  props: {
    times: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        backgroundColor: props.color,
      }
    })

    return { styles }
  },
})
</script>
