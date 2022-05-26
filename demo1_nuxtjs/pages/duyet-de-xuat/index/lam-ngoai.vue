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
      <select-area v-model="params.filter.area_id" allow-clear></select-area>

      <select-department
        v-model="params.filter.dept_id"
        allow-clear
      ></select-department>

      <select-service-status
        v-model="params.filter.status"
        allow-clear
      ></select-service-status>

      <select-date-range class="col-span-2"></select-date-range>

      <select-month></select-month>

      <select-date></select-date>
    </div>

    <h5>
      Tổng phiếu: {{ total }} phiếu / Tổng thời gian: {{ totalWorkHour }}h
    </h5>

    <table-outside
      :loading="$fetchState.pending"
      :outsides="outsides"
      @fetch="fetch"
    ></table-outside>

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
  watch,
} from '@nuxtjs/composition-api'
import defu from 'defu'
import TableOutside from '@table/table-outside/index.vue'
import SelectServiceStatus from '@select/select-service-status.vue'
import SelectArea from '@select/select-area.vue'
import SelectDepartment from '@select/select-department.vue'
import SelectDateRange from '@select/select-date-range.vue'
import SelectMonth from '@select/select-month.vue'
import SelectDate from '@select/select-date.vue'
import InputSearch from '@common/input-search.vue'
import { useSetQueryToParams } from '@/composables'
import { useServiceOutside } from '@/services'
import { OUTSIDE_TYPE } from '@/state'
import { forceArray } from '@/utils'
import { IOutside, IParamsOutside } from '@/interfaces/outside'

export default defineComponent({
  name: 'LamNgoai',

  components: {
    SelectArea,
    InputSearch,
    SelectDate,
    SelectMonth,
    SelectDateRange,
    TableOutside,
    SelectDepartment,
    SelectServiceStatus,
  },

  setup() {
    const params = reactive<IParamsOutside>({
      search: '',
      cur_page: 1,
      per_page: 10,
      filter: {
        user_id: undefined,
        dept_id: undefined,
        area_id: undefined,
        status: undefined,
        is_my_personnel: false,
        type: [],
        time_from: '',
        time_to: '',
      },
    })

    return {
      params,
      ...useFetchOutside(params),
      ...useSetQueryToParams(params),
    }
  },
})

const useFetchOutside = (params: IParamsOutside) => {
  const { all } = useServiceOutside()

  const outsides = ref<IOutside[]>([])
  const total = ref(0)
  const totalWorkHour = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const _params = defu(params, {
        filter: {
          type: [OUTSIDE_TYPE.OUTSIDE],
          user_id: forceArray(params.filter.user_id),
          dept_id: forceArray(params.filter.dept_id),
          area_id: forceArray(params.filter.area_id),
          status: forceArray(params.filter.status),
        },
      })

      const { data, meta } = await all(_params)

      outsides.value = data
      total.value = meta.total
      totalWorkHour.value = meta.total_work_hour || 0
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { outsides, total, totalWorkHour, fetch }
}
</script>
