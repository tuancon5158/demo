<template>
  <div class="dashboard_spaceList">
    <DashboardHeading
      :title="$t('spaceApplyUpload.title')"
      :subtitle="$t('spaceApplyUpload.subtitle')"
      :back-link="localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })"
    />
    <SpaceIssueForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import SpaceIssueForm from '~/components/organisms/SpaceIssueForm/SpaceIssueForm.vue'
import { injectWorkspace } from '~/composables'

export default defineComponent({
  name: 'DashboardSpacesApplyUpload',

  components: {
    DashboardHeading,
    SpaceIssueForm
  },

  layout: 'dashboard-single',

  setup() {
    const { getWorkspaceId } = injectWorkspace()

    return { getWorkspaceId }
  }
})
</script>

<style scoped lang="scss">
.dashboard_spaceList {
  width: 100%;
}
</style>
