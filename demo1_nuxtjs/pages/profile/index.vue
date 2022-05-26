<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-2 sm:grid-cols-5">
        <div>
          <a-card>
            <a-card-meta>
              <a-icon slot="avatar" type="user" :style="{ fontSize: '30px' }" />
              <div slot="title" class="font-semibold text-xs">Tổng nhân sự</div>
              <a-statistic
                slot="description"
                title="Người"
                :value="totalStaff"
              />
            </a-card-meta>
          </a-card>
        </div>
        <div class="col-span-2">
          <a-card>
            <a-card-meta>
              <a-icon slot="avatar" type="flag" :style="{ fontSize: '30px' }" />
              <div slot="title" class="font-semibold text-xs">Chi tiết</div>
              <div slot="description" class="flex justify-around">
                <a-statistic title="Chính thức" :value="chinh_thuc" />
                <a-statistic title="Thử việc" :value="thu_viec" />
                <a-statistic title="Học việc" :value="tap_su" />
                <a-statistic title="Freelancer" :value="freelancer" />
              </div>
            </a-card-meta>
          </a-card>
        </div>
        <div>
          <a-card>
            <a-card-meta>
              <a-icon
                slot="avatar"
                type="usergroup-add"
                :style="{ fontSize: '30px' }"
              />
              <div slot="title" class="font-semibold text-xs">Nhân sự mới</div>
              <a-statistic
                slot="description"
                title="Người"
                :value="nhan_su_moi"
              />
            </a-card-meta>
          </a-card>
        </div>
        <div>
          <a-card>
            <a-card-meta>
              <a-icon
                slot="avatar"
                type="arrow-right"
                :style="{ fontSize: '30px' }"
              />
              <div slot="title" class="font-semibold text-xs">Nghỉ việc</div>
              <a-statistic
                slot="description"
                title="Người"
                :value="nghi_viec"
              />
            </a-card-meta>
          </a-card>
        </div>
      </div>
    </div>

    <div class="p-4 space-y-4">
      <div class="flex">
        <a-tabs v-model="workStatusId">
          <a-tab-pane
            v-for="item in listWorkStatusParent"
            :key="item.value"
            :tab="item.label"
          ></a-tab-pane>
        </a-tabs>
      </div>

      <div class="grid gap-2 grid-cols-16 sm:grid-cols-9">
        <div class="col-span-2">
          <input-search
            v-model="dataProfileParams.search"
            class="w-full"
            placeholder="Tên nhân sự, mã nhân sự"
          ></input-search>
        </div>
        <div class="col-span-2">
          <select-orientation
            v-model="dataProfileParams.filter.title_id"
            multiple
            class="w-full"
            show-arrow
          ></select-orientation>
        </div>

        <div class="col-span-2">
          <select-department
            v-model="dataProfileParams.filter.dept_id"
            show-arrow
            :max-tag-count="1"
            class="w-full"
            placeholder="Tên đơn vị"
            multiple
          ></select-department>
        </div>

        <div class="col-span-1">
          <a-select
            ref="workStatusChildE"
            v-model="workStatusChildId"
            show-arrow
            :options="workStatusChild"
            allow-clear
            class="w-full"
            placeholder="Trạng thái chi tiết"
          ></a-select>
        </div>
        <base-datepicker
          v-model="dataProfileParams.filter.time_from"
          placeholder="Thời gian bắt đầu"
          route-key="timeFrom"
        ></base-datepicker>

        <base-datepicker
          v-model="dataProfileParams.filter.time_to"
          placeholder="Thời gian kết thúc"
          route-key="timeTo"
        ></base-datepicker>
      </div>
      <div class="flex">
        <div class="font-semibold">
          Danh sách:
          <span v-if="dataProfileParams.filter.work_status_id == 1">
            Đang làm việc
          </span>
          <span v-if="dataProfileParams.filter.work_status_id == 2">
            Tạm dừng công việc
          </span>
          <span v-if="dataProfileParams.filter.work_status_id == 3">
            Đã nghỉ việc
          </span>
        </div>
        <div class="ml-4 font-semibold">Tổng: {{ total }} nhân sự</div>
        <div class="ml-auto">
          <a-button
            icon="plus"
            type="primary"
            @click="$router.push('/profile/add')"
          >
            Tạo mới nhân sự
          </a-button>
        </div>
      </div>
      <table-profile
        :loading="$fetchState.pending"
        :profiles="profiles"
      ></table-profile>

      <div class="flex justify-end">
        <a-pagination
          v-model="dataProfileParams.cur_page"
          :page-size.sync="dataProfileParams.per_page"
          :total="total"
          show-size-changer
        />
      </div>
    </div>
  </section-layout-content>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  useFetch,
  watch,
  toRefs,
} from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'
import TableProfile from '@table/table-profile/index.vue'
import SelectDepartment from '@select/select-department.vue'
import SelectOrientation from '@select/select-orientation.vue'
import InputSearch from '@common/input-search.vue'
import { useSetQueryToParams } from '@/composables'
import { useGetterWorkStatus, useWorkStatuses } from '@/state'
import { IParamsProfile } from '@/interfaces/profile'
import { useServiceProfile } from '@/services'
import {
  E_DASHBOARD_STATUS,
  E_DASHBOARD_STATUS_THIS_MONTH,
} from '@/enums/profile'
export default defineComponent({
  name: 'Profile',
  components: {
    SectionLayoutContent,
    InputSearch,
    TableProfile,
    SelectDepartment,
    SelectOrientation,
  },

  setup() {
    const dataProfileParams = reactive({
      per_page: 10,
      cur_page: 1,
      search: '',
      filter: {
        area_id: [],
        work_status_id: 1,
        work_status_child_id: null,
        dept_id: [],
        time_from: '',
        time_to: '',
      },
      sort: {
        name: 'DESC',
        id: 'DESC',
      },
    })

    return {
      dataProfileParams,
      ...useFetchProfiles(dataProfileParams),
      ...useHandleWorkStatus(dataProfileParams),
      ...useLayoutContent(),
      ...useSetQueryToParams(dataProfileParams),
      ...useLoadInfoDashboard(),
    }
  },
})

