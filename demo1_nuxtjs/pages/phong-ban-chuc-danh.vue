<template>
  <section-layout-content v-bind="content">
    <nuxt-child></nuxt-child>
  </section-layout-content>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  watch,
  ref,
} from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'

export default defineComponent({
  name: 'PhongBanChucDanh',

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
  const breadcrumbs = ['Tổ chức', 'Phòng ban chức danh']
  const route = useRoute()

  const title = ref('Quản lý đơn vị')

  const tabs = computed(() => {
    return [
      {
        label: 'Danh mục đơn vị',
        href: '/phong-ban-chuc-danh/danh-muc-don-vi',
      },
      {
        label: 'Danh mục chức danh',
        href: '/phong-ban-chuc-danh/danh-muc-chuc-danh',
      },
    ]
  })

  watch(
    () => route.value.name,
    () => {
      title.value = route.value.fullPath.includes(
        `/phong-ban-chuc-danh/danh-muc-don-vi`
      )
        ? 'Quản lý đơn vị'
        : `Quản lý chức danh`
    },
    { immediate: true, deep: true }
  )

  const content = computed(() => {
    return { breadcrumbs, tabs: tabs.value, title: title.value }
  })

  return { content, title }
}
</script>
