<template>
  <div class="workSpaceRegisterForm">
    <FormContainer class="workSpaceRegisterForm_contents" :title="$t('workSpaceNew.form.title1')">
      <template #formContents>
        <TableDataList :title="basicInfoTitles">
          <template #data_1>
            <InputFieldSet
              class="workSpaceRegisterForm_input"
              :model-value="formValues.workSpaceName"
              :error-message="msgError.workSpaceName"
              border-color="gray"
              :place-holder="$t('workSpaceNew.form.placeHolder.workSpaceName')"
              @update:modelValue="handleInputFieldSetChange($event, 'workSpaceName')"
            />
          </template>
          <template #data_2>
            <TextArea
              row="3"
              col="200"
              :model-value="formValues.description"
              border-color="gray"
              :placeholder="$t('workSpaceNew.form.placeHolder.description')"
              @update:modelValue="handleInputFieldSetChange($event, 'description')"
            />
          </template>
          <template #data_3>
            <FileDropBox
              v-model="formValues.workSpaceIcon"
              :image-url="formValues.workSpaceIcon ? convertFullPath(formValues.workSpaceIcon) : ''"
              :error-message="msgError.workSpaceIcon"
              size="full"
              max-size="3145728"
              :percentage="currentProgress"
              :is-loading="isLoading"
              @onSelectImage="
                handleSelectImage($event, 'workSpaceIcon', 'workspaces', getWorkspaceId)
              "
              @onDeleteImage="handleDeleteImage($event)"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>

    <FormContainer class="workSpaceRegisterForm_contents" :title="$t('workSpaceNew.form.title2')">
      <template #formContents>
        <TableDataList :title="organizationTitles">
          <template #data_1>
            <InputFieldSet
              class="workSpaceRegisterForm_input"
              :model-value="formValues.organizationName"
              border-color="gray"
              :place-holder="$t('workSpaceNew.form.placeHolder.organizationName')"
              @update:modelValue="handleInputFieldSetChange($event, 'organizationName')"
            />
          </template>
          <template #data_2>
            <InputFieldSet
              class="workSpaceRegisterForm_input"
              :model-value="formValues.websiteUrl"
              :error-message="msgError.websiteUrl"
              border-color="gray"
              :place-holder="$t('workSpaceNew.form.placeHolder.websiteUrl')"
              @update:modelValue="handleInputFieldSetChange($event, 'websiteUrl')"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>

    <div class="workSpaceRegisterForm_button">
      <Button
        bg-color="transparent"
        border-color="red"
        :label="$t('workSpaceNew.form.exitButton')"
        @onClick="handleClose"
      />
      <Button
        :disabled="isValidate || isNotCompleted"
        bg-color="blue"
        :label="$t('workSpaceNew.form.submitButton')"
        @onClick="handleSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  SetupContext,
  ref,
  useRouter,
  useRoute,
  computed
} from '@nuxtjs/composition-api'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import TableDataList from '~/components/molecules/TableDataList/TableDataList.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import FileDropBox from '~/components/molecules/Form/FileDropBox/FileDropBox.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import Button from '~/components/atoms/Button/Button.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import {
  useFormValuesInit,
  useUploadImage,
  useErrorDisplay,
  injectNotification,
  injectWorkspace,
  injectMember
} from '~/composables'
import { debounce } from '~/composables/utilities/debounce'

const TIMER_DEBOUNCE = 500

export default defineComponent({
  name: 'WorkSpaceRegisterForm',

  components: {
    FormContainer,
    TableDataList,
    InputFieldSet,
    FileDropBox,
    Button,
    TextArea
  },

  setup(_, context: SetupContext) {
    const { $auth, app } = useContext()
    const router = useRouter()
    const route = useRoute()
    const { $config } = context.root
    const isNotCompleted = ref(false)
    const { setError } = useErrorDisplay()

    const basicInfoTitles = [
      {
        label: app.i18n.t('workSpaceNew.form.label.workSpaceName'),
        required: true
      },
      {
        label: app.i18n.t('workSpaceNew.form.label.description'),
        required: false
      },
      {
        label: app.i18n.t('workSpaceNew.form.label.workSpaceIcon'),
        required: true
      }
    ]

    const organizationTitles = [
      {
        label: app.i18n.t('workSpaceNew.form.label.organizationName'),
        required: false
      },
      {
        label: app.i18n.t('workSpaceNew.form.label.websiteUrl'),
        required: false
      }
    ]

    // Get workspace Id from query params
    const workspaceId = computed(() => route.value.params.id || '')
    const { fetchMemberMe } = injectMember()
    const { getWorkspaceId, setWorkspaceId, fetchWorkspaces, fetchWorkspaceById } =
      injectWorkspace()

    if (process.client) {
      const localStorageWorkspaceId = JSON.parse(localStorage.getItem('_workspace') as string)

      if (workspaceId.value !== localStorageWorkspaceId?.id) {
        setWorkspaceId(workspaceId.value)
        fetchWorkspaceById(workspaceId.value || '')
        fetchMemberMe(workspaceId.value || '')
      }
    }

    // If form no need validate, only use v-model, if not, use @update:modelValue
    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    // Form Data
    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      workSpaceName: '',
      description: '',
      workSpaceIcon: '',
      organizationName: '',
      websiteUrl: ''
    })

    const isValidate = computed(() =>
      isDisableBtnWithCondition(formValues, ['workSpaceName', 'workSpaceIcon'], ['websiteUrl'])
    )

    // Notification, define type later
    const setNotiState = injectNotification()

    // handle call API
    const handleSubmit = debounce(async () => {
      if (!isValidate) return

      isNotCompleted.value = true

      await app
        .$repository('workspaces')
        .registerWorkspaces({
          id: workspaceId.value,
          name: formValues.workSpaceName,
          thumbnailUrl: formValues.workSpaceIcon,
          description: formValues.description,
          companyName: formValues.organizationName,
          companyUrl: formValues.websiteUrl
        })
        .then(() => {
          fetchWorkspaces(Number($auth.user.id))
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setNotiState.setNotification(
            app.i18n.t('form.successMessage.createdWorkspce'),
            'success',
            app.localePath(`/dashboard/${workspaceId.value}/spaces`)
          )
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key
          const errorResource = error.response?.data?.response.args.resource

          setError(errorKeyCode, errorResource)
        })
        .finally(() => {
          isNotCompleted.value = false
        })
    }, TIMER_DEBOUNCE)

    // 破棄して終了
    const handleClose = () => {
      router.push(
        app.localePath({ name: 'dashboard-id-spaces', params: { id: workspaceId.value } })
      )
    }

    return {
      basicInfoTitles,
      organizationTitles,
      formValues,
      msgError,
      isValidate,
      isNotCompleted,
      handleInputFieldSetChange,
      handleSubmit,
      handleClose,
      ...useUploadImage('workSpaceIcon', formValues, $config),
      getWorkspaceId
    }
  }
})
</script>

<style scoped lang="scss">
/deep/ .dlist_item {
  margin-bottom: $spacing_6x;
}

.workSpaceRegisterForm {
  width: 100%;
  max-width: $dashboard_contents_W;
  margin: 0 auto;

  &_contents {
    margin-bottom: $spacing_8x;
  }

  &_button {
    display: flex;
    justify-content: space-between;

    @include mb() {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
