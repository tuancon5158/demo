<template>
  <DefaultLayout bg-color="gray">
    <SectionContainer bg-color="gray" columns="1" position="left">
      <template #column-1>
        <div class="logout_box">
          <h1 class="logout_heading">{{ $t('logout.heading') }}</h1>
          <p class="logout_text">
            {{ $t('logout.text1') }}
          </p>
          <div class="logout_text">
            {{ $t('logout.text2') }}
            <ul class="logout_ulist">
              <li class="logout_ulist_item">
                {{ $t('logout.text3') }}
                <LinkText
                  color="secondary"
                  :link="localePath('/spaces')"
                  :value="$t('logout.text4')"
                  font-size="medium"
                />
                {{ $t('logout.text5') }}
              </li>
              <li class="logout_ulist_item">
                {{ $t('logout.text6') }}
                <LinkText
                  color="secondary"
                  :link="$config.ticketSystem.frontURL"
                  :value="$t('logout.text7')"
                  font-size="medium"
                  external-link
                />
                {{ $t('logout.text8') }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </SectionContainer>
  </DefaultLayout>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onBeforeMount,
  useContext,
  useMeta,
  useRoute
} from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import DefaultLayout from '~/components/organisms/Layout/DefaultLayout.vue'
import SectionContainer from '~/components/atoms/SectionContainer/SectionContainer.vue'
import { injectWorkspace, injectMember } from '~/composables'
import useSetCookie from '~/composables/useSetCookie'
import useSocialLogin from '~/composables/useSocialLogin'

export default defineComponent({
  name: 'Logout',

  components: {
    LinkText,
    DefaultLayout,
    SectionContainer
  },

  setup() {
    const { app, $auth, $config } = useContext()

    const { title, meta } = useMeta()

    // ---------------- meta ----------------
    title.value = `${app.i18n.t('meta.logout.title')} | comony`
    meta.value = [
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${app.i18n.t('meta.logout.title')} | comony`
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `${app.i18n.t('meta.logout.title')} | comony`
      }
    ]
    // const router = useRouter()
    const route = useRoute()
    const toLoginBackQuery = computed(() => {
      return route.value?.query?.to as string
    })

    // logout
    const { handleClickSNSLogoutButton } = useSocialLogin()
    const { removeCookieToken } = useSetCookie()
    const { removeWorkspaceLocalstrage } = injectWorkspace()
    const { removeMemberInfoLocalstrage } = injectMember()

    const logout = async () => {
      await $auth.logout().then(() => {
        // remove localstrage
        removeWorkspaceLocalstrage()
        removeMemberInfoLocalstrage()
        // remove cookie
        removeCookieToken($config.loginCookieDomain || '', '/')
        // social logout
        handleClickSNSLogoutButton('/logout')
      })
    }

    onBeforeMount(() => {
      // logout if there are paramater
      if (toLoginBackQuery.value) {
        logout()
      }
    })
  },
  head: {}
})
</script>

<style scoped lang="scss">
.logout {
  &_box {
    background-color: $color_white;
    padding: 4rem;
    border-radius: 10px;
  }

  &_heading {
    @include fz(28);
    font-weight: 700;
  }

  &_text {
    @include fz(14);
  }

  &_ulist {
    margin-left: 20px;
    margin-top: 10px;

    &_item {
      list-style: disc;
    }
  }
}
</style>
