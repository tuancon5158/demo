<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="center">
      <template #column-1>
        <Card>
          <template #title>
            <h1 class="error_statusCode">{{ error.statusCode }}</h1>
          </template>
          <template #subtitle>
            <span class="error_message">{{ error.message }}</span>
          </template>
          <template #body>
            <div v-if="error.statusCode === 404" class="error_body">
              {{ $t('errorPage.notFound.text1') }}
              <br />
              {{ $t('errorPage.notFound.text2') }}
            </div>
            <div v-else-if="error.statusCode === 403" class="error_body">
              {{ $t('errorPage.forbidden.text1') }}
              <br />
              {{ $t('errorPage.forbidden.text2') }}
            </div>
            <div v-else class="error_body">
              {{ $t('errorPage.default.text1') }}
              <br />
              {{ $t('errorPage.default.text2') }}
              <br />
              {{ $t('errorPage.default.text3') }}
            </div>
            <LinkText :value="$t('backToHome')" color="secondary" :link="localePath('/')" />
          </template>
        </Card>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Card from '~/components/atoms/Card/Card.vue'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'

export default defineComponent({
  name: 'ErrorLayout',

  components: {
    DefaultLayout,
    SectionContainer,
    Card,
    LinkText
  },

  props: {
    error: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },

  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError

    return {
      title
    }
  }
})
</script>

<style lang="scss" scoped>
.error {
  &_statusCode {
    @include fz($font_size_error);
    font-weight: $font_weight_bold;
    color: $color_primary;
  }

  &_message {
    @include fz($font_size_xxl);
    text-align: center;
    font-weight: $font_weight_bold;
    color: $color_primary;
  }

  &_body {
    margin-bottom: $spacing_5x;
  }
}
</style>
