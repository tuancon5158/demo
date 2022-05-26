<template>
  <div class="dashboard_apply">
    <DashboardHeading
      class="dashboard_apply_title"
      icon-type="settings"
      :title="$t('workSpaceApply.title')"
      :back-link="localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })"
      :subtitle="$t('workSpaceApply.subtitle')"
    />
    <WorkSpaceIssueForm @onDelete="handleDelete" />
    <Dialogue
      v-if="visibleDialogue"
      is-delete
      :title="$t('workSpaceApply.dialogue.title')"
      :back-button="$t('workSpaceApply.dialogue.backButton')"
      :confirm-button="$t('workSpaceApply.dialogue.confirmButton')"
      @onClose="handleCloseModal"
      @onValidate="handleConfirmModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import WorkSpaceIssueForm from '~/components/organisms/WorkSpaceIssueForm/WorkSpaceIssueForm.vue'
import Dialogue from '~/components/molecules/Dialogue/Dialogue.vue'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import { useOpenCloseToggle, injectWorkspace } from '~/composables'

export default defineComponent({
  name: 'DashboardtTest',

  components: {
    WorkSpaceIssueForm,
    Dialogue,
    DashboardHeading
  },

  layout: 'dashboard-single',

  setup() {
    const { app } = useContext()
    const router = useRouter()

    const isShowModal = ref(false)
    const {
      open: handleOpenDialogue,
      close: handleCloseDialogue,
      visible: visibleDialogue
    } = useOpenCloseToggle()

    // handle open dialog confirm delete
    const handleDelete = () => {
      handleOpenDialogue()
    }

    const { getWorkspaceId } = injectWorkspace()

    // handle close dialogue and redirect spaces
    const handleCloseModal = () => {
      handleCloseDialogue()
      router.replace(app.localePath(`/dashboard/${getWorkspaceId.value}/spaces`))
    }

    // handle close dialgue modal
    const handleConfirmModal = () => {
      handleCloseDialogue()
    }

    return {
      handleDelete,
      handleCloseModal,
      isShowModal,
      handleConfirmModal,
      visibleDialogue,
      getWorkspaceId
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard {
  &_apply {
    @include mb() {
      padding: 0;
    }

    &_back {
      display: flex;
      align-items: center;
      position: relative;
    }

    &_backIcon {
      position: absolute;
      left: 6px;
    }
  }
}
</style>
