<template>
  <client-only>
    <div class="dashboard">
      <Header />
      <main class="dashboard_main">
        <div v-if="!loadingFetch && !isLoading" class="dashboard_contents">
          <Nuxt />
        </div>
        <div v-else>
          <Spinner class="spinner" size="medium" color="secondary" bg-color="gray" />
        </div>
      </main>
      <Notification
        :status="notification.status"
        :message="notification.message"
        :type="notification.type"
        :redirect-to="notification.redirectTo"
      />
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, useRoute, ref } from '@nuxtjs/composition-api'
import Header from '~/components/organisms/Header/Header.vue'
import Notification from '~/components/molecules/Notification/Notification.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import { provideWorkspace, injectWorkspace } from '@/composables/useGlobalWorkspaceInfo'
import { provideMember } from '@/composables/useSetMemberInfo'
import { provideLoginUser } from '@/store/login'
import { provideNotification, injectNotification } from '@/composables/useGlobalNotification'
import { useFetchUser, useSetMeta } from '~/composables'

export default defineComponent({
  components: {
    Header,
    Notification,
    Spinner
  },

  setup() {
    provideWorkspace()
    provideLoginUser()
    provideNotification()
    provideMember()

    const useGlobalNotificationState = injectNotification()
    const notification = useGlobalNotificationState.get()

    // ---------- meta settings ----------
    const { setMeta } = useSetMeta()

    setMeta()

    // ---------- [middleware in client-side] auth login check ----------
    const { isLoading, fetchUser } = useFetchUser()

    fetchUser('login')

    // check matchUrl with Workspace
    const { menuWorkSpaceList, fetchWorkspaces } = injectWorkspace()
    const { params, app, $auth } = useContext()
    const router = useRouter()
    const route = useRoute()

    // check page path
    const currentPath = route.value.fullPath
    const regex_account = /\/account/
    const regex_dashboardApply = /\/dashboard\/apply/
    const regexAccountResult = regex_account.test(currentPath)
    const regexDashboardApplyResult = regex_dashboardApply.test(currentPath)

    // call api when first access
    const loadingFetch = ref(false)
    const redirectIfNotMatchParams = async () => {
      loadingFetch.value = true

      if (process.client) {
        await fetchWorkspaces(Number($auth?.user?.id))

        const isTrueParams = menuWorkSpaceList.value.find((item) => item.id === params.value.id)

        if (!isTrueParams) {
          router.push(
            app.localePath({
              name: 'dashboard-id-spaces',
              params: { id: menuWorkSpaceList?.value[0]?.id || '' }
            })
          )
        } else {
          loadingFetch.value = false
        }
      }
    }

    if (!regexAccountResult && !regexDashboardApplyResult) {
      redirectIfNotMatchParams()
    }

    return { notification, isLoading, loadingFetch }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [...i18nHead.meta],
      link: [...i18nHead.link]
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-flow: column;
  height: 100vh;
  overflow: hidden;
  background-color: $color_white;

  &_main {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: $color_light_blue_100;

    @include header-mb() {
      margin-top: $header_H_sp;
    }
  }

  &_contents {
    width: 100%;
    margin: 0 auto;
    max-width: calc(#{$dashboard_single_contents_W} + #{$spacing_8x} * 2);

    @include dashboard-pc() {
      padding: $spacing_8x $spacing_8x $spacing_25x;
    }

    @include dashboard-mb() {
      padding: $spacing_5x $spacing_4x;
    }
  }
}
.spinner {
  position: absolute;
  left: 50%;
}
</style>
