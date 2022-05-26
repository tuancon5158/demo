<template>
  <section class="breadcrumbs" :class="classes">
    <div v-for="(step, index) in contentData" :key="index" class="breadcrumbs_content">
      <div v-if="step" class="breadcrumbs_content_wrapper">
        <span v-show="index !== 0" class="breadcrumbs_content_arrow"></span>
        <span
          v-if="index === contentData.length - 1"
          class="breadcrumbs_content_text breadcrumbs_content_text--last"
        >
          {{ $i18n.locale === 'ja' ? step.title.ja || title : step.title.en || title }}
        </span>
        <component
          v-else
          class="breadcrumbs_content_text"
          :is="step.path ? 'nuxt-link' : 'span'"
          :to="step.path ? localePath(step.path) : ''"
        >
          {{ $i18n.locale === 'ja' ? step.title.ja || title : step.title.en || title }}
        </component>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, useRoute } from '@nuxtjs/composition-api'

interface I_ContentItem {
  title: object
  path: string
  name: string
  children?: any
}

interface I_BreadcrumbsProps {
  title: string
  color: string
  isStorybook: boolean
}

export default defineComponent({
  name: 'Breadcrumbs',

  props: {
    title: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'black'].includes(value)
      }
    },
    isStorybook: {
      type: Boolean,
      default: false
    }
  },

  setup(props: I_BreadcrumbsProps) {
    const { app } = useContext()
    const classes = computed(() => {
      return {
        [`-color--${props.color}`]: props.color
      }
    })

    const listBreadcrumbs = {
      path: '/',
      name: 'top',
      title: {
        ja: 'ホーム',
        en: 'HOME'
      },
      children: {
        spaces: {
          path: '/spaces',
          name: 'spaces',
          title: {
            ja: '空間ギャラリー',
            en: 'Space Gallery'
          },
          children: {
            name: 'detail',
            title: {
              ja: '',
              en: ''
            }
          }
        },
        business: {
          path: '/business',
          name: 'business',
          title: {
            ja: 'ビジネスでご利用したい方へ',
            en: 'For Business'
          }
        },
        creator: {
          path: '/creator',
          name: 'creator',
          title: {
            ja: 'クリエイターの皆様へ',
            en: 'For Creator'
          }
        },
        interview: {
          path: '',
          name: 'interview',
          title: {
            ja: 'インタビュー',
            en: 'interview'
          },
          children: {
            name: 'detail',
            title: {
              ja: '',
              en: ''
            }
          }
        },
        news: {
          path: '/news',
          name: 'news',
          title: {
            ja: 'News',
            en: 'News'
          },
          children: {
            name: 'detail',
            title: {
              ja: '',
              en: ''
            }
          }
        },
        profile: {
          path: '',
          name: 'profile',
          title: {
            ja: 'プロフィール',
            en: 'profile'
          },
          children: {
            name: 'detail',
            title: {
              ja: '',
              en: ''
            }
          }
        },
        'privacy-policy': {
          path: '/privacy-policy',
          name: 'Privacy Policy',
          title: {
            ja: 'プライバシーポリシー',
            en: 'Privacy policy'
          }
        },
        'terms-of-service': {
          path: '/terms-of-service',
          name: 'Terms Of Service',
          title: {
            ja: 'サービス利用規約',
            en: 'Terms of service'
          }
        },
        faq: {
          path: '/faq',
          name: 'FAQ',
          title: {
            ja: 'よくある質問',
            en: 'FAQ'
          }
        }
      }
    }

    /**
     * handle data and return array breadcrums
     * @params: <String[]> | array route name
     * @listBreadcrumbs: <any> | object breadcrums
     * @numSlug: <Number> | number slug route
     */
    const handleContent = (
      params: string[],
      listBreadcrumbs: any,
      numSlug: number
    ): I_ContentItem[] => {
      const data: I_ContentItem[] = []
      const objBreadcrumbs = listBreadcrumbs?.children

      if (props.isStorybook) {
        data.push(
          {
            path: '/',
            name: 'top',
            title: {
              ja: 'HOME',
              en: 'HOME'
            }
          },
          {
            path: '/?path=/story/molecules-breadcrumbs--default',
            name: 'storybook',
            title: {
              ja: 'storybook',
              en: 'storybook'
            }
          }
        )

        return data
      }

      if (params.length >= numSlug && objBreadcrumbs[params[numSlug - 1]]) {
        const top = { ...listBreadcrumbs, children: undefined }

        delete top.children
        data.push(top)

        const level2: I_ContentItem = {
          ...objBreadcrumbs[params[numSlug - 1]],
          children: undefined
        }

        delete level2.children
        data.push(level2)

        if (params[numSlug]) {
          const objLv3 = objBreadcrumbs[params[numSlug - 1]].children

          const level3: I_ContentItem = { ...objLv3 }

          data.push(level3)
        }
      }

      return data
    }

    const contentData = ref<I_ContentItem[]>([])
    const route = useRoute()

    const params = route.value.fullPath.startsWith('/')
      ? route.value.fullPath.substring(1).split('/')
      : route.value.fullPath.split('/')

    contentData.value =
      app.i18n.locale === 'ja'
        ? handleContent(params, listBreadcrumbs, 1)
        : handleContent(params, listBreadcrumbs, 2)

    return { classes, contentData }
  }
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: -$spacing_4x;

  &_content {
    display: flex;
    align-items: center;
    height: 30px;
    @include fz($font_size_standard);
    max-width: 50%;

    @include mb() {
      @include fz($font_size_xsmall);
      margin-left: 0;
    }

    &:last-child {
      flex: 1;
      overflow: hidden;
    }

    &_wrapper {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &_text {
      font-weight: $font_weight_normal;
      padding: 0 $spacing_4x;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;

      @include mb() {
        padding: 0 $spacing_3x;
      }

      &--last {
        @include fz($font_size_medium);
        font-weight: $font_weight_bold;
      }
    }

    &:first-child {
      &_arrow {
        display: none;
      }
    }

    &_arrow {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-top: 2px solid $color_white;
      border-right: 2px solid $color_white;
      transform: rotate(45deg);
    }
  }

  &.-color {
    &--black {
      color: $color_black;

      .breadcrumbs_content_arrow {
        border-top: 2px solid $color_black;
        border-right: 2px solid $color_black;
      }
    }
    &--white {
      color: $color_white;
    }
  }
}
</style>
