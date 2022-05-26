<template>
  <section class="inquiryFormContainer">
    <div v-if="inquiryFormContactStep === 0" class="inquiryForm">
      <HeadingSet
        level="2"
        note-size="medium"
        label-color="white"
        class="inquiryForm_heading"
        font-weight="900"
        :headings="[{ text: $t('formContact.inquiryFormHeading'), color: 'white' }]"
        :note="$t('formContact.inquiryFormSubHeading')"
        align="left"
      />

      <div class="inquiryForm_form">
        <!-- Corporation/Individual -->
        <InputLabel
          color="white"
          color-required="white"
          class="inquiryForm_form_label"
          :value="$t('formContact.label.option')"
          required
          tag-required
          size="large"
        />

        <RadioButtons
          class="contactForm_input_radio"
          :error-message="msgError.optionRadio"
          :model-value="formValues.optionRadio"
          :radio-buttons-data="inquiryDetailsRadioButtonsData"
          label-color="white"
          dot-color="yellow"
          @update:modelValue="formValues.optionRadio = $event"
        />
      </div>

      <div class="inquiryForm_form">
        <!-- Name -->
        <InputLabel
          color="white"
          color-required="white"
          class="inquiryForm_form_label"
          :value="$t('formContact.label.name')"
          required
          tag-required
          size="large"
        />
        <TextInput
          color-input="white"
          class="inquiryForm_form_input"
          :model-value="formValues.name"
          :error-message="msgError.name"
          :border-radius="false"
          border-color="none"
          autocomplete="name"
          @update:modelValue="handleInputFieldSetChange($event, 'name')"
        />
        <InputError
          v-show="msgError.name"
          class="inquiryForm_form_input_error"
          :value="msgError.name"
        />
      </div>

      <div
        class="inquiryForm_form"
        v-show="formValues.optionRadio !== $t('formContact.options.individual')"
      >
        <!-- Company Name -->
        <InputLabel
          color="white"
          color-required="white"
          class="inquiryForm_form_label"
          :value="$t('formContact.label.companyNameAndDepartment')"
          required
          tag-required
          size="large"
        />
        <TextInput
          color-input="white"
          class="inquiryForm_form_input"
          :model-value="formValues.companyName"
          :error-message="msgError.companyName"
          :border-radius="false"
          border-color="none"
          autocomplete="organization"
          @update:modelValue="handleInputFieldSetChange($event, 'companyName')"
        />
        <InputError
          v-show="msgError.companyName"
          class="inquiryForm_form_input_error"
          :value="msgError.companyName"
        />
      </div>

      <div class="inquiryForm_form">
        <!-- E-main -->
        <InputLabel
          color="white"
          color-required="white"
          class="inquiryForm_form_label"
          :value="$t('formContact.label.mailAddress')"
          required
          tag-required
          size="large"
        />
        <TextInput
          color-input="white"
          class="inquiryForm_form_input"
          :model-value="formValues.email"
          :error-message="msgError.email"
          :border-radius="false"
          border-color="none"
          autocomplete="email"
          @update:modelValue="handleInputFieldSetChange($event, 'email')"
        />
        <InputError
          v-show="msgError.email"
          class="inquiryForm_form_input_error"
          :value="msgError.email"
        />
      </div>

      <div
        class="inquiryForm_form"
        v-show="formValues.optionRadio !== $t('formContact.options.individual')"
      >
        <!-- Phone number -->
        <InputLabel
          color="white"
          color-required="white"
          class="inquiryForm_form_label"
          :value="$t('formContact.label.phoneNumber')"
          required
          tag-required
          size="large"
        />
        <TextInput
          color-input="white"
          class="inquiryForm_form_input"
          :model-value="formValues.phone"
          :error-message="msgError.phone"
          :border-radius="false"
          border-color="none"
          autocomplete="tel"
          @update:modelValue="handleInputFieldSetChange($event, 'phone')"
        />
        <InputError
          v-show="msgError.phone"
          class="inquiryForm_form_input_error"
          :value="msgError.phone"
        />
      </div>

      <div class="inquiryForm_form inquiryForm_form_textArea">
        <InputLabel
          color="white"
          color-required="white"
          class="inquiryForm_form_label"
          :value="$t('formContact.label.contactDetails')"
          required
          tag-required
          size="large"
        />
        <TextArea
          :model-value="formValues.detail"
          :border-radius="false"
          :error-message="msgError['detail']"
          bg-color="inquiryForm"
          border-color="none"
          row="3"
          col="140"
          class="inquiryForm_form_input"
          @update:modelValue="handleInputFieldSetChange($event, 'detail')"
        />
      </div>
      <span class="inquiryForm_form_note">{{ $t('formContact.note') }}</span>

      <Button
        type="outline"
        class="inquiryForm_form_button"
        size="medium"
        :label="$t('formContact.buttonMsg.send')"
        @onClick="handleSubmit"
      />
    </div>

    <div v-else class="inquiryForm inquiryForm_step2">
      <HeadingSet
        level="1"
        note-size="large"
        label-color="white"
        class="inquiryForm_step2_heading"
        font-weight="900"
        :headings="[{ text: $t('formContact.inquiryResponse.heading'), color: 'white' }]"
        :note="$t('formContact.inquiryResponse.subHeading')"
        align="left"
      />
      <br />
      <div class="inquiryForm_step2_card">
        <p v-html="$t('formContact.message.success')" />
      </div>
      <div v-if="!inTopPage" style="text-align: center">
        <LinkText color="white" :link="localePath('/')" :value="$t('bktohome.home')" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  reactive,
  PropType,
  computed,
  useRoute
} from '@nuxtjs/composition-api'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import HeadingSet, { HeadingLineInterface } from '~/components/molecules/HeadingSet/HeadingSet.vue'
import Button from '~/components/atoms/Button/CTAButton.vue'
import InputLabel from '~/components/atoms/Form/InputLabel/InputLabel.vue'
import TextInput from '~/components/atoms/Form/TextInput/TextInput.vue'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import RadioButtons from '~/components/atoms/Form/RadioButtons/RadioButtons.vue'

