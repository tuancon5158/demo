<template>
  <div class="profileLayout">
    <section class="profileLayout_heroImage">
      <div class="profileLayout_heroImage_image">
        <img :src="require(`~/assets/images/${'business/banner.webp'}`)" />
      </div>
      <div class="profileLayout_heroImage_head">
        <UserProfile
          has-icons
          :name="name"
          :thumbnail-url="getAvatarThumbnailUrl(thumbnailUrl, imageSizes.userThumbnail.medium)"
          :company-name="companyName"
          :company-url="companyUrl"
          :description="description"
          :facebook-url="facebookUrl"
          :twitter-url="twitterUrl"
          :instagram-url="instagramUrl"
        />

        <HorizontalNavigation
          v-if="isNavigation"
          class="profileLayout_heroImage_navigation"
          :navigation-list="profileNavigation"
          position="center"
          :page-link="pageLink"
          :params-id="getParamsId()"
          is-link
          @onClick="handleClickNav"
        />
      </div>
    </section>
    <section class="profileLayout_main">
      <div class="profileLayout_main_container">
        <slot />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRoute,
  useRouter,
  useContext,
  computed,
  SetupContext
} from '@nuxtjs/composition-api'
// components
import HorizontalNavigation from '~/components/organisms/Navigation/HorizontalNavigation.vue'
import UserProfile from '~/components/organisms/UserProfile/UserProfile.vue'
// composables
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'
// constants
import { imageSizes } from '~/constants/image-size'

export default defineComponent({
  name: 'ProfileLayout',

  components: {
    HorizontalNavigation,
    UserProfile
  },

  props: {
    name: {
      type: String,
      default: ''
    },
    thumbnailUrl: {
      type: String,
      default: ''
    },
    companyName: {
      type: String,
      default: ''
    },
    companyUrl: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isNavigation: {
      type: Boolean,
      default: false
    },
    facebookUrl: {
      type: String,
      default: ''
    },
    twitterUrl: {
      type: String,
      default: ''
    },
    instagramUrl: {
      type: String,
      default: ''
    }
  },

  setup(_, context: SetupContext) {
    const heroImageLoaded = ref(false)
    const { app, $auth } = useContext()
    const { $config } = context.root
    const router = useRouter()
    const route = useRoute()
    const selectedUserId = computed(() => route.value.params.id || '')

    const doneLoaded = () => {
      heroImageLoaded.value = true
    }

    const profileNavigation = [
      {
        id: '',
        name: '投稿モデル',
        nameEn: 'Posted'
      },
      {
        id: 'favorite',
        name: 'お気に入りリスト',
        nameEn: 'Favorite List'
      }
    ]

    const checkUser = computed(() => {
      if (!$auth.loggedIn) return false

      switch (route.value.path?.split('/').pop()) {
        case 'follower':
          if (parseInt(route.value?.params?.id) === $auth.user.id) return true

          break

        case 'favorite':
        case '':
        case 'following':
          if (parseInt(route.value?.params?.id) !== $auth.user.id) return true

          break

        default:
          return false
      }
    })

    const pageLink = ref('')
    const handleClickNav = (id) => {
      if (id) {
        router.push(
          app.localePath({
            name: `profile-id-${id}`,
            params: { id: selectedUserId.value }
          })
        )
        pageLink.value = app.localePath({
          name: `profile-id-${id}`,
          params: { id: selectedUserId.value }
        })
      } else {
        router.push(
          app.localePath({
            name: 'profile-id',
            params: { id: selectedUserId.value }
          })
        )

        pageLink.value = app.localePath({
          name: 'profile-id',
          params: { id: selectedUserId.value }
        })
      }
    }

    // get avatar thumbnail image path
    const { getAvatarThumbnailUrl } = useCreateThumbnailPath()

    const getParamsId = () => {
      return route.value.params.id || ''
    }

    return {
      imageSizes,
      profileNavigation,
      heroImageLoaded,
      doneLoaded,
      handleClickNav,
      pageLink,
      getAvatarThumbnailUrl,
      getParamsId,
      checkUser
    }
  }
})
</script>

<style scoped lang="scss">
.profileLayout {
  &_heroImage {
    position: relative;
    width: 100%;
    overflow: hidden;

    // @include pc() {
    //   height: 592px;
    // }

    // @include mb() {
    //   height: 613px;
    // }

    &_image {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;

      &::before {
        z-index: 2;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color_gray_1000, 0.4);
        backdrop-filter: blur(5px);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &_head {
      position: relative;
      margin: 0 auto;
      z-index: 3;
      max-width: 1043px;
      width: 100%;
      color: $color_white;

      @include pc() {
        top: 50%;
        padding: $spacing_30x $spacing_6x $spacing_24x;
      }

      @include mb() {
        max-width: 90%;
        padding: $spacing_24x $spacing_6x $spacing_18x;
      }

      &_text {
        font-weight: $font_weight_bold;

        @include pc() {
          @include fz($font_size_hero);
        }

        @include mb() {
          @include fz($font_size_hero_mb);
        }
      }
    }

    &_navigation {
      margin-top: $spacing_14x;
      position: relative;
    }
  }

  &_profile {
    max-width: map-get($breakpoints, xl);
    margin: 0 auto;
    padding: $spacing_10x 2%;
    min-height: 215px;

    @include mb() {
      padding: $spacing_5x 2%;
    }
  }

  &_main {
    background: $color_black_gradient;
    min-height: calc(100vh - 300px);

    &_container {
      margin: 0 auto;
    }
  }
}
</style>
