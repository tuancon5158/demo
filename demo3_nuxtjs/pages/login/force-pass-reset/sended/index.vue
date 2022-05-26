<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left" wrap-size="large">
      <template #column-1>
        <div class="passresetSendedTemp">
          <Card>
            <template #title>
              <div>
                {{ $t('authenticationCode.successed.heading') }}
              </div>
            </template>
            <template #subtitle>
              <p>
                {{ $t('authenticationCode.successed.text1') }}
                <br />
                {{ $t('authenticationCode.successed.text2') }}
                <br />
                {{ $t('authenticationCode.successed.text3') }}
              </p>
            </template>
            <template #body>
              <CautionBox />
              <div class="passresetSendedTemp_link">
                <LinkText link="/login" color="secondary" :value="$t('bktohome.login')" />
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
import CautionBox from '~/components/molecules/CautionBox/CautionBox.vue'

export default defineComponent({
  name: 'ForcePassResetSended',

  components: {
    DefaultLayout,
    SectionContainer,
    Card,
    LinkText,
    CautionBox
  }
})
</script>

<style lang="scss" scoped>
.passresetSendedTemp {
  &_title {
    font-size: 90%;
    text-align: center;
  }

  &_link {
    text-align: center;
    margin-top: $spacing_10x;
  }
}
</style>
