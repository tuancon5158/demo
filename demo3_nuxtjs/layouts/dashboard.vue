<template>
  <client-only>
    <div v-if="$auth.loggedIn" class="dashboard">
      <Header />
      <div class="dashboard_container">
        <div class="dashboard_sidebar">
          <Sidebar />
        </div>
        <main id="dashboard-main" class="dashboard_main">
          <div v-if="isTrueParams" class="dashboard_contents">
            <Nuxt />
          </div>
        </main>
      </div>
      <Notification
        :status="notification.status"
        :message="notification.message"
        :type="notification.type"
        :redirect-to="notification.redirectTo"
      />
    </div>
    <div v-else>
      <Spinner class="spinner" size="medium" color="secondary" bg-color="gray" />
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'
import Header from '~/components/organisms/Header/Header.vue'
import Sidebar from '~/components/organisms/Sidebar/Sidebar.vue'
import Notification from '~/components/molecules/Notification/Notification.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import {
  provideWorkspace,
  provideNotification,
  injectNotification,
  injectWorkspace,
  injectMember,
  useFetchUser,
  useSetMeta
} from '@/composables'
import { provideMember } from '@/composables/useSetMemberInfo'
import { provideLoginUser } from '@/store/login'

export default defineComponent({
  components: {
    Header,
    Sidebar,
    Notification,
    Spinner
  },

  setup() {
    provideWorkspace()
    provideLoginUser()
    provideNotification()
    provideMember()

    // ---------- meta settings ----------
    const { setMeta } = useSetMeta()

    setMeta()

    // ---------- notification ----------
    const useNotificationState = injectNotification()
    const notification = useNotificationState.get()

    // ---------- [middleware in client-side] auth login check ----------
    const { fetchUser, isLoggedIn } = useFetchUser()

    fetchUser('login')

    // ---------- Check if it is my own workspace ----------
    const { menuWorkSpaceList } = injectWorkspace()
    const { $auth, params } = useContext()
    const isTrueParams = computed(() =>
      menuWorkSpaceList.value.find((item) => item.id === params.value.id)
    )

    // ----------
    // If works id in localstarge and query param is different,
    // match them to query param.
    // ----------
    const { fetchMemberMe } = injectMember()
    const { setWorkspaceId, fetchWorkspaceById } = injectWorkspace()

    if ($auth.loggedIn && process.client) {
      const localStorageWorkspaceId = JSON.parse(localStorage.getItem('_workspace') as string)

      if (params.value.id !== localStorageWorkspaceId.id) {
        setWorkspaceId(params.value.id)
        fetchWorkspaceById(params.value.id || '')
        fetchMemberMe(params.value.id || '')
      }
    }

    return { notification, isLoggedIn, isTrueParams }
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

  &_container {
    flex-grow: 1;
    display: flex;
    overflow: hidden;

    @include header-pc() {
      height: calc(100vh - #{$header_H_pc});
    }

    @include header-mb() {
      height: calc(100vh - #{$header_H_sp});
      margin-top: $header_H_sp;
    }
  }

  &_sidebar {
    flex-grow: 0;
    z-index: $z_sidebar;
  }

  &_main {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: $color_light_blue_100;

    @include max-screen(map-get($breakpoints, lg)) {
      margin-left: $dashboard_sidebar_W_mb;
    }

    @include max-screen(map-get($breakpoints, sm)) {
      margin-left: 0;
    }
  }

  &_contents {
    position: relative;
    width: 100%;
    min-height: 100%;
    margin: 0 auto;

    @include dashboard-pc() {
      padding: $spacing_8x;
      max-width: $dashboard_contents_W;
    }

    @include dashboard-mb() {
      padding: $spacing_4x;
    }
  }
}
.spinner {
  position: absolute;
  left: 50%;
}
</style>
