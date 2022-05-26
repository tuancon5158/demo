<template>
  <div class="accountSetting_modal">
    <Modal v-if="visibleEmail" class="email" header-align="left" @onClose="closeEmail">
      <template #header>
        {{ $t('mypage.account.user.emailModal.heading') }}
      </template>
      <template #body>
        <FormMessage v-if="serverError !== ''" :value="serverError" />
        <div class="accountSetting_form_item">
          <InputFieldSet
            :label="$t('mypage.account.user.emailModal.pwLabel1')"
            type="email"
            :model-value="formValues.email"
            :error-message="msgError.email"
            place-holder="yamada.taro@last-miles.com"
            @update:modelValue="handleEmailInputChange($event, 'email')"
          />
        </div>
        <div class="accountSetting_form_item">
          <InputFieldSet
            :label="$t('mypage.account.user.emailModal.pwLabel2')"
            type="email"
            :model-value="formValues.emailConfirm"
            :error-message="msgError.emailConfirm"
            place-holder="yamada.taro@last-miles.com"
            @update:modelValue="handleEmailInputChange($event, 'emailConfirm')"
          />
        </div>
        <div class="accountSetting_submit">
          <Button
            :disabled="isDisableEmailBtn"
            bg-color="blue"
            :label="$t('mypage.account.user.emailModal.submit')"
            @onClick="handleSubmit('email')"
          />
        </div>
      </template>
    </Modal>
    <Modal v-if="visiblePassword" @onClose="closePassword">
      <template #header>
        {{ $t('mypage.account.user.pwModal.heading') }}
      </template>
      <template #body>
        <div class="accountSetting_form_item">
          <InputFieldSet
            icon="password"
            icon-position="right"
            :label="$t('mypage.account.user.pwModal.pwLabel1')"
            type="password"
            :model-value="formValues.password"
            :error-message="msgError.password"
            place-holder="・・・・・・・・"
            @update:modelValue="handlePasswordInputChange($event, 'password')"
          />
        </div>
        <div class="accountSetting_form_item">
          <InputFieldSet
            icon="password"
            icon-position="right"
            :label="$t('mypage.account.user.pwModal.pwLabel2')"
            type="password"
            :model-value="formValues.passwordConfirm"
            :error-message="msgError.passwordConfirm"
            place-holder="・・・・・・・・"
            @update:modelValue="handlePasswordInputChange($event, 'passwordConfirm')"
          />
        </div>
        <div class="accountSetting_submit">
          <Button
            :disabled="isDisablePasswordBtn"
            bg-color="blue"
            :label="$t('mypage.account.user.pwModal.submit')"
            @onClick="handleSubmit('password')"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, computed, ref } from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import Button from '~/components/atoms/Button/Button.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import {
  useOpenCloseToggle,
  useFormValuesInit,
  injectNotification,
  injectWorkspace,
  injectMember
} from '~/composables'
import {
  validateEmail,
  validateEmailConfirm,
  validatePassword,
  validatePasswordConfirm
} from '~/composables/utilities/formValidate/validate'
import useSetCookie from '~/composables/useSetCookie'
import useSocialLogin from '~/composables/useSocialLogin'

