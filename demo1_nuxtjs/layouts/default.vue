<template>
  <a-config-provider :locale="locale">
    <div class="layout-default h-screen">
      <a-layout class="h-full">
        <the-sider></the-sider>

        <nuxt></nuxt>
      </a-layout>
    </div>
  </a-config-provider>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { locale } from '@/config/locale'

import TheSider from '@/components/templates/the-sider.vue'

export default defineComponent({
  name: 'Default',

  components: { TheSider },

  setup() {
    return { locale }
  },
})
</script>

<style scoped>
.trigger {
  line-height: 64px;
  transition: color 0.3s;
}
</style>
