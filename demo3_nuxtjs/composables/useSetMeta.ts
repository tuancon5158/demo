import { useContext, useRoute, useMeta } from '@nuxtjs/composition-api'

export const useSetMeta = () => {
  const { app } = useContext()
  const route = useRoute()

  // ---------- meta settings ----------
  const setMeta = () => {
    const { title, meta } = useMeta()

    title.value = `comony | ${app.i18n.t('meta.title')}`
    meta.value = [
      {
        hid: 'description',
        name: 'description',
        content: app.i18n.t('meta.description')
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: `comony | ${app.i18n.t('meta.title')}`
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: app.i18n.t('meta.description')
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${app.$config.frontURL}${route.value.fullPath}`
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${app.$config.frontURL}/og-image.png`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `comony | ${app.i18n.t('meta.title')}`
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: app.i18n.t('meta.description')
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: `${app.$config.frontURL}/og-image.png`
      }
    ]
  }

  return { setMeta }
}
