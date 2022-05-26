<template>
  <img :src="srcFullPath" :style="styles" alt="" />
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { toCssUnit } from '@vt7/utils'
import { withLeadingSlash } from 'ufo'

export default defineComponent({
  name: 'BaseImage',

  props: {
    src: { type: String, default: '' },
    size: { type: [Number, String], default: 40 },
  },

  setup(props) {
    const context = useContext()

    const srcFullPath = computed(() => {
      return context.$config.mediaBaseURL + withLeadingSlash(props.src)
    })

    const styles = computed(() => {
      const _size = toCssUnit(props.size)

      return { width: _size, height: _size }
    })

    return { srcFullPath, styles }
  },
})
</script>
