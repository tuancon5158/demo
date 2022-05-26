<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left" wrap-size="large">
      <template #column-1>
        <div class="login">
          <Card>
            <template #title>
              <!-- パスワード再設定 -->
              <div>{{ $t('resetpw.successed.heading') }}</div>
            </template>
            <template #subtitle>
              {{ $t('resetpw.successed.leadtext1') }}
              <br />
              {{ $t('resetpw.successed.leadtext2') }}
            </template>
            <template #body>
              <hr />
              <div class="login_toPassChange">
                <LinkText
                  :link="localePath('login')"
                  color="secondary"
                  :value="$t('bktohome.login')"
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
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import Card from '~/components/atoms/Card/Card.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'

export default defineComponent({
  name: 'PasswordChanged',
  auth: false,
  components: {
    DefaultLayout,
    SectionContainer,
    Card,
    LinkText
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
