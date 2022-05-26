<template>
  <div class="p-4 space-y-4">
    <div class="flex justify-between">
      <div class="w-1/3 flex items-center space-x-4">
        <input-search v-model="params.search" class="flex-1"></input-search>

        <a-checkbox v-model="params.filter.is_my_personnel">
          Nhân sự của tôi
        </a-checkbox>
      </div>
    </div>

    <div
      class="
        grid
        gap-2
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4
        lg:grid-cols-7
      "
    >
      <select-area allow-clear></select-area>

      <select-department allow-clear></select-department>

      <select-service-status allow-clear></select-service-status>

      <select-date-range class="col-span-2"></select-date-range>

      <select-month></select-month>

      <select-date></select-date>
    </div>

    <h5>
      Tổng phiếu: {{ total }} phiếu / Tổng thời gian: {{ totalWorkHour }}h
    </h5>

    <table-overtime
      :loading="$fetchState.pending"
      :overtimes="overtimes"
      @fetch="fetch"
    ></table-overtime>

    <div class="flex justify-end">
      <a-pagination
        v-model="params.cur_page"
        :page-size.sync="params.per_page"
        :total="total"
        show-size-changer
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useFetch,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import TableOvertime from '@table/table-overtime/index.vue'
import SelectServiceStatus from '@select/select-service-status.vue'
import SelectDepartment from '@select/select-department.vue'
import SelectArea from '@select/select-area.vue'
import SelectDateRange from '@select/select-date-range.vue'
import SelectMonth from '@select/select-month.vue'
import SelectDate from '@select/select-date.vue'
import InputSearch from '@common/input-search.vue'
import { useServiceOvertime } from '@/services'
import { parseQueryToArrayNumber } from '@/utils'
import { IOvertime, IParamsOvertime } from '@/interfaces/overtime'

export default defineComponent({
  name: 'DangKyLamThem',

  components: {
    SelectArea,
    InputSearch,
    SelectDate,
    SelectMonth,
    SelectDateRange,
    TableOvertime,
    SelectDepartment,
    SelectServiceStatus,
  },

  setup() {
    const params = reactive<IParamsOvertime>({
      search: '',
      cur_page: 1,
      per_page: 10,
      filter: {
        user_id: undefined,
        dept_id: undefined,
        area_id: undefined,
        status: undefined,
        is_my_personnel: false,
        time_from: '',
        time_to: '',
      },
    })

    return {
      params,
      ...useFetchOvertime(params),
      ...useSetQueryToParams(params),
    }
  },
})

const useSetQueryToParams = (params: IParamsOvertime) => {
  const route = useRoute()

  const getQuery = () =>
    route.value.query as { [index: string]: string | undefined }

  const setQueryToParam = () => {
    const { search, user_id, status, area_id, dept_id, timeFrom, timeTo } =
      getQuery()

    params.search = search || ''
    params.filter.area_id = parseQueryToArrayNumber(area_id)
    params.filter.user_id = parseQueryToArrayNumber(user_id)
    params.filter.dept_id = parseQueryToArrayNumber(dept_id)
    params.filter.status = parseQueryToArrayNumber(status)
    console.log(params.filter.status)
    params.filter.time_from = timeFrom
    params.filter.time_to = timeTo
  }

  watch(() => route.value.query, setQueryToParam, { immediate: true })

  return {}
}

const useFetchOvertime = (params: IParamsOvertime) => {
  const { all } = useServiceOvertime()

  const overtimes = ref<IOvertime[]>([])
  const total = ref(0)
  const totalWorkHour = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      overtimes.value = data
      total.value = meta.total
      totalWorkHour.value = meta.total_work_hour || 0
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { overtimes, total, totalWorkHour, fetch }
}
</script>
