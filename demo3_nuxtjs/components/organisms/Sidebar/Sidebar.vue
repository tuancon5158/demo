<template>
  <aside
    class="sidebar"
    :class="classes"
    @click="handleExpandSidebar"
    @mouseleave="handleCollapseSidebar"
  >
    <div class="sidebar_head">
      <div
        ref="sidebar-dropdown"
        class="sidebar-active sidebar_spaceSelector"
        @click.exact="handleWorkSpaceDropdown"
      >
        <SquareImage
          v-if="getWorkspaceThumbnailUrl"
          :path="getWorkspaceThumbnailUrl"
          width="48px"
          height="48px"
        />
        <div v-if="currentWorkSpaceName" class="sidebar_spaceSelector_text">
          <div class="sidebar-active sidebar_spaceSelector_text_workspace">
            {{ truncateText(currentWorkSpaceName, 126, '..') }}
          </div>
          <div
            v-if="currentWorkSpaceLabelName"
            class="sidebar-active sidebar_spaceSelector_text_plan"
          >
            {{ currentWorkSpaceLabelName($i18n.locale) }}
          </div>
        </div>
        <div class="sidebar-active sidebar_spaceSelector_icon">
          <IconBase icon-color="#777" width="10" height="5" viewBox="0 0 10 5">
            <IconDown />
          </IconBase>
        </div>
      </div>
      <div
        v-closable="{
          exclude: ['sidebar-dropdown'],
          handler: 'handleWorkSpaceDropdownOutSize'
        }"
        class="sidebar_workSpaceList"
      >
        <Dropdown
          class="sidebar_dropdown"
          has-image
          border-color="gray"
          :menu-items="menuWorkSpaceList"
          :menu-selected="menuWorkSpaceSelected"
          position="bottom"
          :label-truncate="26"
          @onClick="handleClickWorkspaceDropdown"
        />
      </div>
    </div>
    <div class="sidebar_body">
      <div class="sidebar_body_head">
        <div class="sidebar_settings">
          <p class="sidebar_subTitle">{{ $t('sidebar.contents') }}</p>
          <ul>
            <li>
              <nuxt-link
                class="sidebar_settings_item"
                :to="localePath({ name: 'dashboard-id-spaces', params: { id: getWorkspaceId } })"
                @click.native="handleCollapseSidebar"
              >
                <IconBase width="32" height="32" viewBox="0 0 32 32" class="sidebar_settings_icon">
                  <IconSpace />
                </IconBase>
                <span class="sidebar_settings_text">
                  {{ $t('sidebar.menu1') }}
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="sidebar_settings_item"
                :to="localePath({ name: 'dashboard-id-avatar', params: { id: getWorkspaceId } })"
                @click.native="handleCollapseSidebar"
              >
                <IconBase width="32" height="32" viewBox="0 0 32 32" class="sidebar_settings_icon">
                  <IconAvatar />
                </IconBase>
                <span class="sidebar_settings_text">
                  {{ $t('sidebar.menu2') }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="sidebar_settings">
          <p class="sidebar_subTitle">{{ $t('sidebar.settings') }}</p>
          <ul>
            <li>
              <nuxt-link
                class="sidebar_settings_item"
                :to="localePath({ name: 'dashboard-id-settings', params: { id: getWorkspaceId } })"
                @click.native="handleCollapseSidebar"
              >
                <IconBase class="sidebar_settings_icon" width="32" height="32" viewBox="0 0 32 32">
                  <IconSettings />
                </IconBase>
                <span class="sidebar_settings_text">
                  {{ $t('sidebar.menu3') }}
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="sidebar_settings_item"
                :class="{ '-disabled': isPersonal }"
                :to="
                  localePath({ name: 'dashboard-id-member-list', params: { id: getWorkspaceId } })
                "
                @click.native="handleCollapseSidebar"
              >
                <IconBase class="sidebar_settings_icon" width="32" height="32" viewBox="0 0 32 32">
                  <IconMember />
                </IconBase>
                <span class="sidebar_settings_text">
                  {{ $t('sidebar.menu4') }}
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="sidebar_settings_item sidebar_settings_item_license"
                :to="
                  localePath({
                    name: 'dashboard-id-license',
                    params: { id: getWorkspaceId }
                  })
                "
                @click.native="handleCollapseSidebar"
              >
                <IconBase class="sidebar_settings_icon" width="32" height="32" viewBox="0 0 32 32">
                  <IconLicense />
                </IconBase>
                <span class="sidebar_settings_text">
                  {{ $t('sidebar.menu5') }}
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="sidebar_settings_item sidebar_settings_item_license"
                :to="
                  localePath({
                    name: 'dashboard-id-new-guest-notifications',
                    params: { id: getWorkspaceId }
                  })
                "
                @click.native="handleCollapseSidebar"
              >
                <IconBase class="sidebar_settings_icon" width="32" height="32" viewBox="0 0 32 32">
                  <IconEmailNotification />
                </IconBase>
                <span class="sidebar_settings_text">
                  {{ $t('sidebar.menu7') }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="isPersonal" class="sidebar_body_foot">
        {{ $t('sidebar.memberPersonalLimitations.text1') }}
        <br />
        {{ $t('sidebar.memberPersonalLimitations.text2') }}
      </div>
    </div>

    <client-only>
      <template v-if="!useLoginUserState.isSocialLoginLoading.value">
        <div v-if="$auth.loggedIn" class="sidebar_foot">
          <UserAvatar
            :user-name="$auth.user.name"
            :user-email="$auth.user.email"
            direction="horizontal"
            :image-path="getUserThumbnailUrl(100)"
            :expand="sidebarCollapsed"
          />
          <div class="sidebar_accountSettings">
            <LoadMore
              ref="account-settings"
              color="black"
              class="sidebar_accountSettings_loadMore"
              @onClick="handleAccountDropdown"
            />
            <Dropdown
              v-closable="{
                exclude: ['account-settings'],
                handler: 'handleCloseAccount'
              }"
              class="sidebar_accountSettings_dropdown"
              :menu-items="menuAccountItems"
              :menu-selected="menuAccountSelected"
              position="top"
              @onClose="handleCloseAccount"
              @onLogout="handleLogout"
            />
          </div>
        </div>
      </template>
    </client-only>
  </aside>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  computed,
  onBeforeMount,
  useRouter,
  watch,
  useRoute,
  onUpdated
} from '@nuxtjs/composition-api'
import SquareImage from '~/components/atoms/Image/SquareImage.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconDown from '~/components/icons/IconDown.vue'
import IconAvatar from '~/components/icons/IconAvatar.vue'
import IconSpace from '~/components/icons/IconSpace.vue'
import IconSettings from '~/components/icons/IconSettings.vue'
import IconMember from '~/components/icons/IconMember.vue'
import IconLicense from '~/components/icons/IconLicense.vue'
import IconEmailNotification from '~/components/icons/IconEmailNotification.vue'
import UserAvatar from '~/components/molecules/UserAvatar/UserAvatar.vue'
import LoadMore from '~/components/molecules/LoadMore/LoadMore.vue'
import Dropdown from '~/components/molecules/Dropdown/Dropdown.vue'
// composables
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'
import useSocialLogin from '~/composables/useSocialLogin'
import { truncateFilter } from '~/composables/utilities/filters/truncate'
import { injectLoginUser } from '~/store/login'
import { injectWorkspace, injectMember } from '~/composables'
// constants
import { workspaceType } from '~/constants/workspace'
import { imageSizes } from '~/constants/image-size'

