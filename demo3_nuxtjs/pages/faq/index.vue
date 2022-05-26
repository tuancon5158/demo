<template>
  <DefaultLayout bg-color="blackGradient">
    <HeroImageSection
      :label="$i18n.locale !== 'en' ? $t('faq.pageTitle') : ''"
      :heading="$t('faq.heading')"
      image="common/hero.jpg"
      size="small"
    />
    <SectionContainer bg-color="black-gradient" columns="1" position="left" container-size="xlg">
      <template #column-1>
        <FAQ bg-color="transparent" :list-item="faqList" @visibilityChanged="slideItems" />
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, useContext, useMeta, ref } from '@nuxtjs/composition-api'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import HeroImageSection from '~/components/organisms/HeroImageSection/HeroImageSection.vue'
import FAQ, { I_ListItemFAQ } from '~/components/organisms/FAQ/FAQ.vue'
import { handleScroll } from '~/composables/utilities/scroll'

export default defineComponent({
  name: 'Faq',

  auth: false,

  components: {
    DefaultLayout,
    SectionContainer,
    HeroImageSection,
    FAQ
  },

  setup() {
    const { app } = useContext()
    const { title, meta } = useMeta()

    title.value = `${app.i18n.t('meta.faq.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.faq.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.faq.title')} | comony`
      }
    ]

    const faqList = ref<Array<I_ListItemFAQ>>([])
    faqList.value = [
      {
        question: app.i18n.t('faq.first.question'),
        answer: app.i18n.t('faq.first.answer')
      },
      {
        question: app.i18n.t('faq.second.question'),
        answer: app.i18n.t('faq.second.answer')
      },
      {
        question: app.i18n.t('faq.third.question'),
        answer: app.i18n.t('faq.third.answer')
      },
      {
        question: app.i18n.t('faq.fourth.question'),
        answer: app.i18n.t('faq.fourth.answer')
      },
      {
        question: app.i18n.t('faq.fifth.question'),
        answer: app.i18n.t('faq.fifth.answer')
      },
      {
        question: app.i18n.t('faq.sixth.question'),
        answer: app.i18n.t('faq.sixth.answer')
      },
      {
        question: app.i18n.t('faq.seventh.question'),
        answer: app.i18n.t('faq.seventh.answer')
      },
      {
        question: app.i18n.t('faq.eighth.question'),
        answer: app.i18n.t('faq.eighth.answer')
      },
      {
        question: app.i18n.t('faq.ninth.question'),
        answer: app.i18n.t('faq.ninth.answer')
      },
      {
        question: app.i18n.t('faq.tenth.question'),
        answer: app.i18n.t('faq.tenth.answer')
      }
    ]

    // ---------- animation ----------
    const { slideItems } = handleScroll()

    return {
      faqList,
      slideItems
    }
  },

  head: {}
})
</script>
