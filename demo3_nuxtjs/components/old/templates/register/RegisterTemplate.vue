<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left" wrap-size="large">
      <template #column-1>
        <div class="registerTemp">
          <Card v-if="status === 'input'" :is-loading="isLoading" width-size="small">
            <template #title>
              <!-- 新規アカウント作成 -->
              <div>{{ $t('signup.heading') }}</div>
            </template>
            <template #subtitle>
              {{ $t('signup.note1') }}
              <LinkText :link="localePath('login')" color="secondary" :value="$t('signup.note2')" />
            </template>
            <template #body>
              <RegisterForm
                :values="values"
                @onClickConfirm="onClickConfirm"
                @onClickSNSLogin="onClickSNSLogin"
              />
            </template>
          </Card>
          <Card v-if="status === 'confirm'" :is-loading="isLoading">
            <template #title>
              <div>{{ $t('signup.confirmHeading') }}</div>
            </template>
            <template #body>
              <FormMessage v-if="serverError" :value="serverError" />
              <RegisterConfirmForm
                v-if="status === 'confirm'"
                :values="values"
                @onClickBackInput="onClickBackInput"
                @onClickSubmit="onClickSubmit"
              />
            </template>
          </Card>
          <Card v-if="status === 'completed'" :is-loading="isLoading">
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
        </div>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import { I_RegisterRequest } from '~/types/schema/auth'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import Card from '~/components/atoms/Card/Card.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import RegisterForm from '~/components/organisms/RegisterForm/RegisterForm.vue'
import RegisterConfirmForm from '~/components/organisms/RegisterForm/RegisterConfirmForm.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'

export default defineComponent({
  name: 'RegisterTemplate',

  components: {
    DefaultLayout,
    SectionContainer,
    Card,
    LinkText,
    RegisterForm,
    RegisterConfirmForm,
    FormMessage
  },

  props: {
    status: {
      type: String,
      default: 'input'
    },
    values: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    serverError: {
      type: String,
      default: ''
    }
  },

  setup(_, context: SetupContext) {
    const onClickConfirm = (...inputData: [I_RegisterRequest, string]) => {
      context.emit('onClickConfirm', ...inputData)
    }

    const onClickBackInput = () => {
      context.emit('onClickBackInput')
    }

    const onClickSubmit = (formValues: I_RegisterRequest) => {
      context.emit('onClickSubmit', formValues)
    }

    const onClickSNSLogin = (SNSTypeStr) => {
      context.emit('onClickSNSLogin', SNSTypeStr)
    }

    return {
      onClickConfirm,
      onClickBackInput,
      onClickSubmit,
      onClickSNSLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.registerTemp {
  &_completed {
    background-color: $color_gray_lighten3;
    border-radius: 5px;
    padding: $spacing_5x;

    ul {
      margin-top: $spacing_3x;
      li {
        list-style: disc;
        margin-left: $spacing_5x;
      }
    }

    &_link {
      display: block;
      text-align: center;
      margin: $spacing_10x auto 0;
    }
  }
}
</style>
