<template>
  <div>
    <div class="account_title">
      <DashboardHeading
        :title="isProfilePage ? $t('mypage.profile.pageTitle') : $t('mypage.account.pageTitle')"
        icon-type="account"
        :back-link="localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })"
      />
      <LinkText
        v-if="isProfilePage"
        class="account_title_link"
        color="blue"
        underline
        :value="`${$t('mypage.profile.link')}`"
        :link="localePath({ name: 'profile-id', params: { id: $auth.user.id } })"
      />
    </div>
    <Tab type-tab="external" :tab-options="tabOptions" :default-value="currentTabValue">
      <NuxtChild keep-alive />
      <div v-show="!$auth.user">
        <div class="spinner"></div>
        <Spinner color="secondary" bg-color="transparent" />
      </div>
    </Tab>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, ref, watch } from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'
import Tab from '~/components/molecules/Tab/Tab.vue'
import DashboardHeading from '~/components/molecules/HeadingSet/DashboardHeading.vue'
import { injectWorkspace } from '~/composables'

interface I_TabOption {
  label: string
  value: string
  url: string
}
enum Tab_Option {
  PROFILE = '0',
  SETTING = '1'
}

export default defineComponent({
  name: 'Account',

  components: {
    Tab,
    LinkText,
    Spinner,
    DashboardHeading
  },

  layout: 'dashboard-single',

  setup() {
    const { app, redirect } = useContext()
    const { getWorkspaceId } = injectWorkspace()

    const tabOptions: I_TabOption[] = [
      {
        label: app.i18n.t('mypage.profile.pageTitle'),
        value: Tab_Option.PROFILE,
        url: '/account/profile'
      },
      {
        label: app.i18n.t('mypage.account.pageTitle'),
        value: Tab_Option.SETTING,
        url: '/account/setting'
      }
    ]

    // redirect account -> account/profile
    const route = useRoute()

    const currentTabValue = ref<string>()
    const isProfilePage = ref<boolean>(true)

    // handle change route and match Tab with route

    if (route.value.path === app.localePath('/account')) {
      redirect(app.localePath('/account/profile'))
    } else if (route.value.path === app.localePath('/account/profile')) {
      isProfilePage.value = true
      currentTabValue.value = Tab_Option.PROFILE
    } else {
      isProfilePage.value = false
      currentTabValue.value = Tab_Option.SETTING
    }

    // url child view -> update title
    watch(
      () => route.value.path,
      () => {
        if (route.value.path === app.localePath('/account/profile')) {
          isProfilePage.value = true
          currentTabValue.value = Tab_Option.PROFILE
        } else {
          isProfilePage.value = false
          currentTabValue.value = Tab_Option.SETTING
        }
      }
    )

    // url -> update title
    return {
      tabOptions,
      currentTabValue,
      isProfilePage,
      getWorkspaceId
    }
  }
})
</script>

<style scoped lang="scss">
.account {
  width: fit-content;
  margin: $spacing_8x auto 0;

  &_header {
    border-bottom: 1px solid $color_light_blue_200;
    margin-bottom: $spacing_8x;
    &_header1 {
      margin-bottom: $spacing_4x;
    }
    &_header2 {
      margin-bottom: $spacing_5x;
      font-weight: $font_weight_medium !important;
    }
  }

  &_title {
    position: relative;

    &_link {
      @include pc() {
        position: absolute;
        right: 0;
        top: 55px;
      }

      @include mb() {
        display: block;
        text-align: right;
        margin-bottom: $spacing_8x;
      }
    }
  }

  .spinner {
    width: 70vw;
  }
}
</style>
