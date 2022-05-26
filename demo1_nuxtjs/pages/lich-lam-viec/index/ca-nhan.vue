<template>
  <div class="p-4 space-y-4">
    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <select-staff
        v-model="params.filter.user_id[0]"
        :area-id="filterStaff.area_id"
        :branch-id="filterStaff.branch_id"
      ></select-staff>

      <base-tooltip :disabled="!filterStaff.area_id" title="Khu vực">
        <select-area v-model="filterStaff.area_id" allow-clear></select-area>
      </base-tooltip>

      <base-tooltip :disabled="!filterStaff.branch_id" title="Chi nhánh">
        <select-branch
          v-model="filterStaff.branch_id"
          allow-clear
        ></select-branch>
      </base-tooltip>

      <base-tooltip :disabled="!params.filter.time_from" title="Ngày bắt đầu">
        <base-datepicker
          v-model="params.filter.time_from"
          :disabled-date="disabledStartDate"
          placeholder="Ngày bắt đầu"
          route-key="timeFrom"
          size="default"
          @openChange="handleStartOpenChange"
        ></base-datepicker>
      </base-tooltip>

      <base-tooltip :disabled="!params.filter.time_to" title="Ngày kết thúc">
        <base-datepicker
          v-model="params.filter.time_to"
          :disabled-date="disabledEndDate"
          :open="endOpen"
          placeholder="Ngày kết thúc"
          route-key="timeTo"
          size="default"
          @openChange="handleEndOpenChange"
        ></base-datepicker>
      </base-tooltip>
    </div>

    <table-date-block-personal
      :dateblocks="dateBlocks"
      :loading="$fetchState.pending"
    ></table-date-block-personal>

    <nuxt-child @fetch="fetch"></nuxt-child>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRef,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import SelectArea from '@select/select-area.vue'
import SelectBranch from '@select/select-branch.vue'
import SelectStaff from '@select/select-staff.vue'
import TableDateBlockPersonal from '@table/table-date-block/personal.vue'
import { useDatePickerRange, useAuth, useConfig } from '@/composables'
import { useFetchDateBlock } from '@/state'
import { IParamsDateBlock } from '@/interfaces/dateBlock'
import { parseQueryToArrayNumber } from '@/utils'

export default defineComponent({
  name: 'DateBlockPersonal',

  components: {
    TableDateBlockPersonal,
    SelectStaff,
    SelectBranch,
    SelectArea,
  },

  setup() {
    const params = reactive<IParamsDateBlock>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        time_from: '',
        time_to: '',
        area_id: [],
        user_id: [],
        branch_id: [],
        block_type_id: [],
      },
      view_mode: 'personal',
    })

    const filterStaff = reactive({
      area_id: undefined,
      branch_id: undefined,
    })

    return {
      params,
      filterStaff,

      ...useDatePickerRange({
        startDate: toRef(params.filter, 'time_from'),
        endDate: toRef(params.filter, 'time_to'),
      }),

      ...useFetchDateBlock(params),
      ...useSetQueryToParams(params),
    }
  },
})

const useSetQueryToParams = (params: IParamsDateBlock) => {
  const route = useRoute()
  const config = useConfig()
  const { user: currentUser } = useAuth()

  const getQuery = () =>
    route.value.query as { [index: string]: string | undefined }

  const setQueryToParam = () => {
    const { search, user, area, branch, timeFrom, timeTo } = getQuery()

    params.search = search || ''
    params.filter.user_id = [Number(user) || currentUser.id]
    params.filter.area_id = parseQueryToArrayNumber(area)
    params.filter.branch_id = parseQueryToArrayNumber(branch)
    params.filter.time_from =
      timeFrom || dayjs().startOf('month').format(config.dateFormat)
    params.filter.time_to =
      timeTo || dayjs().endOf('month').format(config.dateFormat)
  }

  watch(() => route.value.query, setQueryToParam, { immediate: true })

  return {}
}
</script>
