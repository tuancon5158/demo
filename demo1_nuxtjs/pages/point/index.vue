<template>
  <section-layout-content v-bind="content">
    <nuxt-child></nuxt-child>
  </section-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'

export default defineComponent({
  name: 'Point',

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
  const breadcrumbs = ['Thi đua', 'Point']
  const tabs = computed(() => {
    return [
      { label: 'Công ty', href: '/point/company' },
      { label: 'Cá nhân', href: '/point/personal' },
      { label: 'Chi nhánh', href: '/point/branch' },
    ]
  })

  const content = computed(() => {
    return { breadcrumbs, title, tabs: tabs.value }
  })

  return { content }
}
</script>
