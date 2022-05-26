<template>
  <div class="dashboard_setting">
    <DashboardHeading
      icon-type="settings"
      :title="$t('workSpaceSettings.title')"
      :subtitle="$t('workSpaceSettings.subtitle')"
    />
    <div>
      <WorkSpaceSettingForm />
      <div v-if="isDeletable" class="dashboard_setting_border">
        <UserDeleteForm
          :heading="$t('workSpaceSettings.deleteForm.heading')"
          :content="$t('workSpaceSettings.deleteForm.content')"
          :button-text="$t('workSpaceSettings.deleteForm.buttonText')"
          :dialogue="dialogueContent"
          class="dashboard_setting_delete"
          @onDelete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, computed, useRouter } from '@nuxtjs/composition-api'
// components
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import WorkSpaceSettingForm from '~/components/organisms/WorkSpaceSettingForm/WorkSpaceSettingForm.vue'
import UserDeleteForm from '~/components/molecules/DeleteForm/DeleteForm.vue'
import { injectWorkspace, injectMember, injectNotification } from '~/composables'
// composables
import { debounce } from '~/composables/utilities/debounce'
// constants
import { workspaceType } from '~/constants/workspace'
import { memberRole } from '~/constants/userRole'

const TIMER_DEBOUNCE = 500

export default defineComponent({
  name: 'DashboardSpaceSetting',

  components: {
    DashboardHeading,
    WorkSpaceSettingForm,
    UserDeleteForm
  },

  layout: 'dashboard',

  setup() {
    const { $auth, app } = useContext()
    const {
      getWorkspaceId,
      getWorkspaceInfo,
      fetchWorkspaces,
      menuWorkSpaceList,
      setWorkspaceId,
      fetchWorkspaceById
    } = injectWorkspace()
    const { getMemberInfo } = injectMember()
    const setNotiState = injectNotification()
    const router = useRouter()

    // Disable
    // workspace type is 2 && member role is 1
    const isDeletable = computed((): boolean => {
      return (
        getWorkspaceInfo?.value?.type === workspaceType.PUBRIC &&
        getMemberInfo?.value?.memberRole === memberRole.OWNER
      )
    })

    const dialogueContent = reactive({
      title: app.i18n.t('workSpaceSettings.deleteForm.dialogue.title'),
      backButton: app.i18n.t('workSpaceSettings.deleteForm.dialogue.deleteButton'),
      confirmButton: app.i18n.t('workSpaceSettings.deleteForm.dialogue.cancelButton')
    })

    // handle submit remove data when click button
    const handleDelete = debounce(async () => {
      await app
        .$repository('workspaces')
        .deleteWorkspaces(getWorkspaceId.value)
        .then(async () => {
          window.scrollTo({ top: 0, behavior: 'smooth' })

          setNotiState.setNotification(app.i18n.t('form.successMessage.deleted'), 'success')

          await fetchWorkspaces(Number($auth.user.id))

          if (menuWorkSpaceList.value[0]) {
            const { id } = menuWorkSpaceList.value[0]

            setWorkspaceId(id || '')
            router.push(app.localePath({ name: 'dashboard-id-spaces', params: { id: id || '' } }))
            await fetchWorkspaceById(id || '')
          }
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          if (errorKeyCode) {
            setNotiState.setNotification(app.i18n.t(`form.errorMessage.${errorKeyCode}`), 'error')
          } else {
            setNotiState.setNotification(app.i18n.t('form.errorMessage.normal'), 'error')
          }

          // scroll up
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
    }, TIMER_DEBOUNCE)

    return {
      isDeletable,
      handleDelete,
      dialogueContent
    }
  }
})
</script>
<style lang="scss" scoped>
.dashboard_setting {
  &_border {
    border-top: 1px solid $color_light_blue_200;
    padding-top: $spacing_8x;
  }
}
</style>
