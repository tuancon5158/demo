<template>
  <section-layout-content v-bind="content">
    <nuxt-child></nuxt-child>
  </section-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'

export default defineComponent({
  name: 'DuyetDeXuat',

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
  const title = 'Duyệt đề xuất'
  const breadcrumbs = ['Lịch làm việc', 'Duyệt đề xuất']
  const tabs = computed(() => {
    return [
      {
        label: 'Đăng ký làm thêm',
        href: '/duyet-de-xuat/dang-ky-lam-them',
      },
      {
        label: 'Xin nghỉ phép',
        href: '/duyet-de-xuat/xin-nghi-phep',
      },
      {
        label: 'Làm ngoài',
        href: '/duyet-de-xuat/lam-ngoai',
      },
      {
        label: 'Công tác',
        href: '/duyet-de-xuat/cong-tac',
      },
    ]
  })

  const content = computed(() => {
    return { breadcrumbs, title, tabs: tabs.value }
  })

  return { content }
}
</script>
