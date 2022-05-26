<template>
  <form class="register" onkeydown="return event.key != 'Enter';" @submit.prevent>
    <DividerWithText
      class="register_divider"
      :msg="$t('signup.sns.withSNS')"
      font-size="1.2rem"
      is-span
    />
    <div class="register_social">
      <Button
        class="register_social_button"
        :label="$t('signup.sns.withFacebook')"
        border-color="white"
        bg-color="facebook"
        icon="facebook"
        @onClick="onClickSNSLogin('facebook')"
      />
      <Button
        class="register_social_button"
        :label="$t('signup.sns.withGoogle')"
        border-color="gray"
        bg-color="white"
        icon="google"
        @onClick="onClickSNSLogin('google')"
      />
    </div>
    <DividerWithText
      class="register_divider"
      :msg="$t('signup.withEmail')"
      font-size="1.2rem"
      is-span
    />
    <InputFieldSet
      class="register_input"
      :label="$t('form.label.name')"
      type="text"
      :model-value="formValues.name"
      :error-message="msgError['name']"
      :place-holder="$t('form.placeHolder.name')"
      autocomplete="name"
      required
      @update:modelValue="handleNameInputChange($event, 'name')"
    />
    <InputFieldSet
      class="register_input"
      :label="$t('form.label.email')"
      type="email"
      :model-value="formValues.email"
      :error-message="msgError['email']"
      :place-holder="$t('form.placeHolder.email')"
      autocomplete="email"
      required
      @update:modelValue="handleEmailInputChange($event, 'email')"
    />
    <InputFieldSet
      icon="password"
      icon-position="right"
      class="register_input"
      :label="$t('form.label.password')"
      type="password"
      :model-value="formValues.password"
      :error-message="msgError['password']"
      autocomplete="new-password"
      place-holder="・・・・・・・・"
      required
      @update:modelValue="handlePasswordInputChange($event, 'password')"
    />
    <InputFieldSet
      icon="password"
      icon-position="right"
      class="register_input"
      :label="$t('form.label.passwordConfirm')"
      type="password"
      :model-value="formValues.passwordConfirm"
      :error-message="msgError['passwordConfirm']"
      autocomplete="new-password"
      place-holder="・・・・・・・・"
      required
      @update:modelValue="handlePasswordInputChange($event, 'passwordConfirm')"
    />
    <div class="register_footText">
      <!-- アカウントを作成することで利用規約に同意したことになります。 -->
      <span>{{ $t('signup.accept1') }}</span>
      <LinkText
        :link="localePath('terms-of-service')"
        color="secondary"
        :value="$t('signup.accept2')"
      />
      <span>{{ $t('signup.accept3') }}</span>
    </div>
    <div class="register_submit">
      <!-- 確認画面へ -->
      <SubmitButton
        :is-loading="true"
        class="register_button"
        :label="$t('signup.confirmButton')"
        size="medium"
        bg-color="primary"
        border-color="primary"
        rounded
        :disabled="!isSubmitButtonActive"
        @onClick="onClickConfirm"
      />
    </div>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  SetupContext,
  useContext,
  PropType,
  inject,
  watch
} from '@nuxtjs/composition-api'
import { I_RegisterRequest, I_MsgErrorRegisterRequest } from '~/types/schema/auth'
import Button from '~/components/atoms/Button/Button.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import SubmitButton from '~/components/atoms/Button/SubmitButton.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import DividerWithText from '~/components/molecules/DividerWithText/DividerWithText.vue'
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateRequiredFilled
} from '~/composables/utilities/formValidate/validate'
import { useScroll } from '~/composables'
interface I_RegisterFormProps {
  values: I_RegisterRequest
  isScrollTop: boolean
}

export default defineComponent({
  name: 'RegisterForm',

  components: {
    Button,
    InputFieldSet,
    SubmitButton,
    LinkText,
    DividerWithText
  },

  props: {
    values: {
      type: Object as PropType<I_RegisterRequest>,
      default: () => {}
    },
    isScrollTop: {
      type: Boolean,
      default: true
    }
  },

  setup(props: I_RegisterFormProps, context: SetupContext) {
    const { app } = useContext()
    const { scrollOnTop } = useScroll()
    scrollOnTop()

    // form items
    const formValues = reactive<I_RegisterRequest>({
      name: props.values.name || '',
      email: props.values.email || '',
      password: props.values.password || '',
      passwordConfirm: props.values.passwordConfirm || ''
    })

    // form error message
    const msgError = reactive<I_MsgErrorRegisterRequest>({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })

    const isSubmitButtonActive = ref(false)
    // handle Enter press
    const getInfoRegister: any = inject('getInfoRegister')

    watch(formValues, (value) => {
      getInfoRegister(value, isSubmitButtonActive.value)
    })

    onMounted(() => checkFormInput())

    const handleNameInputChange = (value: string, name: string) => {
      formValues[name] = value
      validateRequiredFilled(formValues[name], msgError, name, app)

      checkFormInput()
    }

    const handleEmailInputChange = (value: string, name: string) => {
      formValues[name] = value
      validateEmail(formValues.email, msgError, 'email', app)

      checkFormInput()
    }

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

      checkFormInput()
    }

    // un dusabled if no error and filed form input

    const checkFormInput = () => {
      let isPass = true
      const msgErrorKeys = Object.keys(msgError)

      for (let i = 0; i < msgErrorKeys.length; i++) {
        if (msgError[msgErrorKeys[i]] !== '' || formValues[msgErrorKeys[i]] === '') {
          isPass = false
          isSubmitButtonActive.value = false
          break
        }
      }

      if (isPass) isSubmitButtonActive.value = true
    }

    // jump to confirm page if with no eror
    const onClickConfirm = () => {
      context.emit('onClickConfirm', formValues, 'confirm')
    }

    const onClickSNSLogin = (SNSTypeStr) => {
      context.emit('onClickSNSLogin', SNSTypeStr)
    }

    return {
      formValues,
      msgError,
      isSubmitButtonActive,
      handleNameInputChange,
      handleEmailInputChange,
      handlePasswordInputChange,
      onClickConfirm,
      onClickSNSLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.register {
  &_input {
    margin-bottom: $spacing_5x;
  }

  &_footText {
    text-align: center;
  }

  &_submit {
    margin: $spacing_10x auto 0;
    text-align: center;
  }

  &_button {
    @include pc() {
      min-width: 30rem;
    }
  }

  &_divider {
    margin-bottom: $spacing_5x;
  }

  &_social {
    text-align: center;
    margin: 0 auto $spacing_10x;

    @include min-screen(map-get($breakpoints, sm) + 1px) {
      display: flex;
      justify-content: space-evenly;
    }

    &_button {
      width: 46% !important;
      min-width: auto;

      @include max-screen(map-get($breakpoints, sm)) {
        margin: 0 0 $spacing_2x !important;
        width: 100% !important;
      }
    }
  }
}
</style>
