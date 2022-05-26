<template>
  <div class="userProfileSettingForm">
    <FormContainer class="userProfileSettingForm_form" :title="$t('accountSettings.form.title1')">
      <template #formContents>
        <TableDataList :title="basicInfoTitles">
          <template #data_1>
            <InputFieldSet
              v-model="formValues.name"
              class="userProfileSettingForm_input"
              label=""
              :model-value="formValues.name"
              :error-message="msgError.name"
              border-color="gray"
              autocomplete="name"
              :place-holder="$t('accountSettings.form.placeHolder.name')"
              @update:modelValue="handleInputFieldSetChange($event, 'name')"
            />
          </template>
          <template #data_2>
            <TextArea
              :model-value="formValues.introduction"
              :error-message="msgError.introduction"
              row="3"
              col="200"
              :max-word-count="255"
              is-display-word-count
              :placeholder="$t('accountSettings.form.placeHolder.biography')"
              @update:modelValue="handleInputFieldSetChange($event, 'introduction')"
            />
          </template>
          <template #data_3>
            <FileDropBox
              :image-url="formValues.thumbnailUrl ? convertFullPath(formValues.thumbnailUrl) : ''"
              :error-message="msgError.thumbnailUrl"
              size="full"
              max-size="3145728"
              :percentage="currentProgress"
              :is-loading="isLoading"
              @onSelectImage="handleSelectImage($event, 'thumbnailUrl', 'users', $auth.user.id)"
              @onDeleteImage="handleDeleteImage($event)"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>

    <FormContainer class="userProfileSettingForm_form" :title="$t('accountSettings.form.title2')">
      <template #formContents>
        <TableDataList :title="aboutUsTitles">
          <template #data_1>
            <InputFieldSet
              :model-value="formValues.companyName"
              class="userProfileSettingForm_input"
              label=""
              border-color="gray"
              autocomplete="organization"
              :place-holder="$t('accountSettings.form.placeHolder.company')"
              @update:modelValue="handleInputFieldSetChange($event, 'companyName')"
            />
          </template>
          <template #data_2>
            <InputFieldSet
              :model-value="formValues.companyUrl"
              :error-message="msgError.companyUrl"
              class="userProfileSettingForm_input"
              label=""
              border-color="gray"
              autocomplete="url"
              :place-holder="$t('accountSettings.form.placeHolder.websiteUrl')"
              @update:modelValue="handleInputFieldSetChange($event, 'companyUrl')"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>
    <FormContainer class="userProfileSettingForm_form" :title="$t('accountSettings.form.title3')">
      <template #formContents>
        <TableDataList :title="snsTitles">
          <template #data_1>
            <InputFieldSet
              :model-value="formValues.facebookUrl"
              :error-message="msgError.facebookUrl"
              class="workSpaceRegisterForm_input"
              label=""
              border-color="gray"
              :place-holder="$t('accountSettings.form.placeHolder.facebook')"
              @update:modelValue="handleInputFieldSetChange($event, 'facebookUrl')"
            />
          </template>
          <template #data_2>
            <InputFieldSet
              :model-value="formValues.twitterUrl"
              class="workSpaceRegisterForm_input"
              :error-message="msgError.twitterUrl"
              label=""
              border-color="gray"
              :place-holder="$t('accountSettings.form.placeHolder.twitter')"
              @update:modelValue="handleInputFieldSetChange($event, 'twitterUrl')"
            />
          </template>
          <template #data_3>
            <InputFieldSet
              :model-value="formValues.instagramUrl"
              class="workSpaceRegisterForm_input"
              :error-message="msgError.instagramUrl"
              label=""
              border-color="gray"
              :place-holder="$t('accountSettings.form.placeHolder.instagram')"
              @update:modelValue="handleInputFieldSetChange($event, 'instagramUrl')"
            />
          </template>
        </TableDataList>
      </template>
    </FormContainer>
    <div class="userProfileSettingForm_button">
      <Button
        :disabled="isDisable"
        class="userProfileSettingForm_buttonRight"
        bg-color="blue"
        :label="$t('accountSettings.form.submitButton')"
        @click.native="handleSubmit"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, SetupContext, computed } from '@nuxtjs/composition-api'
