<template>
  <div v-if="$device.isMobile" class="sidebarMobile">
    <Sidebar is-mobile />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// components
import Sidebar from '~/components/organisms/Sidebar/Sidebar.vue'

export default defineComponent({
  name: 'Dashboard',

  components: {
    Sidebar
  },

  layout: 'dashboard',

  setup() {}
})
</script>

<style scoped>
.sidebarMobile {
  width: 100vw;
}
</style>