type SidebarProps = {
  isMobile: boolean
}
type workSpaceDropdownProps = {
  id?: string
  label?: string
  icon?: string
  imagePath?: string
  color?: string
  link?: string
  action?: string
}

export default defineComponent({
  name: 'Sidebar',

  components: {
    SquareImage,
    IconDown,
    IconBase,
    IconAvatar,
    IconSpace,
    IconSettings,
    IconMember,
    IconLicense,
    IconEmailNotification,
    UserAvatar,
    LoadMore,
    Dropdown
  },

  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },

  setup(props: SidebarProps) {
    const { app, $auth, params } = useContext()
    const router = useRouter()
    const route = useRoute()
    const isDataExist = ref(false)
    const truncateText = truncateFilter()
    const classes = computed(() => {
      return {
        '--expand': sidebarCollapsed.value,
        '--mobile': props.isMobile
      }
    })

    // ---------------- get avatar image path ----------------
    const { getUserThumbnailUrl } = useCreateThumbnailPath()

    // ---------------- acount settings ----------------
    const menuAccountSelected = ref(false)
    // toggle account dropdown
    const handleAccountDropdown = () => {
      menuAccountSelected.value = !menuAccountSelected.value
    }

    const currentWorkSpaceName = computed(() => {
      return menuWorkSpaceList.value.find((item) => getWorkspaceId.value === item?.id)?.label
    })

    const currentWorkSpaceLabelName = (lang) => {
      if (lang === 'en') {
        return menuWorkSpaceList.value.find((item) => getWorkspaceId.value === item?.id)?.subtitleEn
      }

      return menuWorkSpaceList.value.find((item) => getWorkspaceId.value === item?.id)?.subtitle
    }

    const menuAccountItems = computed(() => {
      return [
        {
          label: app.i18n.t('sidebar.menu6'),
          icon: 'account-settings',
          action: 'onClose',
          color: 'black',
          link: 'account-profile'
        },
        {
          label: app.i18n.t('sidebar.signOut'),
          icon: 'sign-out',
          color: 'red',
          action: 'onLogout'
        }
      ]
    })

    // handle close account dropdown when clicking outside
    const handleCloseAccount = () => {
      menuAccountSelected.value = false
    }

    // ---------------- sidebar ----------------
    const sidebarCollapsed = ref(false)
    // check screen width to expand / collapse sidebar
    const checkScreenWidth = () => {
      const winddowW = window.innerWidth

      if (winddowW > 924 || winddowW < 640) return true
    }

    // handle expand sidebar when screen is < 924px and > 640px
    const handleExpandSidebar = () => {
      // eslint-disable-next-line no-unused-expressions
      checkScreenWidth() ? null : (sidebarCollapsed.value = true)
    }

    // handle collapse sidebar when screen is < 924px and > 640px
    const handleCollapseSidebar = (e) => {
      // eslint-disable-next-line no-unused-expressions
      checkScreenWidth() ? null : (sidebarCollapsed.value = false)
      e.stopPropagation()
    }

    // ---------------- workspace dropdown ----------------
    const menuWorkSpaceSelected = ref(false)

    const handleWorkSpaceDropdown = () => {
      menuWorkSpaceSelected.value = !menuWorkSpaceSelected.value
    }

    const handleWorkSpaceDropdownOutSize = (event: { target: HTMLButtonElement }) => {
      if (
        !event.target?.classList[0]?.split(' ').includes('sidebar-active') &&
        !event.target?.classList[0]?.split(' ').includes('squareImage_image')
      ) {
        menuWorkSpaceSelected.value = false
      }
    }

    const handleClickWorkspaceDropdown = (value) => {
      setWorkspaceId(value.id)
      fetchWorkspaceById(value.id || '')
      fetchMemberMe(value.id || '') // fetch member role ID

      menuWorkSpaceSelected.value = false

      router.push(app.localePath({ name: 'dashboard-id-spaces', params: { id: value?.id } }))
    }

    // ---------------- get workspaces ----------------
    const {
      getWorkspaceId, // workspaceID
      getWorkspaceInfo, // workspace name/ planID
      menuWorkSpaceList, // workspace list for side menu
      setWorkspaceId, // replace global state/ localstrage
      fetchWorkspaces, // call API fetch workspace list
      fetchWorkspaceById, // call API fetch workspace name/ planID,
      removeWorkspaceLocalstrage
    } = injectWorkspace()

    const { fetchMemberMe, removeMemberInfoLocalstrage } = injectMember()

    onBeforeMount(async () => {
      if (menuWorkSpaceList.value.length === 0) {
        await fetchWorkspaces(Number($auth.user?.id))

        if (getWorkspaceId.value) handleMemberRole()
      }

      isDataExist.value = true

      // redirect if param workspace not match
      if (!menuWorkSpaceList.value.find((item) => item?.id === params.value?.id)) {
        const { id } = menuWorkSpaceList.value[0] || { id: 0 }

        router.push(app.localePath({ name: 'dashboard-id-spaces', params: { id: id || '' } }))
      }
    })

    const isPersonal = computed(() => {
      return getWorkspaceInfo.value?.type === workspaceType.PERSONAL
    })

    const handleMemberRole = async () => {
      const result = await fetchMemberMe(getWorkspaceId.value || '')

      if (result.response) {
        const { key, args } = result?.response?.data?.response || {
          key: '',
          args: {
            resource: ''
          }
        }

        if (key === 'common.notFound' && args?.resource === 'workspaceUsers') {
          if (menuWorkSpaceList.value[0]) {
            const { id } = menuWorkSpaceList.value[0] || { id: 0 }

            setWorkspaceId(id || '')

            router.push(app.localePath({ name: 'dashboard-id-spaces', params: { id: id || '' } }))

            await fetchWorkspaceById(id || '')
          }
        }
      }
    }

    const getWorkspaceThumbnailUrl = computed(() => {
      const selectedWorkspace: workSpaceDropdownProps =
        menuWorkSpaceList.value.find(
          (workspace: workSpaceDropdownProps) => workspace?.id === getWorkspaceId.value
        ) || {}

      if (selectedWorkspace)
        return `${selectedWorkspace.imagePath}?w=${imageSizes.userThumbnail.small}` || ''
    })

    // ---------------- login status ----------------
    const useLoginUserState = injectLoginUser()

    // ---------------- logout ----------------
    const { handleClickSNSLogoutButton } = useSocialLogin() // composable

    const handleLogout = async () => {
      // useLoginUserState.setSocialLoginLoading(true)
      await $auth.logout().then(() => {
        menuAccountSelected.value = false

        // remove localstrage
        removeWorkspaceLocalstrage()
        removeMemberInfoLocalstrage()
      })

      // social logout
      handleClickSNSLogoutButton('/login')
    }

    const getWorkspaceName = computed(() => {
      return getWorkspaceInfo.value?.name || ''
    })

    watch(
      () => app.i18n.locale,
      () => {
        if ($auth.user?.id) {
          fetchWorkspaces(Number($auth.user?.id))
        }
      }
    )
    onUpdated(() => {
      const localStorageWorkspaceId = JSON.parse(localStorage.getItem('_workspace') as string)

      if (localStorageWorkspaceId && route.value?.params?.id !== localStorageWorkspaceId.id) {
        const workspaceList = menuWorkSpaceList.value.map((item) => item.id)

        if (workspaceList.length > 0 && workspaceList.includes(route.value?.params?.id)) {
          setWorkspaceId(route.value?.params?.id)
          fetchMemberMe(route.value?.params?.id)
        }
      }
    })

    return {
      imageSizes,
      classes,
      truncateText,
      useLoginUserState,
      isPersonal,
      getUserThumbnailUrl,
      menuAccountItems,
      menuAccountSelected,
      menuWorkSpaceSelected,
      sidebarCollapsed,
      handleWorkSpaceDropdown,
      menuWorkSpaceList,
      getWorkspaceId,
      handleAccountDropdown,
      handleCloseAccount,
      checkScreenWidth,
      handleExpandSidebar,
      handleCollapseSidebar,
      handleLogout,
      handleClickWorkspaceDropdown,
      getWorkspaceName,
      getWorkspaceThumbnailUrl,
      handleWorkSpaceDropdownOutSize,
      isDataExist,
      currentWorkSpaceName,
      currentWorkSpaceLabelName
    }
  }
})
</script>

