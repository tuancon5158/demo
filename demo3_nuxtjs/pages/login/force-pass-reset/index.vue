<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left" wrap-size="large">
      <template #column-1>
        <div class="forcePassResetTemp">
          <Card :is-loading="isLoading" positoin="center">
            <template #title>
              <div>{{ $t('forcePwReset.heading') }}</div>
            </template>
            <template #subtitle>
              <FormMessage v-if="serverError" :value="serverError" />
              <p v-html="$t('forcePwReset.text')" />
            </template>
            <template #body>
              <div class="forcePassResetTemp_body">
                <Button
                  :label="$t('forcePwReset.button')"
                  rounded
                  bg-color="primary"
                  border-color="primary"
                  @onClick="handleClickSubmit"
                />
                <div class="forcePassResetTemp_backLink">
                  <LinkText
                    color="secondary"
                    font-size="small"
                    :value="$t('forcePwReset.backLink')"
                    :link="localePath('/')"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, useRouter, ref, useContext } from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import Card from '~/components/atoms/Card/Card.vue'
import Button from '~/components/atoms/Button/Button.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import FormMessage from '~/components/atoms/Form/FormMessage/FormMessage.vue'
import { injectLoginUser } from '@/store/login'

export default defineComponent({
  name: 'ForcePassReset',

  components: {
    DefaultLayout,
    SectionContainer,
    Card,
    Button,
    LinkText,
    FormMessage
  },

  setup() {
    const { app } = useContext()
    const router = useRouter()

    const useLoginUserState = injectLoginUser()

    const isLoading = ref<boolean>(false)
    const serverError = ref()

    const handleClickSubmit = async () => {
      isLoading.value = true

      const resendConfirmRequest = useLoginUserState.getEmail()

      await app
        .$repository('users')
        .confirmEmail(resendConfirmRequest)
        .then(() => {
          router.push(app.localePath('login-force-pass-reset-sended'))
        })
        .catch((error) => {
          if (error?.data?.httpStatusCode === 404) {
            // ご入力いただいたメールアドレスは登録されていません。
            serverError.value = app.i18n.t('form.errorMessage.userNotFoundException')
          } else {
            serverError.value = app.i18n.t('form.errorMessage.normal')
          }
        })

      isLoading.value = false
    }

    return {
      handleClickSubmit,
      isLoading,
      serverError
    }
  },

  head: {}
})
</script>
