<template>
  <header class="header" :class="bgColorClass">
    <nuxt-link class="header_logo" :to="localePath('index')" @click.native="onCloseHumbergerMenu">
      <AppLogo :icon-color="iconColor" size="small" direction="vertical" />
    </nuxt-link>
    <div
      v-if="$device.isMobile && checkCurrentPage()"
      class="header_backButton"
      @click="handleBackToMenu"
    >
      <IconBase icon-color="#212022" width="24" height="24" viewBox="0 0 24 24">
        <IconBack />
      </IconBase>
    </div>
    <div v-else @click="onClickHumbergerMenu">
      <label class="header_menuButton" :class="{ 'is-open': isHumbergarOpen }">
        <span />
      </label>
    </div>
    <div class="header_menu_overlay" :class="{ 'is-open': isHumbergarOpen }"></div>
    <div class="header_menu" :class="{ 'is-open': isHumbergarOpen }">
      <nav class="header_nav">
        <div class="header_nav_item">
          <nuxt-link
            class="header_nav_link"
            :to="localePath('spaces')"
            @click.native="onCloseHumbergerMenu"
          >
            {{ $t('header.spaceList') }}
          </nuxt-link>
        </div>
        <div class="header_nav_item">
          <nuxt-link
            class="header_nav_link"
            :to="localePath('business')"
            @click.native="onCloseHumbergerMenu"
          >
            {{ $t('header.business') }}
          </nuxt-link>
        </div>
        <div class="header_nav_item">
          <nuxt-link
            class="header_nav_link"
            :to="localePath('creator')"
            @click.native="onCloseHumbergerMenu"
          >
            {{ $t('header.creator') }}
          </nuxt-link>
        </div>
        <div class="header_nav_item">
          <nuxt-link
            class="header_nav_link"
            :to="localePath('contact')"
            @click.native="onCloseHumbergerMenu(), handleResetPage()"
          >
            {{ $t('header.contact') }}
          </nuxt-link>
        </div>
        <div class="header_nav_item">
          <nuxt-link
            class="header_nav_link --right-border"
            :to="localePath('downloads')"
            @click.native="onCloseHumbergerMenu"
          >
            {{ $t('header.appDl') }}
          </nuxt-link>
        </div>
        <!-- User menu in mobile -->
        <client-only>
          <div v-if="$auth.loggedIn" class="header_nav_item is-header-mb">
            <nuxt-link
              :to="
                $device.isMobile
                  ? localePath({ name: 'dashboard-id-menu', params: { id: getWorkspaceId } })
                  : localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })
              "
              class="header_nav_link"
              @click.native="onCloseHumbergerMenu"
            >
              {{ $t('userMenu.dashboard') }}
            </nuxt-link>
          </div>
        </client-only>
        <client-only>
          <div v-if="$auth.loggedIn" class="header_nav_item is-header-mb">
            <nuxt-link
              :to="localePath('account-profile')"
              class="header_nav_link"
              @click.native="onCloseHumbergerMenu"
            >
              {{ $t('userMenu.account') }}
            </nuxt-link>
          </div>
        </client-only>
        <client-only>
          <div v-if="$auth.loggedIn" class="header_nav_item is-header-mb">
            <div class="header_nav_link" @click="onClickLogout">
              {{ $t('sidebar.signOut') }}
            </div>
          </div>
        </client-only>
        <!-- End of User menu only shows in mobile -->
        <div
          class="header_nav_item is-header-pc"
          @mouseover="isLanguageMenuOpen = true"
          @mouseleave="isLanguageMenuOpen = false"
        >
          <button class="header_dropdown_parent">
            <IconBase
              :icon-color="bgColor === 'black' ? '#fff' : '#2b5ba9'"
              width="16"
              height="16"
              viewBox="0, 0, 57, 57"
              icon-name="earch"
              class="icon-earth"
            >
              <IconEarth />
            </IconBase>
            <span>Language</span>
            <IconBase
              :icon-color="bgColor === 'black' ? '#fff' : '#777'"
              width="10"
              height="10"
              viewBox="0, 0, 120, 30"
              class="icon-arrow"
            >
              <IconArrow />
            </IconBase>
          </button>
          <div class="header_dropdown" :class="[isLanguageMenuOpen ? 'is-open' : '', bgColorClass]">
            <div class="header_dropdown_item" :class="{ '-active': $i18n.locale === 'ja' }">
              <nuxt-link :to="switchLanguageUrl('ja')" @click.native="onCloseHumbergerMenu">
                日本語
              </nuxt-link>
            </div>
            <div class="header_dropdown_item" :class="{ '-active': $i18n.locale === 'en' }">
              <nuxt-link :to="switchLanguageUrl('en')" @click.native="onCloseHumbergerMenu">
                English
              </nuxt-link>
            </div>
          </div>
        </div>
      </nav>
      <client-only>
        <template v-if="!isSocialLoginLoading">
          <div v-if="!$auth.loggedIn">
            <div class="header_button">
              <CTAButton
                :link="localePath('/login')"
                :label="$t('header.tryNow')"
                type="outline"
                size="small"
                bg-color="secondary"
                border-color="secondary"
                rounded
                @click.native="onCloseHumbergerMenu"
              />
            </div>
          </div>
          <div
            v-else
            class="header_nav is-header-pc"
            @mouseover="isMypageMenuOpen = true"
            @mouseleave="isMypageMenuOpen = false"
          >
            <button class="header_dropdown_parent">
              <UserAvatar
                class="header_dropdown_user"
                direction="vertical"
                size="small"
                :bg-color="bgColor"
                :image-path="getUserThumbnailUrl(imageSizes.userThumbnail.small)"
              />
              <IconBase
                :icon-color="bgColor === 'black' ? '#fff' : '#212022'"
                width="10"
                height="5"
                viewBox="0 0 10 5"
                class="icon-down"
              >
                <IconDown />
              </IconBase>
            </button>

            <div class="header_userMenu" :class="[{ 'is-open': isMypageMenuOpen }, bgColorClass]">
              <div class="header_userMenu_avator">
                <UserAvatar
                  :user-name="$auth.user.name"
                  :user-email="$auth.user.email"
                  direction="horizontal"
                  :bg-color="bgColor"
                  :image-path="getUserThumbnailUrl(imageSizes.userThumbnail.small)"
                />
                <div class="header_userMenu_linkProfile">
                  <LinkText
                    color="blue"
                    underline
                    :value="`> ${$t('header.profilePage')}`"
                    :link="localePath({ name: 'profile-id', params: { id: $auth.user.id } })"
                  />
                </div>
                <div v-if="getWorkspaceInfo.name" class="header_userMenu_workspace">
                  <span v-if="$i18n.locale === 'ja'">
                    {{ getWorkspaceInfo.name }}
                    {{ $t('userMenu.loginStatus') }}
                  </span>

                  <span v-else>{{ $t('userMenu.loginStatus') }} {{ getWorkspaceInfo.name }}</span>
                </div>
              </div>
              <div v-if="$auth.loggedIn" class="header_dropdown_item">
                <nuxt-link
                  class="header_userMenu_link"
                  :class="{ '-active': onDashboardPage }"
                  :to="localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })"
                  @click.native="onCloseHumbergerMenu"
                >
                  {{ $t('userMenu.dashboard') }}
                </nuxt-link>
              </div>
              <div class="header_dropdown_item">
                <nuxt-link
                  class="header_userMenu_link"
                  :class="{ '-active': onAccountPage }"
                  :to="localePath('account-profile')"
                  @click.native="onCloseHumbergerMenu"
                >
                  {{ $t('userMenu.account') }}
                </nuxt-link>
              </div>
              <div class="header_dropdown_item">
                <a class="header_userMenu_link" @click="onClickLogout">
                  {{ $t('sidebar.signOut') }}
                </a>
              </div>
            </div>
          </div>
        </template>
      </client-only>

      <!-- Language Menu in mobile -->
      <div class="header_nav_lang is-header-mb">
        <nuxt-link
          :class="{ '-active': $i18n.locale === 'en' }"
          :to="switchLanguageUrl('en')"
          @click.native="onCloseHumbergerMenu"
        >
          English
        </nuxt-link>
        <nuxt-link
          :class="{ '-active': $i18n.locale === 'ja' }"
          :to="switchLanguageUrl('ja')"
          @click.native="onCloseHumbergerMenu"
        >
          日本語
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  useContext,
  useRoute,
  useRouter,
  computed
} from '@nuxtjs/composition-api'
// components
import CTAButton from '~/components/atoms/Button/CTAButton.vue'
import AppLogo from '~/components/atoms/AppLogo/AppLogo.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconArrow from '~/components/icons/IconArrow.vue'
import IconDown from '~/components/icons/IconDown.vue'
import IconEarth from '~/components/icons/IconEarth.vue'
import IconBack from '~/components/icons/IconBack.vue'
import UserAvatar from '~/components/molecules/UserAvatar/UserAvatar.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import { injectLoginUser } from '~/store/login'
// composables
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'
import { injectWorkspace, injectMember } from '~/composables'
import useSetCookie from '~/composables/useSetCookie'
import useSocialLogin from '~/composables/useSocialLogin'
// constants
import { imageSizes } from '~/constants/image-size'

