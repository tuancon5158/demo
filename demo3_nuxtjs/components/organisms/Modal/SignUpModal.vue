<template>
  <Modal size="medium" @onClose="onClose">
    <template #body>
      <Card
        v-if="status === 'input'"
        :is-loading="isLoading"
        width-size="small"
        card-padding="small"
        :is-shawdow="false"
      >
        <template #title>
          <!-- 新規アカウント作成 -->

          <div class="signUpModal_inputTitle">
            <img src="../../../assets/images/icon/unlock.svg" width="35" height="35" />
            <span v-html="$t('signup.headingModalText1')" />
          </div>
        </template>
        <template #subtitle>
          {{ $t('signup.note1') }}
          <LinkText :link="localePath('login')" color="secondary" :value="$t('signup.note2')" />
        </template>
        <template #body>
          <RegisterForm
            :values="values"
            :is-scroll-top="false"
            @onClickConfirm="handleClickConfirm"
            @onClickSNSLogin="handleSNSLogin"
          />
        </template>
      </Card>
      <Card
        v-if="status === 'confirm'"
        :is-loading="isLoading"
        card-padding="small"
        :is-shawdow="false"
      >
        <template #title>
          <div>{{ $t('signup.confirmHeading') }}</div>
        </template>
        <template #body>
          <FormMessage v-if="serverError" :value="serverError" />
          <RegisterConfirmForm
            v-if="status === 'confirm'"
            :values="values"
            :is-scroll-top="false"
            @onClickBackInput="handleClickBackInput"
            @onClickSubmit="handleClickSubmit"
          />
        </template>
      </Card>
      <Card v-if="status === 'completed'" :is-loading="isLoading" :is-shawdow="false">
        <template #title>
          <div>{{ $t('temporary.heading') }}</div>
        </template>
        <template #subtitle>
          {{ $t('temporary.text1') }}
          {{ values.email }} {{ $t('temporary.text2') }}
          <br />
          {{ $t('temporary.text3') }}
        </template>
        <template #body>
          <div class="registerTemp_completed">
            <strong>{{ $t('temporary.text4') }}</strong>
            <ul>
              <li>
                {{ $t('temporary.text5') }}
              </li>
              <li>
                {{ $t('temporary.text6') }}
              </li>
            </ul>
          </div>
          <LinkText
            class="registerTemp_completed_link"
            link="/"
            color="secondary"
            :value="$t('temporary.link')"
          />
        </template>
      </Card>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import Card from '~/components/atoms/Card/Card.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import RegisterForm from '~/components/organisms/RegisterForm/RegisterForm.vue'
import RegisterConfirmForm from '~/components/organisms/RegisterForm/RegisterConfirmForm.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import { useRegister } from '~/composables'

export default defineComponent({
  name: 'SignUpModal',

  components: {
    Modal,
    Card,
    LinkText,
    RegisterForm,
    RegisterConfirmForm,
    FormMessage
  },

  props: {
    spaceId: {
      type: String,
      default: ''
    }
  },

  setup(_, context: SetupContext) {
    // close modal
    const onClose = () => {
      context.emit('onClose')
    }

    return {
      onClose,
      ...useRegister()
    }
  }
})
</script>

<style lang="scss" scoped>
.signUpModal {
  &_inputTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: $space_modal_contents_W;
    @include fz($font_size_large);

    @include mb() {
      @include fz($font_size_medium);
    }

    img {
      margin-right: $spacing_6x;
    }

    span {
      display: block;
    }
  }
}
</style>
