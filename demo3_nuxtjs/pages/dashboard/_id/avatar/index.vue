<template>
  <div>
    <DashboardHeading
      :title="$t('avatars.title')"
      :subtitle="$t('avatars.subtitle')"
      icon-type="account"
    />
    <p class="dashboard_comingSoon" v-html="$t('comingSoon')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'

export default defineComponent({
  name: 'DashboardtAvatars',

  components: {
    DashboardHeading
  },

  layout: 'dashboard',

  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.dashboard {
  &_comingSoon {
    color: $color_gray_800;
    margin: 0 $spacing_4x;
  }
}
</style>
