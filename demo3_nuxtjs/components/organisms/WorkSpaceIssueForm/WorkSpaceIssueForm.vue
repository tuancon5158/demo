<template>
  <div class="workSpaceIssueForm">
    <FormContainer class="workSpaceIssueForm_firstForm" :title="$t('workSpaceApply.form.title1')">
      <template #formContents>
        <TableDataList :title="basicInfoTitles">
          <template #data_1>
            <InputFieldSet
              v-model="formValues.name"
              class="workSpaceIssueForm_input"
              :model-value="formValues.name"
              :error-message="msgError.name"
              border-color="gray"
              autocomplete="name"
              :place-holder="$t('workSpaceApply.form.placeHolder.name')"
              @update:modelValue="handleInputFieldSetChange($event, 'name')"
            />
          </template>
          <template #data_2>
            <InputFieldSet
              v-model="formValues.email"
              class="workSpaceIssueForm_input"
              :model-value="formValues.email"
              :error-message="msgError['email']"
              border-color="gray"
              autocomplete="email"
              :place-holder="$t('workSpaceApply.form.placeHolder.email')"
              @update:modelValue="handleInputFieldSetChange($event, 'email')"
            />
          </template>
          <template #data_3>
            <InputFieldSet
              v-model="formValues.companyName"
              class="workSpaceIssueForm_input"
              :model-value="formValues.companyName"
              :error-message="msgError.companyName"
              border-color="gray"
              autocomplete="organization"
              :place-holder="$t('workSpaceApply.form.placeHolder.company')"
              @update:modelValue="handleInputFieldSetChange($event, 'companyName')"
            />
          </template>
          <template #data_4>
            <InputFieldSet
              v-model="formValues.url"
              class="workSpaceIssueForm_input"
              :model-value="formValues.url"
              :error-message="msgError.url"
              border-color="gray"
              autocomplete="url"
              :place-holder="$t('workSpaceApply.form.placeHolder.website')"
              @update:modelValue="handleInputFieldSetChange($event, 'url')"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>

    <FormContainer class="workSpaceIssueForm_secondForm" :title="$t('workSpaceApply.form.title2')">
      <template #formContents>
        <TableDataList class="workSpaceIssueForm_list" :title="organizationTitles">
          <template #data_1>
            <InputFieldSet
              v-model="formValues.usersCount"
              class="workSpaceIssueForm_input"
              :model-value="formValues.usersCount"
              :error-message="msgError.usersCount"
              border-color="gray"
              :place-holder="$t('workSpaceApply.form.placeHolder.numberOfUser')"
              @update:modelValue="handleInputFieldSetChange($event, 'usersCount')"
            />
          </template>
          <template #data_2>
            <TextArea
              row="5"
              col="120"
              class="workSpaceIssueForm_input"
              :error-message="msgError.reason"
              :placeholder="$t('workSpaceApply.form.placeHolder.reason')"
              :model-value="formValues.reason"
              @update:modelValue="handleInputFieldSetChange($event, 'reason')"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>
    <div class="workSpaceIssueForm_button">
      <Button
        class="workSpaceIssueForm_button_item"
        bg-color="transparent"
        border-color="red"
        :label="$t('workSpaceApply.form.exitButton')"
        @onClick="handleDelete"
      ></Button>
      <Button
        class="workSpaceIssueForm_button_item"
        bg-color="blue"
        :label="$t('workSpaceApply.form.submitButton')"
        :disabled="isDisableBtn"
        @onClick="handleSubmit"
      ></Button>
    </div>
    <transition name="fade">
      <Modal v-if="visibleConfirm" header-align="left" @onClose="handleCloseModal">
        <template #header>
          <p class="workSpaceIssueForm_modalTitle">{{ msgSuccess.title }}</p>
        </template>
        <template #body>
          <div class="workSpaceIssueForm_modalBody">
            <p class="workSpaceIssueForm_modalBodyTitle">
              {{ msgSuccess.description }}
            </p>
            <p class="workSpaceIssueForm_modalBodyTitle">
              {{ msgSuccess.subDescription }}
            </p>
          </div>
        </template>
      </Modal>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  reactive,
  SetupContext,
  watch,
  onMounted,
  useRouter,
  computed
} from '@nuxtjs/composition-api'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import TableDataList from '~/components/molecules/TableDataList/TableDataList.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import Button from '~/components/atoms/Button/Button.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import Modal from '~/components/atoms/Modal/Modal.vue'
import {
  useFormValuesInit,
  useOpenCloseToggle,
  useErrorDisplay,
  injectWorkspace
} from '~/composables'
import { debounce } from '~/composables/utilities/debounce'
const TIMER_SHOW_MODAL = 5000
const TIMER_DEBOUNCE = 1000

