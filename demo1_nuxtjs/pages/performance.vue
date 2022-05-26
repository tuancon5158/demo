<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <base-tooltip
          :disabled="!params.filter.user_id.length"
          title="Nhân viên"
        >
          <select-staff
            v-model="params.filter.user_id"
            multiple
            placeholder="Nhân viên"
          ></select-staff>
        </base-tooltip>

        <base-tooltip
          :disabled="!params.filter.branch_id.length"
          title="Đơn vị"
        >
          <select-branch
            v-model="params.filter.branch_id"
            multiple
            placeholder="Đơn vị"
          ></select-branch>
        </base-tooltip>

        <select-department
          v-model="params.filter.dept_id"
          multiple
        ></select-department>

        <select-service-status
          v-model="params.filter.status"
          multiple
        ></select-service-status>

        <base-datepicker
          v-model="params.filter.time_from"
          :disabled-date="disabledStartDate"
          placeholder="Thời gian bắt đầu"
          route-key="timeFrom"
          @openChange="handleStartOpenChange"
        ></base-datepicker>

        <base-datepicker
          v-model="params.filter.time_to"
          :disabled-date="disabledEndDate"
          :open="endOpen"
          placeholder="Thời gian kết thúc"
          route-key="timeTo"
          @openChange="handleEndOpenChange"
        ></base-datepicker>

        <a-month-picker
          placeholder="Chọn theo tháng"
          @change="onChangeMonth"
        ></a-month-picker>
      </div>

      <table-performance
        :loading="$fetchState.pending"
        :performances="performances"
      ></table-performance>

      <div class="flex justify-between items-center">
        <a-pagination
          v-model="params.cur_page"
          :page-size.sync="params.per_page"
          :total="total"
          show-size-changer
        />

        <div class="space-x-4">
          <span>Tổng tiền: {{ totalMoney | formatCurrency }}</span>
          <span>Tổng thưởng: {{ totalPoint }}</span>
        </div>
      </div>

      <nuxt-child></nuxt-child>
    </div>
  </section-layout-content>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRef,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'
import TablePerformance from '@table/table-perfomance/index.vue'
import SelectServiceStatus from '@select/select-service-status.vue'
import SelectStaff from '@select/select-staff.vue'
import SelectDepartment from '@select/select-department.vue'
import SelectBranch from '@select/select-branch.vue'
import {
  useDatePickerRange,
  useMonthPicker,
  useSetQueryToParams,
} from '@/composables'
import { useServicePerformance } from '@/services'
import { formatCurrency } from '@/utils'
import { IParamsPerformance, IPerformance } from '@/interfaces/performance'

export default defineComponent({
  name: 'Performance',

  components: {
    TablePerformance,
    SectionLayoutContent,
    SelectBranch,
    SelectDepartment,
    SelectStaff,
    SelectServiceStatus,
  },

  filters: { formatCurrency },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsPerformance>({
      search: '',
      cur_page: 1,
      per_page: 10,
      filter: {
        perf_policy_id: [],
        user_id: [],
        branch_id: [],
        dept_id: [],
        status: [],
        time_from: '',
        time_to: '',
      },
    })

    return {
      params,

      ...useDatePickerRange({
        startDate: toRef(params.filter, 'time_from'),
        endDate: toRef(params.filter, 'time_to'),
      }),
      ...useMonthPicker(),
      ...useSetQueryToParams(params),
      ...useLayoutContent(),
      ...useFetchPerformances(params),
    }
  },
})

const useFetchPerformances = (params: IParamsPerformance) => {
  const { all } = useServicePerformance()

  const performances = ref<IPerformance[]>([])
  const total = ref(0)

  const totalMoney = computed(() => {
    return performances.value.reduce((acc, performance) => {
      acc += performance.money

      return acc
    }, 0)
  })

  const totalPoint = computed(() => {
    return performances.value.reduce((acc, performance) => {
      acc += performance.points

      return acc
    }, 0)
  })

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      performances.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { performances, total, fetch, totalMoney, totalPoint }
}

const useLayoutContent = () => {
  const title = 'Chính sách hiệu suất'
  const breadcrumbs = ['Chính sách hiệu suất', 'Hiệu suất khối bán lẻ']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