const useLoadInfoDashboard = () => {
  const dashboard = reactive({
    totalStaff: 0,
    statusThisMonth: {} as Record<string, any>,
    status: {} as Record<string, any>,
  })

  const dang_lam_viec = computed(
    () => dashboard.status[E_DASHBOARD_STATUS.DANG_LAM_VIEC]
  )
  const tam_dung_cong_viec = computed(
    () => dashboard.status[E_DASHBOARD_STATUS.TAM_DUNG_CONG_VIEC]
  )
  const da_nghi_viec = computed(
    () => dashboard.status[E_DASHBOARD_STATUS.DA_NGHI_VIEC]
  )
  const tap_su = computed(() => dashboard.status[E_DASHBOARD_STATUS.TAP_SU])
  const thu_viec = computed(() => dashboard.status[E_DASHBOARD_STATUS.THU_VIEC])
  const chinh_thuc = computed(
    () => dashboard.status[E_DASHBOARD_STATUS.CHINH_THUC]
  )
  const freelancer = computed(
    () => dashboard.status[E_DASHBOARD_STATUS.FREELANCER]
  )
  const nhan_su_moi = computed(
    () => dashboard.statusThisMonth[E_DASHBOARD_STATUS_THIS_MONTH.CHINH_THUC]
  )
  const nghi_viec = computed(
    () => dashboard.statusThisMonth[E_DASHBOARD_STATUS_THIS_MONTH.DA_NGHI_VIEC]
  )
  const fetchInit = async () => {
    const { getDashboard } = useServiceProfile()

    try {
      const {
        data: { total_staff, status, this_month },
      } = await getDashboard()

      dashboard.totalStaff = total_staff
      dashboard.statusThisMonth = this_month
      dashboard.status = status
    } catch (e) {
      console.log({ e })
    }
  }

  fetchInit()

  return {
    ...toRefs(dashboard),
    chinh_thuc,
    dang_lam_viec,
    tam_dung_cong_viec,
    da_nghi_viec,
    tap_su,
    thu_viec,
    freelancer,
    nhan_su_moi,
    nghi_viec,
  }
}

const useHandleWorkStatus = (params: IParamsProfile) => {
  const workStatusChildE = ref()
  const { workStatusId, workStatusChildId, workStatusParent, workStatusChild } =
    useGetterWorkStatus()

  const listWorkStatusParent = computed(() => {
    return workStatusParent.value.reverse()
  })

  const { findWorkStatus } = useWorkStatuses()

  watch(workStatusId, (value: number | undefined) => {
    if (!value) return (params.filter.work_status_id = 0)

    params.filter.work_status_id = value
    console.log('test', workStatusChildE.value)
  })

  watch(workStatusChildId, (value: number | undefined) => {
    if (value) {
      params.filter.work_status_child_id = value
    }
  })

  onMounted(() => {
    if (params.filter.work_status_id) {
      const initWorkStatusId = params.filter.work_status_id

      const initWorkStatus = findWorkStatus(initWorkStatusId)

      if (!initWorkStatus) return

      if (initWorkStatus.parent_id) {
        workStatusChildId.value = initWorkStatus.id
        workStatusId.value = initWorkStatus.parent_id
      } else {
        workStatusId.value = initWorkStatus.id
      }
    }
  })

  return {
    listWorkStatusParent,
    workStatusId,
    workStatusParent,
    workStatusChild,
    workStatusChildId,
  }
}

export const useFetchProfiles = (params: IParamsProfile) => {
  const { getListProfile } = useServiceProfile()

  const profiles = ref<any>([])
  const total = ref(0)
  const { fetch } = useFetch(async () => {
    try {
      const { data } = await getListProfile(params)

      profiles.value = data.staffs
      total.value = data.meta_data.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { profiles, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Nhân sự'
  const breadcrumbs = ['Tổ chức', 'Nhân sự']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
