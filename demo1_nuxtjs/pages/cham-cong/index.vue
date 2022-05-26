<template>
  <section-layout-content v-bind="content">
    <nuxt-child></nuxt-child>
  </section-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'

export default defineComponent({
  name: 'ChamCong',

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
  const title = 'Chấm công'
  const breadcrumbs = ['Lịch làm việc', 'Chấm công']
  const tabs = computed(() => {
    return [
      { label: 'Lịch sử', href: '/cham-cong/lich-su' },
      { label: 'Cài đặt chung', href: '/cham-cong/cai-dat-chung' },
      { label: 'Vi phạm', href: '/cham-cong/vi-pham' },
    ]
  })

  const content = computed(() => {
    return { breadcrumbs, title, tabs: tabs.value }
  })

  return { content }
}
</script>
