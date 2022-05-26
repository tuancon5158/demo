<template>
  <DefaultLayout bg-color="gray">
    <HeroImageSection
      :label="$i18n.locale !== 'en' ? $t('privacy.pageTitle') : ''"
      :heading="$i18n.locale !== 'en' ? $t('privacy.heading') : $t('privacy.pageTitle')"
      tag="h1"
      image="common/hero.jpg"
    />
    <SectionContainer
      bg-color="gray"
      columns="1"
      position="left"
      container-size="xxlg"
      wrap-size="large"
    >
      <template #column-1>
        <div class="article_box">
          <dl class="privacyPolicy_dlist">
            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('privacy.define1.title') }}
              </h2>
            </dt>
            <dd>
              <p>
                {{ $t('privacy.define1.leadtext') }}
              </p>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('privacy.define2.title') }}
              </h2>
            </dt>
            <dd>
              <p>{{ $t('privacy.define2.leadtext') }}</p>
              <ul>
                <li>{{ $t('privacy.define2.list1') }}</li>
                <li>{{ $t('privacy.define2.list2') }}</li>
                <li>{{ $t('privacy.define2.list3') }}</li>
                <li>{{ $t('privacy.define2.list4') }}</li>
                <li>{{ $t('privacy.define2.list5') }}</li>
                <li>{{ $t('privacy.define2.list6') }}</li>
                <li>{{ $t('privacy.define2.list7') }}</li>
                <li>{{ $t('privacy.define2.list8') }}</li>
                <li>{{ $t('privacy.define2.list9') }}</li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('privacy.define3.title') }}
              </h2>
            </dt>
            <dd>
              <p>
                {{ $t('privacy.define3.leadtext') }}
              </p>
              <ul>
                <li>{{ $t('privacy.define3.list1') }}</li>
                <li>{{ $t('privacy.define3.list2') }}</li>
                <li>{{ $t('privacy.define3.list3') }}</li>
                <li>{{ $t('privacy.define3.list4') }}</li>
                <li>{{ $t('privacy.define3.list5') }}</li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('privacy.define4.title') }}
              </h2>
            </dt>
            <dd>
              <p>
                {{ $t('privacy.define4.leadtext') }}
              </p>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('privacy.define5.title') }}
              </h2>
            </dt>
            <dd>
              <p>
                {{ $t('privacy.define5.leadtext') }}
              </p>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('privacy.define6.title') }}
              </h2>
            </dt>
            <dd>
              <p>
                {{ $t('privacy.define6.leadtext') }}
              </p>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">{{ $t('privacy.define7.title') }}</h2>
            </dt>
            <dd>
              <p>
                {{ $t('privacy.define7.leadtext') }}
              </p>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">{{ $t('privacy.define8.title') }}</h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>
                  {{ $t('privacy.define8.list1.title') }}
                  <br />
                  {{ $t('privacy.define8.list1.text') }}
                </li>
                <li>
                  {{ $t('privacy.define8.list2.title') }}
                  <br />
                  {{ $t('privacy.define8.list2.text') }}
                </li>
                <li>
                  {{ $t('privacy.define8.list3.title') }}
                  <br />
                  {{ $t('privacy.define8.list3.text') }}
                </li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('privacy.define9.title') }}
              </h2>
            </dt>
            <dd>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="$t('privacy.define9.leadtext')"></p>
            </dd>
          </dl>
        </div>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import HeroImageSection from '~/components/organisms/HeroImageSection/HeroImageSection.vue'

export default defineComponent({
  name: 'Privacy',

  components: {
    DefaultLayout,
    SectionContainer,
    HeroImageSection
  },

  setup() {
    const { app } = useContext()
    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('meta.privacyPolicy.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.privacyPolicy.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.privacyPolicy.title')} | comony`
      }
    ]
  },

  head: {}
})
</script>

<style scoped lang="scss">
.privacyPolicy {
  &_dlist {
    dt {
      margin-bottom: $spacing_2x;
    }

    dd {
      margin-bottom: $spacing_5x;
    }
  }
}
</style>