import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import {
  useReCaptcha,
  useFormValuesInit,
  useErrorDisplay,
  provideNotification
} from '~/composables'
import { I_Post_Contact_Response_Data, I_Response_Type } from '~/types/schema/response'
import { I_ContactRequest } from '~/types/schema/contact'

// props type
// interface InquiryFormProps {
//   headings: HeadingLineInterface[]
// }

enum Inquiry_Details_Radio_Buttons_Data {
  INDIVIDUAL = 0,
  CORPORATION = 1
}

export default defineComponent({
  name: 'InquiryForm',

  components: {
    TextArea,
    HeadingSet,
    InputLabel,
    TextInput,
    InputError,
    Button,
    LinkText,
    RadioButtons
  },

  props: {
    headings: {
      type: Array as PropType<HeadingLineInterface[]>,
      default: () => [
        {
          text: 'Heading',
          color: 'black'
        }
      ]
    },
    subHeading: {
      type: String,
      default: 'sub Heading'
    }
  },

  setup() {
    const { app } = useContext()
    const route = useRoute()

    const inTopPage = computed(() => {
      return route.value.path === '/' || route.value.path === '/en'
    })

    provideNotification()

    const { setError } = useErrorDisplay()

    const { getRecaptchaToken, recaptchaToken } = useReCaptcha()

    const inquiryDetailsRadioButtonsData = reactive([
      {
        id: Inquiry_Details_Radio_Buttons_Data.INDIVIDUAL,
        label: app.i18n.t('formContact.options.individual'),
        value: app.i18n.t('formContact.options.individual')
      },
      {
        id: Inquiry_Details_Radio_Buttons_Data.CORPORATION,
        label: app.i18n.t('formContact.options.corporation'),
        value: app.i18n.t('formContact.options.corporation')
      }
    ])

    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      name: '',
      email: '',
      detail: '',
      phone: '',
      companyName: '',
      optionRadio: app.i18n.t('formContact.options.individual')
    })

    delete msgError.optionRadio

    formValues.content = app.i18n.t('fixedRequest.contactDetailsRadioOptions')
    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    //------------------ Call API and increase Step if success

    const inquiryFormContactStep = ref(0)

    // check all form is filled

    const isDisableBtn = computed(() =>
      formValues.optionRadio === app.i18n.t('formContact.options.individual')
        ? isDisableBtnWithCondition(formValues, ['name', 'email', 'detail'])
        : isDisableBtnWithCondition(formValues, ['name', 'email', 'detail', 'phone', 'companyName'])
    )
    // run all input to force show error if input didnt filled
    const handleSubmit = () => {
      if (isDisableBtn.value) {
        Object.keys(formValues).forEach((field: string) => {
          handleInputChangeComposables(formValues, msgError, formValues[field], field, app)
        })

        return
      }

      handleSendContact(formValues as I_ContactRequest)
    }

    const handleSendContact = async (
      formValues: I_ContactRequest
    ): Promise<I_Response_Type<I_Post_Contact_Response_Data>> => {
      await getRecaptchaToken()
      formValues.recaptchaToken = recaptchaToken.value

      return await app
        .$repository('contact')
        .contactSend(formValues)
        .then(() => {
          inquiryFormContactStep.value++
        })
        .catch((error) => {
          const errorKeyCode = error.response?.data?.response.key

          setError(errorKeyCode, '')
        })
    }

    //---------------------------------------------------------------------

    return {
      inquiryFormContactStep,
      handleInputFieldSetChange,
      handleSubmit,
      formValues,
      msgError,
      isDisableBtn,
      inTopPage,
      inquiryDetailsRadioButtonsData
    }
  }
})
</script>

