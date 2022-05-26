<template>
  <base-tag class="font-bold" :class="classes">Lv. {{ level }}</base-tag>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

type Level = 1 | 2 | 3 | 4 | 5

export default defineComponent({
  name: 'TagLevel',
  props: {
    level: {
      type: Number as PropType<Level>,
      required: true,
    },
  },
  setup(props) {
    const classes = computed(() => {
      if (props.level === 1) return 'bg-light-400'

      if (props.level === 2) return 'bg-blue-400 text-white'

      if (props.level === 3) return 'bg-teal-300 text-white'

      if (props.level === 4) return 'bg-green-300 text-white'

      if (props.level === 5) return 'bg-purple-300 text-white'

      return 'bg-light-400'
    })

    return { classes }
  },
})
</script>
