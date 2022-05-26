<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" wrap-size="large">
      <template #column-1>
        <div class="registerCompleteTemp">
          <Card v-if="isLoading" :is-loading="isLoading" loading-color="primary">
            <div>
              <Spinner color="secondary" size="small" />
            </div>
          </Card>
          <Card v-if="!isLoading && isSuccessed" loading-color="primary">
            <template #title>
              <div>{{ $t('completeSignup.heading') }}</div>
            </template>
            <template #subtitle>
              {{ $t('completeSignup.text1') }}
              <br />
              {{ $t('completeSignup.text2') }}
            </template>
            <template #body>
              <div class="registerCompleteTemp_button">
                <Button
                  :label="$t('completeSignup.link')"
                  border-color="secondary"
                  bg-color="secondary"
                  rounded
                  :link="localePath('login')"
                />
              </div>
            </template>
          </Card>
          <Card v-if="!isLoading && !isSuccessed" loading-color="primary">
            <template #title>
              <div>{{ $t('completeSignup.headingError') }}</div>
            </template>
            <template #subtitle>
              {{ $t('completeSignup.text1Error') }}
              <br />
              {{ $t('completeSignup.text2Error') }}
            </template>
            <template #body>
              <div class="registerCompleteTemp_button">
                <Button
                  :label="$t('completeSignup.linkError')"
                  border-color="secondary"
                  bg-color="secondary"
                  rounded
                  :link="localePath('/register')"
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
import Card from '~/components/atoms/Card/Card.vue'
import Button from '~/components/atoms/Button/Button.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'

export default defineComponent({
  name: 'RegisterCompleteTemplate',

  components: {
    DefaultLayout,
    SectionContainer,
    Card,
    Button,
    Spinner
  },

  props: {
    isSuccessed: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.registerCompleteTemp {
  &_title {
    @include fz($font_size_l);
    font-weight: $font_weight_bold;
  }

  &_text {
    color: $font_color_base;
  }

  &_button {
    margin-top: $spacing_8x;
  }
}
</style>
