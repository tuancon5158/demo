<template>
  <DefaultLayout bg-color="gray">
    <div class="login">
      <Card>
        <template #title>
          <!-- メール送信完了 -->
          <div>{{ $t('reminds.successed.heading') }}</div>
        </template>
        <template #subtitle>
          {{ $t('reminds.successed.leadtext1') }}
          <br />
          {{ $t('reminds.successed.leadtext2') }}
        </template>
        <template #body>
          <hr />
          <div class="login_toPassChange">
            <LinkText :link="localePath('login')" :value="$t('bktohome.login')" color="secondary" />
          </div>
        </template>
      </Card>
    </div>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import Card from '~/components/atoms/Card/Card.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'

export default defineComponent({
  name: 'PassRemindSended',

  components: {
    DefaultLayout,
    Card,
    LinkText
  },

  setup() {}
})
</script>

<style lang="scss" scoped>
.login {
  margin: $spacing_25x auto $spacing_35x;

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
