<template>
  <div class="newWorkspace">
    <DashboardHeading
      :title="$t('workSpaceNew.title')"
      :subtitle="$t('workSpaceNew.subtitle')"
      :back-link="
        localePath({
          name: 'dashboard-id-spaces',
          params: { id: getWorkspaceId }
        })
      "
    />
    <WorkSpaceRegisterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import WorkSpaceRegisterForm from '~/components/organisms/WorkSpaceRegisterForm/WorkSpaceRegisterForm.vue'
import { injectWorkspace } from '@/composables'

export default defineComponent({
  name: 'DashboardNewWorkspace',

  components: {
    DashboardHeading,
    WorkSpaceRegisterForm
  },

  layout: 'dashboard-single',

  setup() {
    const { getWorkspaceId } = injectWorkspace()

    return {
      getWorkspaceId
    }
  }
})
</script>

<style scoped lang="scss">
.newWorkspace {
  width: 100%;
  max-width: $dashboard_contents_W;
  margin: 0 auto;
}
.loading {
  margin-top: $spacing_20x;
}
</style>
