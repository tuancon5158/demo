<template>
  <div class="dashboard_registerNewSpace">
    <transition name="fade">
      <div v-if="isLoading" class="loading">
        <Spinner size="medium" color="secondary" bg-color="gray" />
      </div>
    </transition>
    <template v-if="!isLoading">
      <DashboardHeading
        :back-link="localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })"
        :title="$t('spaceNew.title')"
        icon-type="space"
      />
      <div class="dashboard_registerNewSpace_content">
        <div class="dashboard_registerNewSpace_form">
          <SpaceRegisterForm
            :is-register="true"
            ref="spaceRegisterForm"
            @validateDone="openDialogue()"
            @closeDialogue="closeDialogue()"
            @createSpaceDone="openCompletedModal()"
          />
        </div>
        <Dialogue
          v-if="visibleDialogue"
          :title="$t('spaceNew.dialogueSave.title')"
          :back-button="$t('spaceNew.dialogueSave.backButton')"
          :confirm-button="$t('spaceNew.dialogueSave.confirmButton')"
          @onClose="closeDialogue"
          @onValidate="handleSubmit"
        />
      </div>
      <SpaceUploadCompletedModal v-if="visibleCompletedModal" @onClose="handleCloseModal" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import SpaceRegisterForm from '~/components/organisms/SpaceRegisterForm/SpaceRegisterForm.vue'
import SpaceUploadCompletedModal from '~/components/organisms/Modal/SpaceUploadCompletedModal/SpaceUploadCompletedModal.vue'
import Dialogue from '~/components/molecules/Dialogue/Dialogue.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import { injectWorkspace, useOpenCloseToggle, useFetchUser } from '~/composables'

export default defineComponent({
  name: 'DashboardtNewSpace',

  components: {
    DashboardHeading,
    SpaceRegisterForm,
    Dialogue,
    SpaceUploadCompletedModal,
    Spinner
  },

  layout: 'dashboard',

  setup() {
    const { app } = useContext()
    const router = useRouter()

    // redirect /dashboard/spaces if member role is 3
    const { fetchUserMemberRole, isLoading } = useFetchUser()

    fetchUserMemberRole()

    // Get workspace Id
    const { getWorkspaceId } = injectWorkspace()
    const id = getWorkspaceId.value || ''

    const spaceRegisterForm = ref()
    // handle open / close Dialogue (page control modal)
    const {
      open: openDialogue,
      close: closeDialogue,
      visible: visibleDialogue
    } = useOpenCloseToggle()

    const {
      open: openCompletedModal,
      close: closeCompletedModal,
      visible: visibleCompletedModal
    } = useOpenCloseToggle()

    const handleCloseModal = () => {
      closeCompletedModal()
      router.push(app.localePath({ name: 'dashboard-id-spaces', params: { id } }))
    }

    const handleSubmit = () => {
      spaceRegisterForm.value.handleSubmit()
    }

    const handleValidate = () => {
      spaceRegisterForm.value.handleValidate()
    }

    return {
      isLoading,
      handleSubmit,
      visibleDialogue,
      getWorkspaceId,
      visibleCompletedModal,
      handleCloseModal,
      closeDialogue,
      openDialogue,
      openCompletedModal,
      handleValidate,
      spaceRegisterForm
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard_registerNewSpace {
  width: 100%;
}
.loading {
  margin-top: $spacing_20x;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