<style scoped lang="scss">
.inquiryFormContainer {
  padding: $spacing_14x $spacing_4x $spacing_24x;
  background: $color_black_gradient;
  @include mb() {
    padding: $spacing_6x $spacing_4x $spacing_14x;
  }

  .inquiryForm {
    max-width: $dashboard_contents_W;
    margin: 0 auto;

    &_heading {
      margin-bottom: $spacing_8x;
      @include fz($font_size_xlarge);
      /deep/ .headingSet_note {
        margin-top: $spacing_6x;
      }

      @include mb() {
        @include fz(28);
        margin-bottom: $spacing_6x;
        /deep/ .headingSet_note {
          margin-top: $spacing_4x;
          margin-bottom: 0 !important;
          @include fz(10);
        }
      }
    }

    &_form {
      margin-bottom: $spacing_6x;

      &_textArea {
        margin-bottom: $spacing_1x;
        @include mb() {
          margin-bottom: $spacing_2x;
        }
      }

      &_label {
        margin: auto 0 $spacing_4x;
        display: flex;
        align-items: center;

        @include mb() {
          margin-bottom: $spacing_2x;
        }
      }

      &_input {
        color: $color_white !important;
        &_error {
          margin-bottom: 24px;
        }
      }

      &_button {
        margin: $spacing_19x auto 0;
        @include mb() {
          margin: $spacing_14x auto 0;
        }
      }

      &_note {
        color: $color_white;
        float: right;
        font-size: 14px;
        @include mb() {
          @include fz(10);
        }
      }
    }

    &_step2 {
      &_heading {
        width: fit-content;
      }

      &_card {
        background: $color_gray_700;
        padding: $spacing_12x $spacing_4x;
        margin: 0 auto $spacing_8x;
        text-align: center;
        color: $color_white;
        width: 80%;

        @include mb() {
          width: 100%;
        }
      }
    }
  }
}
</style>
