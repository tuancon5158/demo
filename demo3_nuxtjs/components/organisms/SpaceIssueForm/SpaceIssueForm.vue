<template>
  <div class="spaceIssueForm">
    <FormContainer class="spaceIssueForm_firstForm" :title="$t('spaceApplyUpload.form.title1')">
      <template #formContents>
        <TableDataList :title="basicInfoTitles">
          <template #data_1>
            <InputFieldSet
              v-model="formValues.name"
              class="spaceIssueForm_input"
              :model-value="formValues.name"
              :error-message="msgError.name"
              border-color="gray"
              required
              autocomplete="name"
              :place-holder="$t('spaceApplyUpload.form.placeHolder.name')"
              @update:modelValue="handleInputFieldSetChange($event, 'name')"
            />
          </template>
          <template #data_2>
            <InputFieldSet
              v-model="formValues.email"
              class="spaceIssueForm_input"
              :model-value="formValues.email"
              :error-message="msgError.email"
              border-color="gray"
              autocomplete="email"
              :place-holder="$t('spaceApplyUpload.form.placeHolder.email')"
              @update:modelValue="handleInputFieldSetChange($event, 'email')"
            />
          </template>
          <template #data_3>
            <InputFieldSet
              v-model="formValues.companyName"
              class="spaceIssueForm_input"
              :model-value="formValues.companyName"
              border-color="gray"
              autocomplete="organization"
              :place-holder="$t('spaceApplyUpload.form.placeHolder.company')"
              @update:modelValue="handleInputFieldSetChange($event, 'companyName')"
            />
          </template>
          <template #data_4>
            <InputFieldSet
              v-model="formValues.companyUrl"
              class="spaceIssueForm_input"
              :model-value="formValues.companyUrl"
              :error-message="msgError.companyUrl"
              border-color="gray"
              autocomplete="url"
              :place-holder="$t('spaceApplyUpload.form.placeHolder.website')"
              @update:modelValue="handleInputFieldSetChange($event, 'companyUrl')"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>

    <FormContainer class="spaceIssueForm_secondForm" :title="$t('spaceApplyUpload.form.title2')">
      <template #formContents>
        <TableDataList :title="organizationTitles">
          <template #data_1>
            <TextArea
              row="3"
              col="120"
              class="spaceIssueForm_input"
              :error-message="msgError.reason"
              :placeholder="$t('spaceApplyUpload.form.placeHolder.reason')"
              :model-value="formValues.reason"
              @update:modelValue="handleInputFieldSetChange($event, 'reason')"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>
    <div class="spaceIssueForm_button">
      <Button
        class="spaceIssueForm_button_item"
        bg-color="transparent"
        border-color="red"
        :label="$t('spaceApplyUpload.form.exitButton')"
        @onClick="handleDelete"
      />
      <Button
        :disabled="isDisabled"
        class="spaceIssueForm_button_item"
        bg-color="blue"
        :label="$t('spaceApplyUpload.form.submitButton')"
        @onClick="handleSubmit"
      />
    </div>
    <Dialogue
      v-if="visibleDialogue"
      is-delete
      :title="$t('spaceApplyUpload.dialogue.title')"
      :back-button="$t('spaceApplyUpload.dialogue.backButton')"
      :confirm-button="$t('spaceApplyUpload.dialogue.confirmButton')"
      @onClose="handleCloseModal"
      @onValidate="handleConfirmModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, computed } from '@nuxtjs/composition-api'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import TableDataList from '~/components/molecules/TableDataList/TableDataList.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import Button from '~/components/atoms/Button/Button.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import {
  useFormValuesInit,
  useErrorDisplay,
  useOpenCloseToggle,
  injectNotification,
  injectWorkspace
} from '~/composables'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import Dialogue from '~/components/molecules/Dialogue/Dialogue.vue'

// props type

export default defineComponent({
  name: 'SpaceIssueForm',

  components: {
    FormContainer,
    TableDataList,
    InputFieldSet,
    Button,
    TextArea,
    Dialogue
  },

  setup() {
    const { app, redirect, $auth } = useContext()
    const router = useRouter()
    // Get workspace Id
    const { getWorkspaceId } = injectWorkspace()
    const setNotiState = injectNotification()
    const { setError } = useErrorDisplay()

    const {
      open: handleOpenDialogue,
      close: handleCloseDialogue,
      visible: visibleDialogue
    } = useOpenCloseToggle()

    const basicInfoTitles = [
      {
        label: app.i18n.t('spaceApplyUpload.form.label.name'),
        required: true
      },
      {
        label: app.i18n.t('spaceApplyUpload.form.label.email'),
        required: true
      },
      {
        label: app.i18n.t('spaceApplyUpload.form.label.company'),
        required: false
      },
      {
        label: app.i18n.t('spaceApplyUpload.form.label.website'),
        required: false
      }
    ]

    const organizationTitles = [
      {
        label: app.i18n.t('spaceApplyUpload.form.label.reason'),
        required: true
      }
    ]

    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      name: '',
      email: '',
      companyName: '',
      companyUrl: '',
      reason: ''
    })

    const isDisabled = computed(() =>
      isDisableBtnWithCondition(formValues, ['name', 'email', 'reason'], ['companyUrl'])
    )

    // Init value:
    const keys = Object.keys(formValues)

    keys.forEach((key) => {
      formValues[key] = $auth?.$state?.user?.[key] ?? ''
    })

    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    const handleSubmit = async () => {
      await app
        .$repository('members')
        .memberPersonal(formValues)
        .then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setNotiState.setNotification(app.i18n.t('form.successMessage.applyWorkspce'), 'success')
          setTimeout(() => {
            redirect(
              app.localePath({
                name: 'dashboard-id-spaces',
                params: { id: getWorkspaceId.value || '' }
              })
            )
          }, 3000)
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }

    const handleDelete = () => {
      handleOpenDialogue()
    }

    const handleCloseModal = () => {
      handleCloseDialogue()
      router.replace(app.localePath(`/dashboard/${getWorkspaceId.value}/spaces`))
    }

    const handleConfirmModal = () => {
      handleCloseDialogue()
    }

    return {
      basicInfoTitles,
      organizationTitles,
      formValues,
      msgError,
      isDisabled,
      handleInputFieldSetChange,
      handleSubmit,
      visibleDialogue,
      handleOpenDialogue,
      handleCloseDialogue,
      handleCloseModal,
      handleConfirmModal,
      handleDelete
    }
  }
})
</script>

<style scoped lang="scss">
.spaceIssueForm {
  max-width: $dashboard_contents_W;
  margin: 0 auto;

  &_firstForm {
    margin-bottom: $spacing_6x;
  }

  &_secondForm {
    margin-bottom: $spacing_8x;
  }

  &_button {
    display: flex;

    @include pc() {
      justify-content: space-between;
      align-items: center;
    }

    @include mb() {
      text-align: center;
      flex-wrap: wrap;
      justify-content: center;
      flex-direction: column-reverse;
    }

    &_item {
      &:nth-child(2n) {
        margin-bottom: $spacing_4x;
      }
    }
  }
}
</style>
