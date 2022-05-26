<template>
  <div class="dashboard_spaceList">
    <div>contents</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DashboardtTest',

  components: {},

  layout: 'dashboard',

  setup() {}
})
</script>

<style scoped lang="scss">
.dashboard_spaceList {
  background-color: $color_yellow_300;
  height: 100px;
  width: 100%;
}
</style>
