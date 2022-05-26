<template>
  <div class="workProfileSettingForm">
    <FormContainer class="workProfileSettingForm_form" :title="$t('workSpaceSettings.form.title1')">
      <template #formContents>
        <TableDataList :title="basicInfoTitles">
          <template #data_1>
            <InputFieldSet
              v-model="formValues.name"
              class="workSpaceRegisterForm_input"
              :model-value="formValues.name"
              :error-message="msgError.name"
              border-color="gray"
              :disabled="isDisabled"
              autocomplete="name"
              :place-holder="$t('workSpaceSettings.form.placeHolder.workSpaceName')"
              @update:modelValue="handleInputFieldSetChange($event, 'name')"
            />
          </template>
          <template #data_2>
            <TextArea
              :model-value="formValues.description"
              :disabled="isDisabled"
              row="3"
              col="200"
              :placeholder="$t('workSpaceSettings.form.placeHolder.description')"
              @update:modelValue="handleInputFieldSetChange($event, 'description')"
            />
          </template>
          <template #data_3>
            <FileDropBox
              :image-url="formValues.thumbnailUrl ? convertFullPath(formValues.thumbnailUrl) : ''"
              size="full"
              max-size="3145728"
              :percentage="currentProgress"
              :is-loading="isLoading"
              :disabled="isDisabled"
              @onSelectImage="
                handleSelectImage($event, 'coverDataValue', 'workspaces', getWorkspaceId)
              "
              @onDeleteImage="handleDeleteImage($event)"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>

    <FormContainer class="workProfileSettingForm_form" :title="$t('workSpaceSettings.form.title1')">
      <template #formContents>
        <TableDataList :title="aboutUsTitles">
          <template #data_1>
            <InputFieldSet
              v-model="formValues.companyName"
              class="workSpaceRegisterForm_input"
              :model-value="formValues.companyName"
              :disabled="isDisabled"
              border-color="gray"
              autocomplete="organization"
              :place-holder="$t('workSpaceSettings.form.placeHolder.organizationName')"
              @update:modelValue="handleInputFieldSetChange($event, 'companyName')"
            />
          </template>
          <template #data_2>
            <InputFieldSet
              class="workSpaceRegisterForm_input"
              :model-value="formValues.companyUrl"
              :error-message="msgError.companyUrl"
              :disabled="isDisabled"
              border-color="gray"
              autocomplete="url"
              :place-holder="$t('workSpaceSettings.form.placeHolder.websiteUrl')"
              @update:modelValue="handleInputFieldSetChange($event, 'companyUrl')"
            />
          </template>
          <!-- <template #data_3>
            <InputFieldSet
              :error-message="msgError.contactUrl"
              class="workSpaceRegisterForm_input"
              :model-value="formValues.contactUrl"
              :disabled="isDisabled"
              border-color="gray"
              autocomplete="url"
              :place-holder="$t('workSpaceSettings.form.placeHolder.inquiryForm')"
              @update:modelValue="handleInputFieldSetChange($event, 'contactUrl')"
            />
          </template> -->
        </TableDataList>
      </template>
    </FormContainer>
    <div v-if="!isDisabled" class="workProfileSettingForm_group">
      <Button
        bg-color="blue"
        class="workProfileSettingForm_group_button"
        :label="$t('workSpaceSettings.form.submitButton')"
        :disabled="isValidate || isNotCompleted"
        @onClick="handleSubmit"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  SetupContext,
  ref,
  onMounted,
  computed
} from '@nuxtjs/composition-api'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import TableDataList from '~/components/molecules/TableDataList/TableDataList.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import Button from '~/components/atoms/Button/Button.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import FileDropBox from '~/components/molecules/Form/FileDropBox/FileDropBox.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import {
  injectNotification,
  useFormValuesInit,
  useUploadImage,
  useErrorDisplay,
  injectWorkspace,
  injectMember
} from '~/composables'

