<template>
  <div class="dashboard_editSpace">
    <transition name="fade">
      <div v-if="isLoading" class="loading">
        <Spinner size="medium" color="secondary" bg-color="gray" />
      </div>
    </transition>
    <template v-if="!isLoading">
      <DashboardHeading
        :back-link="localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })"
        :title="$t('spaceEdit.title')"
        icon-type="space"
      />
      <div class="dashboard_editSpace_content">
        <div class="dashboard_editSpace_form">
          <SpaceRegisterForm
            ref="spaceRegisterForm"
            is-edit
            @validateDone="openDialogue()"
            @closeDialogue="closeDialogue()"
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
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import SpaceRegisterForm from '~/components/organisms/SpaceRegisterForm/SpaceRegisterForm.vue'
import Dialogue from '~/components/molecules/Dialogue/Dialogue.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import { useOpenCloseToggle, injectWorkspace, useFetchUser } from '~/composables'

export default defineComponent({
  name: 'DashboardtNewSpace',

  components: {
    DashboardHeading,
    SpaceRegisterForm,
    Dialogue,
    Spinner
  },

  layout: 'dashboard',

  setup() {
    const spaceRegisterForm = ref()
    const { getWorkspaceId } = injectWorkspace()

    // redirect /dashboard/spaces if member role is 3
    const { fetchUserMemberRole, isLoading } = useFetchUser()

    fetchUserMemberRole()

    // handle open / close Dialogue (page control modal)
    const {
      open: openDialogue,
      close: closeDialogue,
      visible: visibleDialogue
    } = useOpenCloseToggle()

    // handle submit data when click button
    const handleSubmit = () => {
      spaceRegisterForm.value.handleSubmit()
    }

    return {
      isLoading,
      handleSubmit,
      visibleDialogue,
      closeDialogue,
      openDialogue,
      spaceRegisterForm,
      getWorkspaceId
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard_editSpace {
  width: 100%;
}
.loading {
  margin-top: $spacing_20x;
}
</style>