import FormContainer from '~/components/molecules/FormContainer/FormContainer.vue'
import TableDataList from '~/components/molecules/TableDataList/TableDataList.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import Button from '~/components/atoms/Button/Button.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import FileDropBox from '~/components/molecules/Form/FileDropBox/FileDropBox.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import {
  useFormValuesInit,
  useUploadImage,
  useErrorDisplay,
  injectNotification
} from '~/composables'
import { I_Response_Type, I_User_Info_Response } from '~/types/schema/response'
export default defineComponent({
  name: 'AccountProfile',

  components: {
    FormContainer,
    TableDataList,
    InputFieldSet,
    Button,
    TextArea,
    FileDropBox
  },

  layout: 'dashboard-single',

  setup(_, context: SetupContext) {
    const { app, $auth } = useContext()
    const { setError } = useErrorDisplay()

    const { $config } = context.root
    const basicInfoTitles = [
      {
        label: app.i18n.t('accountSettings.form.label.name'),
        required: true
      },
      {
        label: app.i18n.t('accountSettings.form.label.biography'),
        required: true
      },
      {
        label: app.i18n.t('accountSettings.form.label.profileImage'),
        required: true
      }
    ]

    const aboutUsTitles = [
      {
        label: app.i18n.t('accountSettings.form.label.company'),
        required: false
      },
      {
        label: app.i18n.t('accountSettings.form.label.websiteUrl'),
        required: false
      }
    ]

    const snsTitles = [
      {
        label: app.i18n.t('accountSettings.form.label.facebook'),
        required: false
      },
      {
        label: app.i18n.t('accountSettings.form.label.twitter'),
        required: false
      },
      {
        label: app.i18n.t('accountSettings.form.label.instagram'),
        required: false
      }
    ]

    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      name: '',
      introduction: '',
      thumbnailUrl: '',
      companyName: '',
      companyUrl: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: ''
    })

    const isDisable = computed(() =>
      isDisableBtnWithCondition(
        formValues,
        ['name', 'introduction', 'thumbnailUrl'],
        ['companyUrl', 'facebookUrl', 'twitterUrl', 'instagramUrl']
      )
    )

    // init Values
    const keys = Object.keys(formValues)

    keys.forEach((key: string) => {
      formValues[key] = $auth?.$state?.user?.[key] ?? ''
    })

    // handle change value when input change
    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }
    const setNotiState = injectNotification()

    // handle call API and redirect if success
    const handleSubmit = async () => {
      await app
        .$repository('users')
        .updateAccount(formValues)
        .then((response: I_Response_Type<I_User_Info_Response>) => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setNotiState.setNotification(app.i18n.t('form.successMessage.updated'), 'success')
          context.root.$auth.setUser(response.data)

          excuteClearPageCache()
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }

    // cloudfront cache clean for each page
    const excuteClearPageCache = () => {
      app
        .$repository('cloudFront')
        .clearPageCache($config.distributionId, [`/profile/${$auth.user.id}`])
    }

    return {
      basicInfoTitles,
      snsTitles,
      aboutUsTitles,
      formValues,
      msgError,
      isDisable,
      handleInputFieldSetChange,
      handleSubmit,
      ...useUploadImage('thumbnailUrl', formValues, $config)
    }
  }
})
</script>

<style scoped lang="scss">
.userProfileSettingForm {
  max-width: $dashboard_contents_W;

  &_form {
    margin-bottom: $spacing_8x;
  }

  &_button {
    display: flex;
    margin-top: $spacing_5x;

    &Right {
      margin-left: auto;
      width: 200px;
      height: 48px;
      font-weight: $font_weight_medium;
      display: flex;
      align-items: center;
      justify-content: center;

      @include mb() {
        width: 100%;
      }
    }
  }
}
</style>