export default defineComponent({
  name: 'EmailPasswordChangeModal',

  components: {
    Modal,
    InputFieldSet,
    Button,
    FormMessage
  },

  setup() {
    const { app, $auth, redirect, $config } = useContext()
    const { formValues, msgError } = useFormValuesInit({
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: ''
    })
    const setNotiState = injectNotification()
    // const { setError } = useErrorDisplay()

    // handle disable button modal
    const isDisablePasswordBtn = computed(() => {
      if (
        !msgError.password &&
        !msgError.passwordConfirm &&
        formValues.password &&
        formValues.passwordConfirm
      ) {
        return false
      }

      return true
    })
    const isDisableEmailBtn = computed(() => {
      if (
        !msgError.email &&
        !msgError.emailConfirm &&
        formValues.email &&
        formValues.emailConfirm
      ) {
        return false
      }

      return true
    })

    // control modal
    const { open: openEmail, close: closeEmail, visible: visibleEmail } = useOpenCloseToggle()

    const {
      open: openPassword,
      close: closePassword,
      visible: visiblePassword
    } = useOpenCloseToggle()

    // need to validate confirm when email change (2 ways)
    const handleEmailInputChange = (value: string, name: string) => {
      formValues[name] = value
      validateEmail(formValues.email, msgError, 'email', app)
      validateEmailConfirm(formValues.emailConfirm, msgError, 'emailConfirm', formValues.email, app)
    }

    // need to validate confirm when password change (2 ways)
    const handlePasswordInputChange = (value: string, name: string) => {
      formValues[name] = value
      validatePassword(formValues.password, msgError, 'password', app)
      validatePasswordConfirm(
        formValues.passwordConfirm,
        msgError,
        'passwordConfirm',
        formValues.password,
        app
      )
    }

    // handlde Submit
    const handleSubmit = (val: string) => {
      if (val === 'email') {
        if (formValues.email === formValues.emailConfirm) {
          /// call api change email
          const dataEmail = {
            email: formValues.email,
            emailConfirm: formValues.emailConfirm
          }

          handleUpdateAccount(dataEmail, 'email')
        } else {
          alert('try email again')
        }
      }

      if (val === 'password') {
        if (formValues.password === formValues.passwordConfirm) {
          const dataPassword = {
            password: formValues.password,
            passwordConfirm: formValues.passwordConfirm
          }

          // call api change pw
          handleUpdateAccount(dataPassword, 'password')
        } else {
          alert('Please, Try password again')
        }
      }
    }

    // handle call API and redirect if success
    const serverError = ref('')

    // logout
    const { handleClickSNSLogoutButton } = useSocialLogin()
    const { removeCookieToken } = useSetCookie()
    const { removeWorkspaceLocalstrage } = injectWorkspace()
    const { removeMemberInfoLocalstrage } = injectMember()

    const logout = () => {
      $auth.logout().then(() => {
        // remove localstrage
        removeWorkspaceLocalstrage()
        removeMemberInfoLocalstrage()
        // remove cookie
        removeCookieToken($config.loginCookieDomain || '', '/')
        // social logout
        handleClickSNSLogoutButton('/login')
      })
    }

    const handleUpdateAccount = async (val, type) => {
      if (type === 'email') {
        await app
          .$repository('users')
          .changeEmail(val)
          .then(() => {
            setNotiState.setNotification(app.i18n.t('form.successMessage.updated'), 'success')

            logout()
            redirect(app.localePath('/login'))

            visibleEmail.value = false
          })

          .catch((error) => {
            const errorMessage = error.response?.data?.message

            if (errorMessage === 'An account with the given email already exists.') {
              serverError.value = app.i18n.t('form.errorMessage.alreadyExistEmail')
            } else {
              serverError.value = app.i18n.t('form.errorMessage.normal')
            }
          })
      }

      if (type === 'password') {
        await app
          .$repository('users')
          .changePassword(val)
          .then(() => {
            setNotiState.setNotification(app.i18n.t('form.successMessage.updated'), 'success')

            visiblePassword.value = false
          })
          .catch((error) => {
            const errorStatus = error.response?.status
            const errorMessage = error.response?.data.message

            // TODO: エラー確認
            if (errorStatus === 404 && errorMessage === 'User is not found.') {
              serverError.value = app.i18n.t('form.errorMessage.userIsNotFound')
            } else {
              serverError.value = app.i18n.t('form.errorMessage.normal')
            }
          })
      }
    }

    return {
      openEmail,
      closeEmail,
      visibleEmail,
      openPassword,
      closePassword,
      visiblePassword,
      formValues,
      msgError,
      isDisablePasswordBtn,
      isDisableEmailBtn,
      serverError,
      handleEmailInputChange,
      handlePasswordInputChange,
      handleSubmit,
      handleUpdateAccount
    }
  }
})
</script>

<style lang="scss" scoped>
.accountSetting {
  &_form {
    &_item {
      margin-bottom: $spacing_5x;
    }
  }

  &_submit {
    text-align: center;
  }
}
</style>
