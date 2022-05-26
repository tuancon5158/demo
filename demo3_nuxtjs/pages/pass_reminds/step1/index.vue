<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left" wrap-size="large">
      <template #column-1>
        <div class="login">
          <Card :is-loading="isLoading">
            <template #title>
              <!-- パスワードリセット -->
              <div>{{ $t('reminds.heading') }}</div>
            </template>
            <template #subtitle>
              {{ $t('reminds.leadtext1') }}
              <br />
              {{ $t('reminds.leadtext2') }}
            </template>
            <template #body>
              <FormMessage v-if="errorMessage" :value="errorMessage" />
              <div class="login_form">
                <InputFieldSet
                  class="login_input"
                  :label="$t('form.label.email')"
                  type="email"
                  :model-value="formValues.email"
                  :error-message="msgError.email"
                  :place-holder="$t('form.placeHolder.email')"
                  autocomplete="email"
                  @update:modelValue="handleInputChange($event, 'email')"
                />
                <div class="login_submit">
                  <SubmitButton
                    class="login_button"
                    size="medium"
                    bg-color="secondary"
                    border-color="secondary"
                    rounded
                    :label="$t('reminds.button')"
                    @onClick="onClickSubmit"
                  />
                </div>
              </div>
              <div class="login_toPassChange">
                <LinkText
                  color="secondary"
                  :link="localePath('login')"
                  :value="$t('reminds.link')"
                />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watchEffect,
  useContext,
  SetupContext,
  useRouter
} from '@nuxtjs/composition-api'
import { I_ResendConfirmRequest } from '~/types/schema/auth'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import Card from '~/components/atoms/Card/Card.vue'
import SubmitButton from '~/components/atoms/Button/SubmitButton.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import { validateEmail } from '~/composables/utilities/formValidate/validate'
import { useEnterSubmit } from '~/composables'
export default defineComponent({
  name: 'PassRemindsStep1',

  auth: false,

  components: {
    DefaultLayout,
    SectionContainer,
    Card,
    SubmitButton,
    LinkText,
    InputFieldSet,
    FormMessage
  },

  setup() {
    const { app } = useContext()
    const router = useRouter()
    const isLoading = ref(false)
    const errorMessage = ref('')

    const handleSubmit = async (formValues: I_ResendConfirmRequest) => {
      isLoading.value = true

      await app
        .$repository('users')
        .confirmEmail(formValues.email)
        .then(() => {
          isLoading.value = false
          router.push(app.localePath('/pass_reminds/step2'))
        })
        .catch((error) => {
          isLoading.value = false
          const ststusCode = error.response?.data?.httpStatusCode

          if (ststusCode === 404 || ststusCode === 400) {
            errorMessage.value = app.i18n.t('form.errorMessage.userNotFoundException')
          } else if (ststusCode === 401) {
            errorMessage.value = app.i18n.t('form.errorMessage.unauthorized')
          } else {
            errorMessage.value = app.i18n.t('form.errorMessage.normal')
          }
        })
    }

    const formValues = reactive<I_ResendConfirmRequest>({
      email: ''
    })

    const msgError = reactive({
      email: ''
    })

    const handleInputChange = (value: string, name: string) => {
      formValues[name] = value
      validateEmail(formValues.email, msgError, 'email', app)
    }

    const onClickSubmit = () => {
      if (msgError.email !== '' || formValues.email === '') {
        errorMessage.value = app.i18n.t('form.errorMessage.unFilledFormInput')
      } else {
        handleSubmit(formValues)
      }
    }
    /*
     * Enter Press
     */

    useEnterSubmit(
      {
        email: ''
      },
      onClickSubmit
    )

    return {
      handleSubmit,
      onClickSubmit,
      isLoading,
      formValues,
      msgError,
      errorMessage,
      handleInputChange
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  &_input {
    margin-bottom: $spacing_5x;
  }

  &_submit {
    margin: $spacing_10x auto 0;
    text-align: center;
  }

  &_button {
    @include pc() {
      min-width: 300px;
    }
  }

  &_toPassChange {
    text-align: center;
    margin: $spacing_5x auto 0;
  }
}
</style>
