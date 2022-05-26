<template>
  <section-layout-content v-bind="content">
    <a-dropdown style="position: absolute; right: 20px; top: 80px">
      <a-button style="margin-left: 8px" @click="handleButtonClick">
        Sửa trạng thái làm việc
        <a-icon type="down" />
      </a-button>

      <a-menu v-if="user" slot="overlay" @click="handleMenuClick">
        <a-menu-item v-if="isPause" key="pause">Tạm dừng công việc</a-menu-item>
        <a-menu-item v-if="isEnd" key="end">Nhân viên nghỉ việc</a-menu-item>
        <a-menu-item v-if="isReturn" key="return">
          Quay lại công tác
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <nuxt-child></nuxt-child>
    <a-modal
      v-model="visible"
      :title="title"
      :after-close="back"
      centered
      width="800px"
      @ok="handleSubmit"
    >
      <form-change-work-status
        v-if="visible"
        ref="formRef"
        v-model="formModel"
        :type="type"
        @submit="handleSubmit"
      ></form-change-work-status>

      <template slot="footer">
        <a-button key="back" @click="visible = false">Huỷ bỏ</a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">
          Xác nhận
        </a-button>
      </template>
    </a-modal>
  </section-layout-content>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  reactive,
  toRefs,
  ref,
  useAsync,
} from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'
import FormChangeWorkStatus from '@/components/form/form-change-work-status.vue'
import { useServiceProfile } from '@/services'
import { useNotification } from '@/composables'

export default defineComponent({
  name: 'ProfileUpdate',

  components: {
    SectionLayoutContent,
    FormChangeWorkStatus,
  },

  setup() {
    return {
      ...useLayoutContent(),
    }
  },
})

const useLayoutContent = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)
  const state = reactive({
    visible: false,
    title: `Chi tiết tạm dừng công việc`,
    type: `pause`,
  })
  const { updateWorkStatusLog } = useServiceProfile()
  const { user } = useFetchDetailProfile()

  const isPause = computed(
    () => user && user.value?.work_status_parent_detail === `Đang làm việc`
  )

  const isEnd = computed(
    () =>
      user &&
      (user.value?.work_status_parent_detail === `Đang làm việc` ||
        user.value?.work_status_parent_detail === `Tạm dừng công việc`)
  )

  const isReturn = computed(
    () => user && user.value?.work_status_parent_detail === `Đã nghỉ việc`
  )

  const { error, success } = useNotification()

  const formModel = ref<any>({
    profile_id: user?.value?.profile_id,
    work_status_id: undefined,
    start_at: '',
    end_at: '',
    reason: '',
  })

  const title = 'Nhân sự'
  const breadcrumbs = ['Tổ chức', 'Nhân sự']
  const tabs = computed(() => {
    return [
      { label: 'Thông tin nhân sự', href: `/profile/${id}/nhan-su` },
      { label: 'Thông tin công việc', href: `/profile/${id}/cong-viec` },
      { label: 'Đãi ngộ cá nhân', href: `/profile/${id}/dai-ngo-ca-nhan` },
      {
        label: 'Tài khoản ngân hàng',
        href: `/profile/${id}/tai-khoan-ngan-hang`,
      },
    ]
  })

  const reset = () => {
    formModel.value.profile_id = user?.value?.profile_id
    formModel.value.work_status_id = undefined
    formModel.value.start_at = undefined
    formModel.value.end_at = undefined
    formModel.value.reason = ``
  }
  const back = () => {
    reset()
  }

  const handleSubmit = async () => {
    try {
      formModel.value.profile_id = user?.value?.profile_id

      const res = await updateWorkStatusLog(formModel.value)

      success('Cập nhật profile thành công')

      console.log(`submit`, res, formModel)
      state.visible = false
      reset()
      //
    } catch (e) {
      if (e === false) return

      error(e?.data.message || 'Vui lòng thử lại')
    }
  }

  const handleButtonClick = (e: any) => {
    console.log('click left button', e)
  }

  const handleMenuClick = (e: any) => {
    state.type = e.key

    console.log(`e.key`, state.type)

    if (e.key === `pause`) {
      state.title = `Chi tiết tạm dừng công việc`
    }

    if (e.key === `end`) {
      state.title = `Chi tiết nghỉ  việc`
    }

    if (e.key === `return`) {
      state.title = `Chi tiết dang làm việc`
    }

    state.visible = true
  }

  const content = computed(() => {
    return { breadcrumbs, title, tabs: tabs.value }
  })

  return {
    isPause,
    isEnd,
    isReturn,
    back,
    user,
    handleSubmit,
    ...toRefs(state),
    content,
    formModel,
    handleButtonClick,
    handleMenuClick,
  }
}

export const useFetchDetailProfile = () => {
  const { get } = useServiceProfile()
  const route = useRoute()
  const id = Number(route.value.params.id)

  const user = useAsync(async () => {
    try {
      const res = await get(id)

      const user = res.data.user

      return {
        user_id: user.user_id,
        profile_id: user.profile_id,
        branch_id: user.branch_id || '',
        is_treasurer: user.is_treasurer,
        document: user.document,
        titles: user.titles,
        direct_manager_id: user.direct_manager_id,
        work_status_parent_detail: user?.work_status_parent_detail,
        labor_contracts_files: user.labor_contracts_files || [],
      }
    } catch (e) {
      console.log({ e })
    }
  })

  return { user, fetch }
}
</script>
