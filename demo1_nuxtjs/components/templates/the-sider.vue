<template>
  <a-layout-sider
    v-model="isCollapsed"
    :theme="theme"
    :trigger="null"
    class="the-sider"
    collapsible
  >
    <div class="flex-grow-0 flex-shrink-0 p-4 pl-6" style="height: 64px">
      <the-logo :collapse="isCollapsed" :dark="switchTheme"></the-logo>
    </div>

    <div class="the-menu">
      <a-menu
        :open-keys="openKeys"
        :theme="theme"
        class="h-full overflow-auto"
        mode="inline"
        @openChange="onOpenChange"
        @click="handleSelectMenuItem"
      >
        <template v-if="$isAdmin()">
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="deployment-unit" />
              <span>Tổ chức</span>
            </span>

            <a-menu-item key="/profile">
              <span class="nav-text">Nhân sự</span>
            </a-menu-item>
            <!-- <a-menu-item key="/department">
              <span class="nav-text">Phòng ban </span>
            </a-menu-item>
            <a-menu-item key="/position">
              <span class="nav-text">Chức danh</span>
            </a-menu-item> -->
            <a-menu-item key="/phong-ban-chuc-danh/danh-muc-don-vi">
              <span class="nav-text">Phòng ban chức danh</span>
            </a-menu-item>
            <a-menu-item key="/wage-scale">
              <span class="nav-text">Thang lương</span>
            </a-menu-item>
            <a-menu-item key="/wage-weight">
              <span class="nav-text">Hệ số lương</span>
            </a-menu-item>
            <a-menu-item key="/timesheet">
              <span class="nav-text">Timesheet</span>
            </a-menu-item>
            <a-menu-item key="/holiday">
              <span class="nav-text">Lễ tết</span>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="calendar" />
              <span>Lịch làm việc</span>
            </span>

            <a-menu-item key="/lich-lam-viec/cong-ty">
              <span class="nav-text">Lịch làm việc</span>
            </a-menu-item>
            <a-menu-item key="/duyet-de-xuat/dang-ky-lam-them">
              <span class="nav-text">Duyệt đề xuất</span>
            </a-menu-item>
            <a-menu-item key="/cham-cong/lich-su">
              <span class="nav-text">Chấm công</span>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="area-chart" />
              <span>Chính sách hiệu suất</span>
            </span>

            <a-menu-item key="/policy">
              <span class="nav-text">Chính sách</span>
            </a-menu-item>
            <a-menu-item key="/revenue-conversion">
              <span class="nav-text">Quy đổi doanh thu</span>
            </a-menu-item>
            <a-menu-item key="/performance">
              <span class="nav-text">Hiệu suất khối bán lẻ</span>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="appstore" />
              <span>Thi đua</span>
            </span>

            <a-menu-item key="/rewards-punishment/personal">
              <span class="nav-text">Thưởng phạt</span>
            </a-menu-item>
            <a-menu-item key="/behavior">
              <span class="nav-text">Danh sách hành vi</span>
            </a-menu-item>
            <a-menu-item key="/behavior-group">
              <span class="nav-text">Nhóm hành vi</span>
            </a-menu-item>
            <a-menu-item key="/point/company">
              <span class="nav-text">Point</span>
            </a-menu-item>
          </a-sub-menu>

          <!--          <a-sub-menu key="sub5">-->
          <!--            <span slot="title">-->
          <!--              <a-icon type="dollar" />-->
          <!--              <span>Thanh toán lương</span>-->
          <!--            </span>-->

          <!--            <a-menu-item key="/thu-nhap-nhan-su/ca-nhan">-->
          <!--              <span class="nav-text">Thu nhập nhân sự</span>-->
          <!--            </a-menu-item>-->
          <!--          </a-sub-menu>-->

          <a-menu-item key="/thu-nhap-nhan-su/dang-trong-ky?status=APPROVED">
            <a-icon type="dollar" />
            <span class="nav-text">Thu nhập nhân sự</span>
          </a-menu-item>
        </template>

        <template v-else>
          <a-menu-item key="/lich-lam-viec/cong-ty">
            <span class="nav-text">Lịch làm việc</span>
          </a-menu-item>
          <a-menu-item key="/duyet-de-xuat/dang-ky-lam-them">
            <span class="nav-text">Duyệt đề xuất</span>
          </a-menu-item>
        </template>
      </a-menu>
    </div>

    <div class="switch-theme">
      <div class="flex items-center">
        <a-menu
          :theme="theme"
          class="!w-full menu-account"
          mode="vertical"
          @click="handleSelectMenuAccount"
        >
          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <div class="flex items-center">
                <a-avatar
                  v-if="$auth.user.avatar"
                  :src="$config.mediaBaseURL + '/' + $auth.user.avatar"
                  style="min-width: 32px"
                />
                <a-avatar
                  v-else
                  icon="user"
                  style="backgroundcolor: #87d068; min-width: 32px"
                />

                <span v-show="!isCollapsed" class="flex-1 block ml-2">
                  {{ $auth.user.name }}
                </span>
              </div>
            </span>

            <a-menu-item key="logout">Logout</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>

      <div :class="{ 'justify-center': isCollapsed }" class="mt-3 px-4 flex">
        <div>
          <a-switch v-model="switchTheme" />

          <span v-show="!isCollapsed">
            Màu:
            <span v-show="switchTheme">Tối</span>
            <span v-show="!switchTheme">Sáng</span>
          </span>
        </div>
      </div>

      <div
        :class="{ 'justify-center': isCollapsed }"
        class="h-10 flex items-center justify-start px-4"
      >
        <button @click="changeCollapsed">
          <a-icon
            :type="iconCollapsed"
            class="cursor-pointer text-base"
          ></a-icon>
        </button>
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import TheLogo from '@/components/templates/the-logo'
import { useCollapsed } from '@/composables'

export default defineComponent({
  name: 'TheSider',

  components: { TheLogo },

  setup() {
    return { ...useSwitchTheme(), ...useCollapsed() }
  },
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4'],
      openKeys: [],
    }
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))

      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    handleSelectMenuItem(item) {
      this.$router.push(item.key)
    },
    handleSelectMenuAccount({ key }) {
      if (key === 'logout') {
        return this.$auth.logout()
      }
    },
  },
})

const useSwitchTheme = () => {
  const switchTheme = ref(true)
  const theme = computed(() => {
    return switchTheme.value ? 'dark' : 'light'
  })

  return { theme, switchTheme }
}
</script>

<style scoped>
.the-sider.ant-layout-sider-dark {
  color: rgba(255, 255, 255, 0.65);
}

.the-sider ::v-deep .ant-layout-sider-children {
  @apply flex flex-col;
}

.the-sider ::v-deep .ant-switch {
  min-width: 36px;
}

.the-sider .the-menu {
  @apply flex-1 mt-4 overflow-hidden !important;
}

.the-sider .switch-theme {
  @apply w-full overflow-hidden;
  @apply flex-grow-0 flex-shrink-0 flex flex-col;
}

.the-sider
  .menu-account.ant-menu-inline-collapsed
  ::v-deep
  .ant-menu-submenu-title {
  padding: 0 24px !important;
}
</style>