export default defineComponent({
  name: 'WorkSpaceSettingForm',

  components: {
    FormContainer,
    TableDataList,
    InputFieldSet,
    TextArea,
    FileDropBox,
    Button
  },

  props: {
    isMember: {
      type: Boolean,
      default: false
    }
  },

  setup(_, context: SetupContext) {
    const { $auth, app } = useContext()
    const { $config } = context.root
    const isNotCompleted = ref(false)
    const { setError } = useErrorDisplay()

    // Form Data
    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      name: '',
      thumbnailUrl: '',
      description: '',
      companyName: '',
      orders: '',
      companyUrl: ''
    })

    const isValidate = computed(() =>
      isDisableBtnWithCondition(formValues, ['name', 'thumbnailUrl'], ['companyUrl'])
    )

    const basicInfoTitles = [
      {
        label: app.i18n.t('workSpaceSettings.form.label.workSpaceName'),
        required: true
      },
      {
        label: app.i18n.t('workSpaceSettings.form.label.description'),
        required: false
      },
      {
        label: app.i18n.t('workSpaceSettings.form.label.thumbnailUrl'),
        required: true
      }
    ]

    const aboutUsTitles = [
      {
        label: app.i18n.t('workSpaceSettings.form.label.organizationName'),
        required: false
      },
      {
        label: app.i18n.t('workSpaceSettings.form.label.websiteUrl'),
        required: false
      }
      // {
      //   label: app.i18n.t('workSpaceSettings.form.label.inquiryForm'),
      //   required: false
      // }
    ]

    // Notification, define type later
    const setNotiState = injectNotification()

    const { getWorkspaceId, getWorkspaceInfo } = injectWorkspace()
    const { getMemberInfo } = injectMember()

    // Disable if workspace type is not 1 && memberRole is3
    const isDisabled = computed(() => {
      return getWorkspaceInfo?.value?.type !== 1 && getMemberInfo?.value?.memberRole === 3
    })

    onMounted(async () => {
      await getWorkspacesDetails()
    })

    // get workspace detail
    const getWorkspacesDetails = async () => {
      await app
        .$repository('workspaces')
        .getWorkspacesDetails(getWorkspaceId.value)
        .then((response) => {
          const { name, thumbnailUrl, description, companyName, orders, companyUrl } = response.data

          formValues.name = name || ''
          formValues.thumbnailUrl = thumbnailUrl || ''
          formValues.description = description || ''
          formValues.companyName = companyName || ''
          formValues.orders = orders || undefined
          formValues.companyUrl = companyUrl || ''
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }

    // handle change value when input change
    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    const useWorkspaceState = injectWorkspace()

    // handle submit data when click button
    const handleSubmit = async () => {
      if (!isValidate) return

      isNotCompleted.value = true

      const inputData = {
        ...formValues,
        id: getWorkspaceId.value
      }

      await app
        .$repository('workspaces')
        .registerWorkspaces(inputData)
        .then((response) => {
          const { workspacePlanId, name, type } = response.data

          useWorkspaceState.fetchWorkspaces(Number($auth.user.id))
          useWorkspaceState.setWorkspaceInfo({ workspacePlanId, name, type })

          setNotiState.setNotification(app.i18n.t('form.successMessage.updated'), 'success')

          excuteClearPageCache()
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
        .finally(() => {
          isNotCompleted.value = false
        })
    }

    // cloudfront cache clean for each page
    const excuteClearPageCache = () => {
      app
        .$repository('cloudFront')
        .clearPageCache($config.distributionId, [`/profile/workspace/${getWorkspaceId.value}`])
    }

    return {
      isDisabled,
      basicInfoTitles,
      aboutUsTitles,
      formValues,
      handleInputFieldSetChange,
      ...useUploadImage('thumbnailUrl', formValues, $config),
      handleSubmit,
      isNotCompleted,
      msgError,
      isValidate,
      getWorkspaceId
    }
  }
})
</script>

<style scoped lang="scss">
.workProfileSettingForm {
  @include fz($font_size_s);
  max-width: $dashboard_contents_W;

  &_form {
    margin-bottom: $spacing_8x;
  }

  &_group {
    padding-bottom: $spacing_8x;
    text-align: right;

    @include mb() {
      margin-bottom: $spacing_8x;
    }

    &_button {
      @include mb() {
        width: 100%;
      }
    }
  }
}
</style>
