<template>
  <div class="registerConfirm">
    <form class="registerConfirm" @submit.prevent>
      <InputFieldSet
        class="registerConfirm_input"
        :label="$t('form.label.name')"
        type="text"
        :model-value="values.name"
        autocomplete="name"
        place-holder="handlePasswordInputChange"
        disabled
      />
      <InputFieldSet
        class="registerConfirm_input"
        :label="$t('form.label.email')"
        type="email"
        :model-value="values.email"
        autocomplete="email"
        place-holder="lastmile@comony.net"
        disabled
      />
      <InputFieldSet
        icon="password"
        icon-position="right"
        class="registerConfirm_input"
        :label="$t('form.label.password')"
        type="password"
        :model-value="values.password"
        autocomplete="password"
        place-holder="・・・・・・・・"
        disabled
      />
      <InputFieldSet
        icon="password"
        icon-position="right"
        class="registerConfirm_input"
        :label="$t('form.label.passwordConfirm')"
        type="password"
        :model-value="values.passwordConfirm"
        autocomplete="password"
        place-holder="・・・・・・・・"
        disabled
      />
      <div class="registerConfirm_button">
        <Button
          bg-color="gray"
          :label="$t('form.button.back')"
          rounded
          @onClick="onClickBackInput"
        />
        <SubmitButton
          :is-loading="true"
          :label="$t('form.button.send')"
          size="medium"
          bg-color="primary"
          border-color="primary"
          rounded
          @onClick="onClickSubmit"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@nuxtjs/composition-api'
import { I_RegisterRequest } from '~/types/schema/auth'
import Button from '~/components/atoms/Button/Button.vue'
import SubmitButton from '~/components/atoms/Button/SubmitButton.vue'
import InputFieldSet from '~/components/molecules/Form/InputFieldSet/InputFieldSet.vue'
import { useScroll } from '~/composables'
interface I_RegisterConfirmFormProps {
  values: I_RegisterRequest
  isScrollTop: boolean
}

export default defineComponent({
  name: 'RegisterConfirmForm',

  components: {
    Button,
    SubmitButton,
    InputFieldSet
  },

  props: {
    values: {
      type: Object as PropType<I_RegisterRequest>,
      default: () => {}
    }
  },

  setup(props: I_RegisterConfirmFormProps, context: SetupContext) {
    // scroll on Top
    const { scrollOnTop } = useScroll()
    scrollOnTop()

    const onClickSubmit = () => {
      context.emit('onClickSubmit', props.values)
    }

    const onClickBackInput = () => {
      context.emit('onClickBackInput')
    }

    return {
      onClickSubmit,
      onClickBackInput
    }
  }
})
</script>

<style lang="scss" scoped>
.registerConfirm {
  &_input {
    margin-bottom: $spacing_5x;
  }

  &_submit {
    margin: $spacing_10x auto 0;
    text-align: center;
  }

  &_button {
    text-align: center;

    button {
      margin: 0 $spacing_1x;

      @include max-screen(map-get($breakpoints, sm)) {
        width: 100%;
        margin-top: $spacing_1x;
      }
    }
  }
}
</style>
