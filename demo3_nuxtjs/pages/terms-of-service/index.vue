<template>
  <DefaultLayout bg-color="gray">
    <HeroImageSection
      :label="$i18n.locale !== 'en' ? $t('terms.pageTitle') : ''"
      :heading="$i18n.locale !== 'en' ? $t('terms.heading') : $t('terms.pageTitle')"
      tag="h1"
      image="common/hero.jpg"
      size="medium"
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
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p class="article_text--center" v-html="$t('terms.text1')" />
          <dl class="termsTemp_dlist">
            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('terms.define1.title') }}
              </h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define1.list1') }}</li>
                <li>{{ $t('terms.define1.list2') }}</li>
              </ul>
            </dd>
            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define2.title') }}</h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define2.list1') }}</li>
                <li>{{ $t('terms.define2.list2') }}</li>
                <li>
                  {{ $t('terms.define2.list3') }}
                  <ul>
                    <li>{{ $t('terms.define2.list4') }}</li>
                    <li>{{ $t('terms.define2.list5') }}</li>
                    <li>{{ $t('terms.define2.list6') }}</li>
                    <li>{{ $t('terms.define2.list7') }}</li>
                    <li>{{ $t('terms.define2.list8') }}</li>
                  </ul>
                </li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define3.title') }}</h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define3.list1') }}</li>
                <li>{{ $t('terms.define3.list2') }}</li>
                <li>{{ $t('terms.define3.list3') }}</li>
              </ul>
            </dd>
            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('terms.define4.title') }}
              </h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define4.list1') }}</li>
                <li>{{ $t('terms.define4.list2') }}</li>
              </ul>
            </dd>
            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('terms.define5.title') }}
              </h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define5.list1') }}</li>
                <li>{{ $t('terms.define5.list2') }}</li>
                <li>{{ $t('terms.define5.list3') }}</li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('terms.define6.title') }}
              </h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define6.leadtext1') }}</li>
                <li>{{ $t('terms.define6.leadtext2') }}</li>
                <li>
                  {{ $t('terms.define6.leadtext3.title') }}
                  <ul>
                    <li>{{ $t('terms.define6.leadtext3.list1') }}</li>
                    <li>{{ $t('terms.define6.leadtext3.list2') }}</li>
                    <li>{{ $t('terms.define6.leadtext3.list3') }}</li>
                    <li>{{ $t('terms.define6.leadtext3.list4') }}</li>
                    <li>{{ $t('terms.define6.leadtext3.list5') }}</li>
                  </ul>
                </li>
                <li>
                  {{ $t('terms.define6.leadtext4.title') }}
                  <ul>
                    <li>{{ $t('terms.define6.leadtext4.description') }}</li>
                  </ul>
                </li>
                <li>
                  {{ $t('terms.define6.leadtext5.title') }}
                  <ul>
                    <li>{{ $t('terms.define6.leadtext5.list1') }}</li>
                    <li>{{ $t('terms.define6.leadtext5.list2') }}</li>
                    <li>{{ $t('terms.define6.leadtext5.list3') }}</li>
                    <li>{{ $t('terms.define6.leadtext5.list4') }}</li>
                  </ul>
                </li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('terms.define7.title') }}
              </h2>
            </dt>
            <dd>
              <p>
                {{ $t('terms.define7.leadtext') }}
              </p>
              <ul class="article_list--number">
                <li>{{ $t('terms.define7.list1') }}</li>
                <li>{{ $t('terms.define7.list2') }}</li>
                <li>{{ $t('terms.define7.list3') }}</li>
                <li>{{ $t('terms.define7.list4') }}</li>
                <li>{{ $t('terms.define7.list5') }}</li>
                <li>{{ $t('terms.define7.list6') }}</li>
                <li>{{ $t('terms.define7.list7') }}</li>
                <li>{{ $t('terms.define7.list8') }}</li>
                <li>{{ $t('terms.define7.list9') }}</li>
                <li>{{ $t('terms.define7.list10') }}</li>
                <li>{{ $t('terms.define7.list11') }}</li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">
                {{ $t('terms.define8.title') }}
              </h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>
                  {{ $t('terms.define8.leadtext') }}
                  <ul>
                    <li>{{ $t('terms.define8.list1') }}</li>
                    <li>{{ $t('terms.define8.list2') }}</li>
                    <li>{{ $t('terms.define8.list3') }}</li>
                    <li>{{ $t('terms.define8.list4') }}</li>
                  </ul>
                </li>
                <li>{{ $t('terms.define8.list5') }}</li>
              </ul>
            </dd>
            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define9.title') }}</h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define9.list1') }}</li>
                <li>{{ $t('terms.define9.list2') }}</li>
              </ul>
            </dd>
            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define10.title') }}</h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>
                  {{ $t('terms.define10.leadtext1') }}
                  <ul>
                    <li>{{ $t('terms.define10.list1') }}</li>
                    <li>{{ $t('terms.define10.list2') }}</li>
                    <li>{{ $t('terms.define10.list3') }}</li>
                    <li>{{ $t('terms.define10.list4') }}</li>
                    <li>{{ $t('terms.define10.list5') }}</li>
                    <li>{{ $t('terms.define10.list6') }}</li>
                  </ul>
                </li>
                <li>{{ $t('terms.define10.leadtext2') }}</li>
                <li>{{ $t('terms.define10.leadtext3') }}</li>
              </ul>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define11.title') }}</h2>
            </dt>
            <dd>
              <ul class="article_list--number">
                <li>{{ $t('terms.define11.list1') }}</li>
                <li>{{ $t('terms.define11.list2') }}</li>
                <li>{{ $t('terms.define11.list3') }}</li>
              </ul>
            </dd>
            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define12.title') }}</h2>
            </dt>
            <dd>
              <p>{{ $t('terms.define12.leadtext') }}</p>
            </dd>
            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define13.title') }}</h2>
            </dt>
            <dd>
              <p>{{ $t('terms.define13.leadtext') }}</p>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define14.title') }}</h2>
            </dt>
            <dd>
              <p>{{ $t('terms.define14.leadtext') }}</p>
            </dd>

            <dt>
              <h2 class="article_heading--lv2">{{ $t('terms.define15.title') }}</h2>
            </dt>
            <dd>
              <p>{{ $t('terms.define15.leadtext') }}</p>
            </dd>
          </dl>
          <div class="article_text--right">{{ $t('terms.updated') }}</div>
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
  name: 'TermsOfService',

  components: {
    DefaultLayout,
    SectionContainer,
    HeroImageSection
  },

  setup() {
    const { app } = useContext()
    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('meta.termsOfService.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.termsOfService.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.termsOfService.title')} | comony`
      }
    ]
  },

  head: {}
})
</script>

<style scoped lang="scss">
.termsTemp {
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
