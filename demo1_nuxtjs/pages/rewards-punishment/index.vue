<template>
  <section-layout-content v-bind="content">
    <nuxt-child></nuxt-child>
  </section-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'

export default defineComponent({
  name: 'ThuongPhat',

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
  const title = 'Thi đua'
  const breadcrumbs = ['Thi đua', 'Thưởng phạt']
  const tabs = computed(() => {
    return [
      { label: 'Cá nhân', href: '/rewards-punishment/personal' },
      { label: 'Chi nhánh', href: '/rewards-punishment/branch' },
    ]
  })

  const content = computed(() => {
    return { breadcrumbs, title, tabs: tabs.value }
  })

  return { content }
}
</script>