<style scoped lang="scss">
.sidebar {
  width: $dashboard_sidebar_W_pc;
  height: 100%;
  background-color: $color_white;
  position: relative;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  @include scrollbar(2);

  &_contents_text,
  &_settings_text,
  &_subTitle {
    @include max-screen(map-get($breakpoints, lg)) {
      display: none;
    }
  }

  // 924px
  @include max-screen(map-get($breakpoints, lg)) {
    width: $dashboard_sidebar_W_mb;
    padding: $spacing_5x $spacing_3x;
    position: absolute;
    height: calc(100vh - 45px);
  }

  // 640px
  @include max-screen(map-get($breakpoints, sm)) {
    display: none;
  }

  &_head {
    padding: $spacing_5x;
    border-bottom: 1px solid $color_light_blue_200;
    position: relative;

    @include max-screen(map-get($breakpoints, lg)) {
      padding: $spacing_5x 0;
    }
  }

  &_spaceSelector {
    position: relative;
    width: 100%;
    background: $color_gray_50;
    border: 1px solid $color_light_blue_200;
    border-radius: 8px;
    padding: $spacing_3x;
    cursor: pointer;
    word-break: break-all;
    justify-content: center;
    margin: 0 auto;
    display: flex;
    align-items: center;

    // &_button {
    //   display: flex;
    //   align-items: center;
    // }

    &_wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &_icon {
      position: relative;
      z-index: 1;
      width: 24px;
      height: 24px;
      margin-left: auto;

      @include max-screen(map-get($breakpoints, lg)) {
        display: none;
      }
    }

    &_text {
      margin-left: $spacing_2x;
      text-align: left;
      word-break: break-word;
      // margin-left: $spacing_2x;
      @include fz($font_size_s);
      @include max-screen(map-get($breakpoints, lg)) {
        display: none;
      }

      &_workspace {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      &_plan {
        @include fz($font_size_xxxs);
        color: $color_gray_800;
        margin-top: $spacing_1x;
      }
    }
  }

  &_workSpaceList {
    position: relative;
    z-index: 999;
  }

  li {
    margin-bottom: $spacing_2x;
  }

  &_body {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    overflow-y: auto;

    &_head {
      width: 100%;
      padding: $spacing_5x $spacing_5x 0;

      @include max-screen(map-get($breakpoints, lg)) {
        padding: $spacing_5x $spacing_3x;
      }
    }

    &_foot {
      width: 100%;
      @include fz($font_size_xxxs);
      color: $color_gray_700;
      text-align: center;
      padding: 0 $spacing_2x;
      margin: $spacing_5x 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;

      @include max-screen(map-get($breakpoints, lg)) {
        padding: 0;
        margin-bottom: $spacing_5x;
        -webkit-line-clamp: 2;
      }
    }
  }

  &_subTitle {
    @include fz($font_size_xs);
    color: $color_gray_700;
    padding: $spacing_3x $spacing_4x;
    margin: 0 0 $spacing_2x 0;
  }

  &_settings {
    margin-bottom: $spacing_2x;

    &:first-child {
      border-bottom: 1px solid $color_light_blue_200;
    }

    &_item {
      position: relative;
      transition: 0.3s all;
      display: flex;
      align-items: center;
      height: 56px;
      padding: $spacing_3x $spacing_4x;
      border-radius: 8px;
      color: $color_gray_900;
      font-weight: $font_weight_medium;
      margin-bottom: $spacing_2x;
      @include fz($font_size_s);
      @include ls(10);
      cursor: pointer;

      @include max-screen(map-get($breakpoints, lg)) {
        justify-content: center;
      }

      & svg {
        @include max-screen(map-get($breakpoints, lg)) {
          flex: 0 0 3.2rem;
        }
      }

      &_license {
        > svg {
          position: relative;
          bottom: -5px;
        }
      }

      &:hover {
        background: $color_yellow_50;
      }

      &.nuxt-link-active,
      &.nuxt-link-exact-active {
        background: $color_gray_800;
        color: $color_yellow_500;

        > svg {
          fill: $color_yellow_500;
        }

        &::after {
          position: absolute;
          top: 50%;
          right: $spacing_3x;
          bottom: 0;
          width: 0;
          height: 0;
          border-left: 6px solid $color_yellow_500;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          content: '';
          transform: translateY(-50%);

          @include max-screen(map-get($breakpoints, lg)) {
            display: none;
          }

          :lang(en) & {
            right: $spacing_2x;
          }
        }
      }

      &.-disabled {
        color: $color_gray_400;
        pointer-events: none;

        > svg {
          fill: $color_gray_400;
        }
      }
    }
    &_icon {
      margin-right: $spacing_3x;
      fill: $color_gray_900;

      :lang(en) & {
        @include min-screen(map-get($breakpoints, lg)) {
          margin-right: $spacing_2x;
        }
      }

      @include max-screen(map-get($breakpoints, lg)) {
        margin-right: 0;
      }
    }
  }

  &_foot {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-top: 1px solid $color_light_blue_200;
    padding: $spacing_4x $spacing_5x;

    /deep/ .userAvatar_name {
      @include max-screen(map-get($breakpoints, lg)) {
        display: none;
      }
    }
  }

  &_accountSettings {
    position: relative;
    &_loadMore {
      @include max-screen(map-get($breakpoints, lg)) {
        display: none;
      }
    }
    &_dropdown {
      z-index: 999;
    }
  }

  // make it expand when hovering
  &.--expand {
    @include max-screen(map-get($breakpoints, lg)) {
      width: $dashboard_sidebar_W_pc;
      transition: all 0.3s;
      padding: $spacing_5x $spacing_3x;
      overflow-x: hidden;
    }
    & .sidebar {
      &_foot {
        width: 260px;
        justify-content: flex-start;
      }

      &_settings_text,
      &_spaceSelector_text,
      &_accountSettings_loadMore {
        display: flex;
      }

      &_settings_item {
        width: 260px;
        justify-content: flex-start;
      }

      &_settings_item::after,
      &_spaceSelector_icon {
        display: block;
      }

      &_settings_icon {
        margin-right: $spacing_3x;
      }

      &_accountSettings_dropdown {
        right: 0;
      }

      &_spaceSelector {
        width: 260px;
      }
    }
  }

  // mobile menu
  &.--mobile {
    width: 100%;
    padding: 0;
    display: flex;
    position: static;
    height: calc(100vh - 45px);
    margin: -$spacing_4x;

    .sidebar {
      &_head,
      &_foot {
        width: 100%;
      }
      &_head {
        padding: $spacing_5x;
      }
      &_workSpaceList ul {
        width: 100%;
      }

      &_settings_item {
        width: 100%;
        justify-content: flex-start;
        &:hover,
        &.nuxt-link-exact-active {
          background: none;
          color: inherit;
          > svg {
            fill: inherit;
          }
          &::after {
            display: none;
          }
        }
      }
      &_settings_text,
      &_spaceSelector_text,
      &_accountSettings_loadMore {
        display: flex;
      }
      &_spaceSelector_icon {
        display: block;
      }
      &_contents_icon,
      &_settings_icon {
        margin-right: $spacing_3x;
      }
      &_accountSettings_dropdown {
        right: 0;
      }
      &_foot {
        justify-content: flex-start;
        /deep/ .userAvatar_name {
          display: block;
        }
      }
    }
  }
}

// dropdown
/deep/ .sidebar_dropdown {
  padding-bottom: 0;

  li:last-child {
    margin-top: $spacing_2x;
    border-top: 1px solid $color_light_blue_200;
    position: sticky;
    bottom: -1px;
    z-index: 1;
    background-color: $color_yellow_50;

    & a:hover {
      background-color: $color_yellow_100;
    }
  }
}
</style>
