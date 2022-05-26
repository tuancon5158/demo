<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left" wrap-size="large">
      <template #column-1>
        <Card :is-loading="isLoading">
          <template #title>
            <!-- パスワード再設定 -->
            <div>{{ $t('resetpw.heading') }}</div>
          </template>
          <template #body>
            <FormMessage v-if="notificationMessage" :value="notificationMessage" />
            <div class="login_form">
              <InputFieldSet
                icon="password"
                icon-position="right"
                class="login_input"
                :label="$t('form.label.newPassword')"
                type="password"
                :model-value="formValues.password"
                :error-message="msgError['password']"
                place-holder="・・・・・・・・"
                autocomplete="new-password"
                @update:modelValue="handleInputFieldSetChange($event, 'password')"
              />
              <InputFieldSet
                icon="password"
                icon-position="right"
                class="login_input"
                :label="$t('form.label.newPasswordConfirm')"
                type="password"
                :model-value="formValues.passwordConfirm"
                :error-message="msgError['passwordConfirm']"
                place-holder="・・・・・・・・"
                autocomplete="new-password"
                @update:modelValue="handleInputFieldSetChange($event, 'passwordConfirm')"
              />
              <div class="login_submit">
                <Button
                  class="login_button"
                  :label="$t('resetpw.button')"
                  size="medium"
                  bg-color="secondary"
                  border-color="secondary"
                  rounded
                  @onClick="onClick"
                />
              </div>
            </div>
          </template>
        </Card>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  watchEffect,
  ref,
  useRouter,
  useRoute,
  computed
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Card from '~/components/atoms/Card/Card.vue'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import { handleInputChangeComposables } from '~/composables/utilities/formValidate/handleInputChange'
import { useEnterSubmit } from '~/composables'

import { I_UpdatePassword } from '~/types/schema/update'

export default defineComponent({
  name: 'ResetPassword',

  auth: false,

  components: {
    Button,
    Card,
    DefaultLayout,
    InputFieldSet,
    FormMessage,
    SectionContainer
  },

  setup() {
    const { app } = useContext()

    const router = useRouter()
    const route = useRoute()

    const isLoading = ref<boolean>(false)
    const serverError = ref()
    const myEmail = computed(() => {
      return route.value.query.email.toString().replace(' ', '+')
    })
    const myConfirmCode = computed(() => route.value.query.confirmCode.toString())

    const formValues = reactive({
      password: '',
      passwordConfirm: ''
    })

    const msgError = reactive({
      password: '',
      passwordConfirm: ''
    })

    const handleInputFieldSetChange = (value: string, fieldName: string) => {
      // set value & validate for each field
      handleInputChangeComposables(formValues, msgError, value, fieldName, app)
    }

    const notificationMessage = ref('')

    watchEffect(() => {
      notificationMessage.value = serverError.value
    })

    const onClick = () => {
      let isPass = true

      if (msgError.password !== '' || msgError.passwordConfirm !== '') {
        notificationMessage.value = app.i18n.t('form.errorMessage.unFilledFormInput')
        isPass = false
      }

      if (isPass) handleSubmit(formValues)
    }

    const handleSubmit = async (formValues) => {
      isLoading.value = true

      formValues.email = myEmail.value
      formValues.confirmCode = myConfirmCode.value

      await app
        .$repository('users')
        .newPassword(formValues)
        .then(() => {
          router.push(app.localePath('pass_reminds-step4'))
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message

          if (
            errorMessage === 'PasswordResetRequiredException' ||
            errorMessage === 'Invalid code provided, please request a code again.' ||
            errorMessage === 'Invalid verification code provided, please try again.'
          ) {
            resendMail(formValues.email)
          } else if (errorMessage === 'Attempt limit exceeded, please try after some time.') {
            serverError.value = app.i18n.t('form.errorMessage.limitExceeded')
          } else if (errorMessage === 'User already exists ') {
            serverError.value = app.i18n.t('form.errorMessage.alreadyExistEmail')
          } else if (errorMessage === 'Bad Request Exception') {
            serverError.value = app.i18n.t('form.errorMessage.badRequest')
          } else {
            serverError.value = app.i18n.t('form.errorMessage.normal')
          }
        })

      isLoading.value = false
    }

    const resendMail = async (myEmail) => {
      isLoading.value = true
      await app
        .$repository('users')
        .confirmEmail(myEmail)
        .then(() => {
          // router.push('/login/force-pass-reset/sended')
          router.push(app.localePath('login-force-pass-reset-re-sended'))
        })
        .catch((error) => {
          if (error?.data.httpStatusCode === 404) {
            // ご入力いただいたメールアドレスは登録されていません。
            serverError.value = app.i18n.t('form.errorMessage.userNotFoundException')
          } else if (error?.data.httpStatusCode === 400) {
            // Bad Request
            serverError.value = app.i18n.t('form.errorMessage.badRequest')
          } else {
            serverError.value = app.i18n.t('form.errorMessage.normal')
          }
        })

      isLoading.value = false
    }

    /*
     * Enter Press
     */
    useEnterSubmit(
      {
        email: ''
      },
      onClick
    )

    return {
      handleSubmit,
      isLoading,
      serverError,
      formValues,
      msgError,
      notificationMessage,
      handleInputFieldSetChange,
      onClick
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