export default defineComponent({
  name: 'WorkSpaceIssueForm',

  components: {
    FormContainer,
    TableDataList,
    InputFieldSet,
    TextArea,
    Button,
    Modal
  },

  setup(_, context: SetupContext) {
    const { $auth, app } = useContext()
    const { setError } = useErrorDisplay()

    // ----------------- static data -----------------
    const msgSuccess = reactive({
      title: app.i18n.t('form.successMessage.title'),
      description: app.i18n.t('form.successMessage.description'),
      subDescription: app.i18n.t('form.successMessage.subDescription')
    })

    const basicInfoTitles = [
      {
        label: app.i18n.t('workSpaceApply.form.label.name'),
        required: true
      },
      {
        label: app.i18n.t('workSpaceApply.form.label.email'),
        required: true
      },
      {
        label: app.i18n.t('workSpaceApply.form.label.company'),
        required: true
      },
      {
        label: app.i18n.t('workSpaceApply.form.label.website'),
        required: true
      }
    ]

    const organizationTitles = [
      {
        label: app.i18n.t('workSpaceApply.form.label.numberOfUser'),
        required: true
      },
      {
        label: app.i18n.t('workSpaceApply.form.label.reason'),
        required: true
      }
    ]

    // Notification, define type later
    // const setNotiState = injectNotification()
    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      name: '',
      email: '',
      companyName: '',
      url: '',
      usersCount: '',
      reason: ''
    })

    const isDisableBtn = computed(() =>
      isDisableBtnWithCondition(formValues, [
        'name',
        'email',
        'companyName',
        'url',
        'usersCount',
        'reason'
      ])
    )

    onMounted(() => {
      formValues.name = $auth.user?.name || ''
      formValues.email = $auth.user?.email || ''
      formValues.companyName = $auth.user?.companyName || ''
      formValues.url = $auth.user?.companyUrl || ''
    })

    const resetToInitValue = () => {
      formValues.name = $auth.user?.name || ''
      formValues.email = $auth.user?.email || ''
      formValues.companyName = $auth.user?.companyName || ''
      formValues.url = $auth.user?.companyUrl || ''
      formValues.usersCount = ''
      formValues.reason = ''
      msgError.usersCount = ''
      msgError.reason = ''
      msgError.url = ''
    }

    // handle change value when input change
    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    // handle submit data when click button
    const handleSubmit = debounce(() => {
      if (isDisableBtn.value) return

      handleApi()
    }, TIMER_DEBOUNCE)

    // handle api
    const handleApi = async () => {
      const inputData = {
        ...formValues,
        usersCount: parseInt(formValues.usersCount)
      }

      await app
        .$repository('workspaces')
        .postWorkspaces(inputData)
        .then(() => {
          handleOpenConfirm()
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
        .finally(() => {
          resetToInitValue()
        })
    }

    // handle delete
    const handleDelete = () => {
      context.emit('onDelete')
    }

    const {
      open: handleOpenConfirm,
      close: handleCloseConfirm,
      visible: visibleConfirm
    } = useOpenCloseToggle()

    const router = useRouter()
    const { getWorkspaceId } = injectWorkspace()

    // handle close modal
    const handleCloseModal = () => {
      handleCloseConfirm()
      router.push(
        app.localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId.value || '' } })
      )
    }

    watch(
      () => visibleConfirm.value,
      (curr) => {
        if (curr) {
          setTimeout(() => {
            handleCloseModal()
          }, TIMER_SHOW_MODAL)
        }
      }
    )

    return {
      basicInfoTitles,
      organizationTitles,
      formValues,
      msgError,
      handleInputFieldSetChange,
      handleSubmit,
      msgSuccess,
      handleDelete,
      visibleConfirm,
      handleCloseConfirm,
      isDisableBtn,
      handleCloseModal
    }
  }
})
</script>

<style scoped lang="scss">
.workSpaceIssueForm {
  max-width: 964px;

  &_list {
    overflow-x: inherit;
  }

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

  &_modalTitle {
    margin: 0;
  }

  &_modalBodyTitle {
    font-weight: $font_weight_normal;
    @include fz($font_size_s);
    line-height: 24px;
    margin: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
