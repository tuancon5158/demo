<template>
  <DefaultLayout>
    <div class="contactTemp">
      <div class="contactTemp_left">
        <div class="contactTemp_title">
          <div class="contactTemp_title_label">
            {{ $t('formContact.content.label') }}
          </div>
          <Heading
            level="2"
            align="center"
            font-weight="600"
            :headings="[
              {
                text: $t('formContact.content.heading'),
                color: 'black',
                spBreak: false
              }
            ]"
          />
        </div>
        <Stepper
          class="contactTemp_stepper"
          :options="stepperOptions"
          position="center"
          :current-number="currentStep"
        />
        <div class="contactTemp_notification">
          <FormMessage v-if="serverError" :value="serverError" />
        </div>
        <ContactForm
          class="contactTemp_form"
          :current-step="currentStep"
          @increaseStep="handleIncreaseStep"
          @descreaseStep="handleDecreaseStep"
        />
      </div>
      <AddressBar class="contactTemp_right" />
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, useContext, reactive, useMeta, ref } from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import ContactForm from '~/components/organisms/Contact/ContactForm.vue'
import Stepper from '~/components/molecules/Stepper/Stepper.vue'
import AddressBar from '~/components/molecules/AddressBar/AddressBar.vue'
import Heading from '~/components/atoms/Heading/Heading.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import { I_ContactInput, I_ContactRequest } from '~/types/schema/contact'
import { I_Post_Contact_Response_Data, I_Response_Type } from '~/types/schema/response'
import useReCaptcha from '~/composables/useReCaptcha'

export default defineComponent({
  name: 'Contact',

  auth: false,

  components: {
    DefaultLayout,
    ContactForm,
    Stepper,
    AddressBar,
    Heading,
    FormMessage
  },
  setup() {
    const { app } = useContext()

    const stepperOptions = reactive({
      headers: [
        {
          title_pc: app.i18n.t('formContact.stepper.step1'),
          title_sp: '入力'
        },
        {
          title_pc: app.i18n.t('formContact.stepper.step2'),
          title_sp: '確認'
        },
        {
          title_pc: app.i18n.t('formContact.stepper.step3'),
          title_sp: '完了'
        }
      ],
      prevText: 'Previous',
      nextText: 'Next'
    })

    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('meta.contact.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.contact.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.contact.title')} | comony`
      }
    ]

    const currentStep = ref<number>(1)

    const handleIncreaseStep = (val: I_ContactInput) => {
      if (currentStep.value < 2) {
        currentStep.value++
      } else {
        const { optionRadio: content, contactDetails: detail, ...rest } = val
        const formValues: I_ContactRequest = {
          content,
          detail,
          ...rest
        }

        handleSendContact(formValues)
      }
    }
    const handleDecreaseStep = () => {
      if (currentStep.value > 1) currentStep.value--
    }

    const serverError = ref()

    const { getRecaptchaToken, recaptchaToken } = useReCaptcha()

    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
          currentStep.value++
        })
        .catch(() => {
          serverError.value = app.i18n.t('form.errorMessage.normal')
          scrollTop()
        })
    }

    return {
      serverError,
      currentStep,
      handleIncreaseStep,
      handleDecreaseStep,
      handleSendContact,
      stepperOptions
    }
  },

  head: {}
})
</script>
<style scoped lang="scss">
.contactTemp {
  @include pc() {
    display: flex;
    min-height: calc(100vh - #{$header_H_pc});
  }

  &_title {
    text-align: center;

    &_label {
      font-weight: $font_weight_bold;
      color: $color_primary;
      margin-bottom: $spacing_4x;
    }
  }

  &_stepper {
    margin: $spacing_12x auto 0;
  }

  &_notification {
    padding: $spacing_8x 5% 0;
  }

  &_form {
    flex: 1;
    // padding-top: 30px;
  }

  &_left {
    margin: $spacing_15x auto;
    overflow: hidden;

    @include pc() {
      width: calc(100% - #{$AddressBar_W});
    }
  }

  &_right {
    flex: 1;
    overflow: hidden;

    @include mb() {
      display: none !important;
    }
  }
}
</style>
