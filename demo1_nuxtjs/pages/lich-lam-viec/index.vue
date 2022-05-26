<template>
  <section-layout-content v-bind="content">
    <nuxt-child></nuxt-child>
  </section-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'

export default defineComponent({
  name: 'LichLamViec',

  components: {
    SectionLayoutContent,
  },

  setup() {
    return {
      ...useLayoutContent(),
    }
  },
})

const useLayoutContent = () => {
  const title = 'Lịch làm việc'
  const breadcrumbs = ['Lịch làm việc']
  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
