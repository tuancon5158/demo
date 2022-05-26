<template>
  <form class="login" onkeydown="return event.key != 'Enter';" @submit.prevent>
    <FormMessage v-if="serverError !== ''" class="is-pc" :value="serverError" />
    <DividerWithText
      class="login_divider"
      :msg="$t('login.sns.withSNS')"
      font-size="1.2rem"
      is-span
    />
    <div class="login_social">
      <Button
        class="login_social_button"
        :label="$t('login.sns.withFacebook')"
        border-color="white"
        bg-color="facebook"
        icon="facebook"
        @onClick="onClickSNSLogin('facebook')"
      />
      <Button
        class="login_social_button"
        :label="$t('login.sns.withGoogle')"
        border-color="gray"
        bg-color="white"
        icon="google"
        @onClick="onClickSNSLogin('google')"
      />
    </div>
    <DividerWithText
      class="login_divider"
      :msg="$t('login.withEmail')"
      font-size="1.2rem"
      is-span
    />
    <FormMessage v-if="serverError !== ''" class="is-sp" :value="serverError" />
    <InputFieldSet
      class="login_input"
      :label="$t('form.label.email')"
      type="email"
      autocomplete="email"
      :model-value="formValues.email"
      :error-message="msgError['email']"
      :place-holder="$t('form.placeHolder.email')"
      @update:modelValue="handlEmailInputChange($event, 'email')"
    />
    <InputFieldSet
      icon="password"
      icon-position="right"
      class="login_input"
      type="password"
      autocomplete="password"
      :label="$t('form.label.password')"
      :model-value="formValues.password"
      :error-message="msgError['password']"
      place-holder="・・・・・・・・"
      @update:modelValue="handlPasswordInputChange($event, 'password')"
    />
    <!-- <p>
      <input id="checkbox" v-model="formValues.remember_me" type="checkbox" />
      <label for="checkbox">{{ $t('login.save') }}</label>
    </p> -->
    <div class="login_submit">
      <SubmitButton
        :spinner="true"
        spinner-color="secondary"
        :is-loading="isLoading"
        class="login_button"
        :label="$t('login.button')"
        size="medium"
        bg-color="secondary"
        border-color="secondary"
        rounded
        @onClick="onClickSubmit"
      />
    </div>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  useContext,
  inject,
  watch
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import SubmitButton from '~/components/atoms/Button/SubmitButton.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import DividerWithText from '~/components/molecules/DividerWithText/DividerWithText.vue'
import { validateRequiredFilled } from '~/composables/utilities/formValidate/validate'
import { I_LoginRequest, I_MsgErrorLoginRequest } from '~/types/schema/auth'

export default defineComponent({
  name: 'LoginForm',

  components: {
    Button,
    SubmitButton,
    InputFieldSet,
    FormMessage,
    DividerWithText
  },

  props: {
    serverError: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  setup(_, context: SetupContext) {
    const { app } = useContext()

    const formValues: I_LoginRequest = reactive({
      email: '',
      password: '',
      remember_me: false // TODO: BEの処理復活したら戻す
    })

    const msgError: I_MsgErrorLoginRequest = reactive({
      email: '',
      password: ''
    })

    const handlEmailInputChange = (value: string, name: string) => {
      formValues[name] = value
      validateRequiredFilled(formValues.email, msgError, 'email', app)
    }

    const handlPasswordInputChange = (value: string, name: string) => {
      formValues[name] = value
      validateRequiredFilled(formValues.password, msgError, 'password', app)
    }

    const onClickSubmit = () => {
      let isPass = true
      const msgErrorKeys: string[] = Object.keys(msgError)

      for (let i = 0; i < msgErrorKeys.length; i++) {
        if (msgError[msgErrorKeys[i]] !== '') {
          isPass = false
          break
        }
      }

      if (isPass) context.emit('onClickSubmit', formValues)
    }

    const onClickSNSLogin = (SNSTypeStr) => {
      context.emit('onClickSNSLogin', SNSTypeStr)
    }

    // ------------------ Enter Press submit-----------------

    const getInfoLogin: any = inject('updateDataEnterPress')

    watch(formValues, (value) => {
      getInfoLogin(value)
    })

    // ------------------ //////////////////-----------------

    return {
      formValues,
      msgError,
      handlEmailInputChange,
      handlPasswordInputChange,
      onClickSubmit,
      onClickSNSLogin
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