// props type
interface HeaderProps {
  bgColor: string
}

export default defineComponent({
  name: 'Header',

  components: {
    AppLogo,
    CTAButton,
    IconBase,
    IconArrow,
    UserAvatar,
    IconEarth,
    IconDown,
    IconBack,
    LinkText
  },

  props: {
    bgColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['black', 'white'].includes(value)
      }
    }
  },

  setup(props: HeaderProps, { emit }) {
    const { app, $auth, $config } = useContext()
    const router = useRouter()
    const route = useRoute()
    // set Token to cookie
    const { removeCookieToken } = useSetCookie()

    // ---------------- css ----------------
    const bgColorClass = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor
      }
    })

    const dropdownBgColor = computed(() => {
      return props.bgColor
    })

    const iconColor = computed(() => {
      return props.bgColor === 'white' ? 'black' : 'white'
    })

    // ---------------- check active class ----------------

    const onDashboardPage = computed(() => {
      return /\/dashboard/.test(route.value.path)
    })

    const onAccountPage = computed(() => {
      return /\/account/.test(route.value.path)
    })

    // ---------------- get avatar image path ----------------
    const { getUserThumbnailUrl } = useCreateThumbnailPath()

    // ---------------- handle event on menu ----------------
    const navigation = reactive({
      currentLanguage: '',
      isHumbergarOpen: false,
      isLanguageMenuOpen: false,
      isMypageMenuOpen: false
    })

    const onClickHumbergerMenu = () => {
      navigation.isHumbergarOpen = !navigation.isHumbergarOpen

      if (navigation.isHumbergarOpen) document.body.className = 'body-fixed'
      else document.body.className = ''
    }

    const onClickMypage = () => {
      navigation.isMypageMenuOpen = !navigation.isMypageMenuOpen
    }

    const onCloseHumbergerMenu = () => {
      navigation.isHumbergarOpen = false
      document.body.className = ''
    }

    // check current page to display Back button or Humberger button on mobile
    const checkCurrentPage = () => {
      const currentPath = route.value

      // check current page is dashboard menu or not
      if (!currentPath.name?.includes('menu')) {
        if (
          // check current page is dashboard / mypage / account
          currentPath.name?.includes('dashboard-') ||
          currentPath.name?.includes('mypage-') ||
          currentPath.name?.includes('account-')
        )
          return true
      }
    }

    // handle back to menu page on mobile
    const handleBackToMenu = () => {
      router.push(
        app.localePath({ name: 'dashboard-id-menu', params: { id: getWorkspaceId.value || '' } })
      )
    }

    // ---------------- workspace ----------------
    const { getWorkspaceId, getWorkspaceInfo, removeWorkspaceLocalstrage } = injectWorkspace()
    const { removeMemberInfoLocalstrage } = injectMember()

    // ---------------- logout ----------------
    const useLoginUserState = injectLoginUser()
    const { handleClickSNSLogoutButton } = useSocialLogin()

    const onClickLogout = async () => {
      await $auth.logout().then(() => {
        // remove localstrage
        removeWorkspaceLocalstrage()
        removeMemberInfoLocalstrage()
        // remove cookie
        removeCookieToken($config.loginCookieDomain || '', '/')
        // social logout
        handleClickSNSLogoutButton('/login')
      })
    }

    const isSocialLoginLoading = computed(() => {
      return useLoginUserState.isSocialLoginLoading.value
    })

    const handleResetPage = () => {
      emit('onForcePage')
    }

    /**
     * get url when switch language
     * @lang: string | language
     */
    const switchLanguageUrl = (lang: string) => {
      // check url exists
      if (route.value.matched.length > 0) {
        return app.switchLocalePath(lang)
      }

      // if url doesn't exist, redirect to home when switch language
      return app.localePath('/')
    }

    return {
      imageSizes,
      bgColorClass,
      dropdownBgColor,
      iconColor,
      useLoginUserState,
      ...toRefs(navigation),
      isSocialLoginLoading,
      onDashboardPage,
      onAccountPage,
      onClickHumbergerMenu,
      onClickMypage,
      onClickLogout,
      getUserThumbnailUrl,
      onCloseHumbergerMenu,
      checkCurrentPage,
      handleBackToMenu,
      getWorkspaceInfo,
      getWorkspaceId,
      handleResetPage,
      switchLanguageUrl
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  @include ls(100);
  z-index: $z_header;
  background-color: $color_white;
  border-bottom: 1px solid $color_gray_200;

  @include header-pc() {
    position: relative;
    top: 0;
    height: $header_H_pc;
    padding: 0 $spacing_8x;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @include header-mb() {
    position: fixed;
    top: 0;
    height: $header_H_sp;
    padding: 0;
  }

  @include screen($breakpoints_header, map-get($breakpoints, xl)) {
    padding: 0 $spacing_4x;
  }

  &.-bgColor {
    &--black {
      background-color: $color_gray_1000;
      color: $color_white;
      border-bottom: none;

      @include header-mb() {
        border-bottom: 1px solid $color_gray_500;
      }

      .header_menu {
        background-color: $color_gray_1000;
      }

      .header_menuButton {
        background-color: $color_gray_1000;
        border: 1px solid $color_gray_1000;
        border-right: 1px solid $color_gray_500;
        border-bottom: 1px solid $color_gray_500;

        &.is-open {
          span {
            background-color: $color_gray_1000;
          }
        }

        & span {
          background-color: $color_white;

          &::before {
            background-color: $color_white;
          }

          &::after {
            background-color: $color_white;
          }
        }
      }
    }
  }

  &_menuButton span,
  &_menuButton span::before,
  &_menuButton span::after {
    content: '';
    display: block;
    height: 2px;
    width: 18px;
    border-radius: 2px;
    background-color: $color_gray_900;
    position: absolute;
  }

  &_menuButton span::before {
    bottom: 6px;
    transition: transform 0.5s;
  }

  &_menuButton span::after {
    top: 6px;
    transition: transform 0.5s;
  }

  &_menuButton,
  &_backButton {
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    display: flex;
    height: $header_H_sp;
    width: $header_H_sp;
    justify-content: center;
    align-items: center;
    z-index: 90;
    background-color: $color_white;
    border: 1px solid $color_light_blue_200;
    border-top: none;

    @include header-pc() {
      display: none;
    }

    &.is-open {
      background: $color_gray_900;
      border: 0;
    }

    &.is-open span {
      background-color: transparent;

      &::before,
      &::after {
        top: 25%;
        transition: transform 0.5s;
        background-color: $color_white;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  &_logo {
    @include header-pc() {
      display: contents;
      padding-left: 2vw;
    }

    @include header-mb() {
      height: 100%;
      margin-left: $header_H_sp;
      display: inline-block;
      transform: scale(0.8);
    }
  }

  &_menu {
    @include header-pc() {
      display: flex;
      align-items: center;
    }

    @include header-mb() {
      position: absolute;
      height: calc(100vh - #{$header_H_sp});
      background-color: $color_white;
      box-shadow: 0 6px 6px -3px rgba($color_gray_1000, 0.25);
      width: 320px;
      top: $header_H_sp;
      left: -320px;
      transition: all 0.8s;
    }

    &.is-open {
      @include header-mb() {
        left: 0;
        transition: all 0.8s;
      }
    }

    // make backgound darken
    &_overlay {
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.3);
      z-index: -1;
      position: absolute;
      top: $header_H_sp;
      left: 0;
      display: none;

      &.is-open {
        @include header-mb() {
          display: block;
          transition: 0.5s;
        }
      }
    }
  }

  &_nav {
    @include header-pc() {
      position: relative;
      display: flex;
      align-items: center;
    }

    &_item {
      position: relative;
      word-break: keep-all;
      @include fz($font_size_xs);

      @include header-pc() {
        margin-right: $spacing_4x;
      }

      @include header-mb() {
        @include fz($font_size_base);
        border-bottom: 1px solid $color_gray_500;
      }

      @include screen($breakpoints_header, map-get($breakpoints, xl)) {
        @include fz($font_size_xxs);
        margin-right: $spacing_2x;
      }

      & .--right-border {
        margin-right: $spacing_4x;

        @include header-mb() {
          margin-right: 0;
        }

        @include screen($breakpoints_header, map-get($breakpoints, xl)) {
          margin-right: $spacing_2x;
        }

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          width: 1px;
          height: 30px;
          transform: translateY(-50%);
          background-color: $color_gray_lighten1;

          @include header-mb() {
            display: none;
          }
        }
      }
    }

    &_lang {
      @include header-mb() {
        display: flex !important;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        background: $color_gray_1000;
        border-top: 1px solid $color_gray_500;
      }

      & .-active {
        color: $color_yellow;
      }

      a {
        position: relative;
        text-align: center;
        color: $color_white;
        padding: $spacing_4x;
        display: block;
        width: 50%;

        &:first-child {
          border-right: 1px solid $color_gray_500;
        }
      }
    }

    &_link {
      &.nuxt-link-exact-active {
        color: $color_yellow;
      }

      @include header-mb() {
        display: block;
        padding: $spacing_4x;
      }
    }
  }

  &_dropdown {
    display: none;
    word-break: keep-all;
    white-space: nowrap;
    background-color: $color_white;

    @include header-pc() {
      position: absolute;
      top: $header_H_pc;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 0 0 5px 5px;
      border-top: 0;
    }

    &.-bgColor {
      &--black {
        background-color: $color_gray_1000;
        color: $color_white;
        border-bottom: 1px solid $color_gray_1000;
      }
    }

    &.is-open {
      display: block;
    }

    // &_dropdown_item
    &_item {
      @include header-pc() {
        margin: $spacing_2x 0;
      }

      @include header-mb() {
        padding: $spacing_1x 0;
      }

      a {
        display: block;
        padding: $spacing_2x $spacing_4x;
      }

      & .nuxt-link-exact-active,
      & .-active {
        background-color: $color_light_blue_100;
      }

      &:hover {
        background-color: $color_light_blue_100;
      }
    }

    // &_dropdown_parent
    &_parent {
      display: flex;
      align-items: center;
      height: 100%;
      color: inherit;
      background-color: inherit;

      @include header-pc() {
        @include fz($font_size_xs);
        line-height: $header_H_pc;
        height: $header_H_pc;
      }

      @include header-mb() {
        @include fz($font_size_base);
        line-height: $header_H_sp;
      }
    }

    // &_dropdown_user
    &_user {
      vertical-align: middle;
      line-height: initial;
    }
  }

  &_userMenu {
    width: 260px;
    display: none;
    background-color: $color_white;
    overflow: hidden;
    padding: $spacing_2x 0;

    @include header-mb() {
      width: 100%;
    }

    @include header-pc() {
      position: absolute;
      top: $header_H_pc;
      right: 0;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
    }

    &.is-open {
      display: block;
    }

    &.-bgColor {
      &--black {
        background-color: $color_gray_1000;
        color: $color_white;
        border-bottom: 1px solid $color_gray_1000;

        @include header-pc() {
          box-shadow: 0 0 15px rgba($color_gray_500, 0.25);
        }
      }
    }

    &_avator {
      padding: $spacing_2x $spacing_4x;
      border-bottom: 1px solid $color_gray_300;
      @include header-mb() {
        display: none;
      }
    }
    &_linkProfile {
      margin-left: 60px;
    }

    &_workspace {
      color: $color_yellow;
      @include fz($font_size_xxxs);
      margin-top: $spacing_2x;
      word-break: break-all;
    }

    &_link,
    &_button {
      @include fz($font_size_xxs);
      display: block;
      padding: $spacing_2x $spacing_4x;
      line-height: calc(#{$header_H_pc} - 45px);
      cursor: pointer;
    }
  }

  &_button {
    @include header-mb() {
      width: 90%;
      margin: $spacing_4x auto $spacing_2x;
    }

    a {
      @include header-mb() {
        display: block;
        width: 100%;
      }
    }
  }

  .icon-earth {
    margin-top: 0.2rem;
    margin-right: $spacing_1x;
  }

  .icon-arrow {
    margin-left: $spacing_2x;
  }

  .icon-down {
    margin-left: $spacing_2x;
  }

  .-bgColor {
    &--black {
      background-color: $color_gray_1000;
      color: $color_white;
      border-bottom: 1px solid $color_gray_1000;

      .header_dropdown_item {
        &.-active,
        & .nuxt-link-exact-active {
          color: $color_yellow;
          background-color: rgba($color_gray_800, 20%);
        }

        &:hover {
          background-color: rgba($color_gray_800, 20%);
        }
      }
    }
  }
}
</style>
