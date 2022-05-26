<template>
  <div class="contactForm">
    <div v-if="currentStep == 1" class="contactForm_form">
      <InputFieldSet
        v-model="formValues.name"
        class="contactForm_input"
        :label="$t('formContact.label.name')"
        :model-value="formValues.name"
        :error-message="msgError['name']"
        :place-holder="$t('formContact.placeHolder.name')"
        :required="true"
        autocomplete="name"
        @update:modelValue="handleInputFieldSetChange($event, 'name')"
      />
      <InputFieldSet
        class="contactForm_input"
        :label="$t('formContact.label.mailAddress')"
        :model-value="formValues.email"
        :error-message="msgError['email']"
        :place-holder="$t('formContact.placeHolder.email')"
        :required="true"
        autocomplete="email"
        @update:modelValue="handleInputFieldSetChange($event, 'email')"
      />
      <InputFieldSet
        class="contactForm_input"
        :label="$t('formContact.label.phoneNumber')"
        :model-value="formValues.phone"
        :error-message="msgError['phone']"
        :place-holder="$t('formContact.placeHolder.phone')"
        autocomplete="tel"
        @update:modelValue="handleInputFieldSetChange($event, 'phone')"
      />
      <InputFieldSet
        class="contactForm_input"
        :label="$t('formContact.label.companyName')"
        :error-message="msgError['companyName']"
        :model-value="formValues.companyName"
        :place-holder="$t('formContact.placeHolder.companyName')"
        autocomplete="organization"
        @update:modelValue="handleInputFieldSetChange($event, 'companyName')"
      />
      <InputFieldSet
        class="contactForm_input"
        :label="$t('formContact.label.department')"
        :error-message="msgError['department']"
        :model-value="formValues.department"
        :place-holder="$t('formContact.placeHolder.department')"
        autocomplete="organization-title"
        @update:modelValue="handleInputFieldSetChange($event, 'department')"
      />
      <div class="contactForm_input">
        <InputLabel
          size="medium"
          :value="$t('formContact.label.inquiryDetaill')"
          :required="true"
          color="gray"
        />
        <RadioButtons
          class="contactForm_input_radio"
          :error-message="msgError.optionRadio"
          :model-value="formValues.optionRadio"
          :radio-buttons-data="inquiryDetailsRadioButtonsData"
          label-color="gray"
          @update:modelValue="formValues.optionRadio = $event"
        />
      </div>
      <div class="contactForm_input">
        <InputLabel
          size="medium"
          :value="$t('formContact.label.contactDetails')"
          :required="true"
          color="gray"
        />
        <TextArea
          row="5"
          col="140"
          :error-message="msgError['contactDetails']"
          :placeholder="$t('formContact.placeHolder.detail')"
          :model-value="formValues.contactDetails"
          @update:modelValue="handleInputFieldSetChange($event, 'contactDetails')"
        />
      </div>
      <div class="contactForm_caution">
        <LinkText :value="$t('formContact.link.policy')" color="secondary" link="/privacy-policy" />
        {{ $t('formContact.message.policy') }}
      </div>
    </div>

    <transition name="fade">
      <div v-if="currentStep == 2" class="contactForm_form">
        <ContactStep2
          :data-contact-page="formValues"
          :inquiry-details-radio-buttons-data="inquiryDetailsRadioButtonsData"
        />
      </div>
    </transition>

    <transition name="fade">
      <div v-if="currentStep == 3" class="contactForm_form">
        <ContactStep3 />
      </div>
    </transition>

    <div v-if="currentStep !== 3" class="contactForm_submit">
      <Button
        v-if="currentStep !== 1"
        bg-color="white"
        border-color="primary"
        size="large"
        :label="$t('formContact.buttonMsg.back')"
        rounded
        @click.native="handleBack"
      />
      <Button
        border-color="primary"
        bg-color="primary"
        :label="
          currentStep == 1 ? $t('formContact.buttonMsg.confirm') : $t('formContact.buttonMsg.send')
        "
        size="large"
        rounded
        :disabled="isDisableBtn"
        @click.native="handleSubmit"
      />
      <div v-if="isDisableBtn" class="contactForm_notice">※ {{ $t('formContact.notice') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, useContext, computed } from '@nuxtjs/composition-api'
import ContactStep2 from './ContactStep2.vue'
import ContactStep3 from './ContactStep3.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import RadioButtons from '~/components/atoms/Form/RadioButtons/RadioButtons.vue'
import TextArea from '~/components/atoms/Form/TextArea/TextArea.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import Button from '~/components/atoms/Button/Button.vue'
import InputLabel from '~/components/atoms/Form/InputLabel/InputLabel.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import { useFormValuesInit } from '~/composables'

interface I_Inquiry_Details_Radio_Buttons_Data {
  id: number
  label: string
  value: string
}

enum Inquiry_Details_Radio_Buttons_Data {
  ABOUT_SERVICE_USAGE = 1,
  DOCUMENT_REQUEST = 2,
  ABOUT_CONTRACT_DETAIL = 3,
  OTHER = 4
}
export default defineComponent({
  name: 'ContactForm',

  components: {
    InputFieldSet,
    RadioButtons,
    TextArea,
    Button,
    LinkText,
    ContactStep2,
    ContactStep3,
    InputLabel
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    currentStep: {
      type: Number,
      default: 1
    }
  },

  emits: ['increaseStep', 'descreaseStep'],
  setup(_, { emit }) {
    const { app, route } = useContext()

    // data
    const { formValues, msgError, isDisableBtnWithCondition } = useFormValuesInit({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      department: '',
      optionRadio: app.i18n.t('formContact.label.inquiryDetailsOptions.aboutServiceUsage'),
      contactDetails: ''
    })

    const isDisableBtn = computed(() =>
      isDisableBtnWithCondition(formValues, ['name', 'email', 'contactDetails'], ['phone'])
    )

    delete msgError.optionRadio

    const inquiryDetailsRadioButtonsData: I_Inquiry_Details_Radio_Buttons_Data[] = reactive([
      {
        id: Inquiry_Details_Radio_Buttons_Data.ABOUT_SERVICE_USAGE,
        label: app.i18n.t('formContact.label.inquiryDetailsOptions.aboutServiceUsage'),
        value: app.i18n.t('formContact.label.inquiryDetailsOptions.aboutServiceUsage')
      },
      {
        id: Inquiry_Details_Radio_Buttons_Data.DOCUMENT_REQUEST,
        label: app.i18n.t('formContact.label.inquiryDetailsOptions.documentRequest'),
        value: app.i18n.t('formContact.label.inquiryDetailsOptions.documentRequest')
      },
      {
        id: Inquiry_Details_Radio_Buttons_Data.ABOUT_CONTRACT_DETAIL,
        label: app.i18n.t('formContact.label.inquiryDetailsOptions.aboutContractDetail'),
        value: app.i18n.t('formContact.label.inquiryDetailsOptions.aboutContractDetail')
      },
      {
        id: Inquiry_Details_Radio_Buttons_Data.OTHER,
        label: app.i18n.t('formContact.label.inquiryDetailsOptions.other'),
        value: app.i18n.t('formContact.label.inquiryDetailsOptions.other')
      }
    ])

    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    const handleSubmit = () => {
      if (isDisableBtn.value) return

      emit('increaseStep', formValues)
    }

    const handleBack = () => {
      emit('descreaseStep')
    }

    onMounted(() => {
      if (route.value.hash === '#contract') {
        formValues.optionRadio =
          inquiryDetailsRadioButtonsData[Inquiry_Details_Radio_Buttons_Data.DOCUMENT_REQUEST].label
      }
    })

    return {
      inquiryDetailsRadioButtonsData,
      formValues,
      msgError,
      handleInputFieldSetChange,
      handleSubmit,
      handleBack,
      isDisableBtn
    }
  }
})
</script>

<style scoped lang="scss">
.contactForm {
  padding: 0 5%;
  margin: 0 auto;

  &_input {
    margin-bottom: $spacing_4x;

    &_radio {
      margin: $spacing_2x;
    }
  }

  &_submit {
    text-align: center;

    button {
      @include max-screen(map-get($breakpoints, sm)) {
        width: 100%;
        margin-top: $spacing_1x;
      }
    }
  }

  &_caution {
    text-align: center;
    margin: $spacing_15x auto $spacing_5x;
  }

  &_notice {
    @include fz($font_size_xxs);
    color: $color_red_500;
    margin-top: $spacing_2x;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.7s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
