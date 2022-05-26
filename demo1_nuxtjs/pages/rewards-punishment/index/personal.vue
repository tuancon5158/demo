<template>
  <div class="p-4 space-y-4">
    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <base-tooltip :disabled="!filterStaff.branch_id" title="Đơn vị">
        <select-branch
          v-model="filterStaff.branch_id"
          allow-clear
          placeholder="Đơn vị"
        ></select-branch>
      </base-tooltip>

      <base-tooltip :disabled="!filterStaff.user_id" title="Nhân viên">
        <select-staff
          v-model="filterStaff.user_id"
          :branch-id="filterStaff.branch_id"
          allow-clear
          placeholder="Nhân viên"
        ></select-staff>
      </base-tooltip>

      <base-tooltip :disabled="!params.filter.type.length" title="Loại">
        <select-behavior-type
          v-model="params.filter.type"
          multiple
          placeholder="Loại hành vi"
        ></select-behavior-type>
      </base-tooltip>

      <base-tooltip
        :disabled="!params.filter.behavior_group_id.length"
        title="Nhóm hành vi"
      >
        <select-behavior-group
          v-model="params.filter.behavior_group_id"
          multiple
          placeholder="Nhóm hành vi"
        ></select-behavior-group>
      </base-tooltip>

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

      <a-month-picker placeholder="Chọn theo tháng" @change="onChangeMonth" />

      <select-service-status
        v-model="params.filter.status"
        multiple
      ></select-service-status>
    </div>

    <table-reward-punishment
      :loading="$fetchState.pending"
      :reward-punishments="rewardsPunishments"
      @fetch="fetch"
    ></table-reward-punishment>

    <div class="flex">
      <a-pagination
        v-model="params.cur_page"
        :page-size.sync="params.per_page"
        :total="total"
        show-size-changer
      />
    </div>

    <nuxt-child></nuxt-child>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRef,
  useFetch,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import SelectServiceStatus from '@select/select-service-status.vue'
import SelectStaff from '@select/select-staff.vue'
import SelectBranch from '@select/select-branch.vue'
import SelectBehaviorType from '@select/select-behavior-type.vue'
import SelectBehaviorGroup from '@select/select-behavior-group.vue'
import TableRewardPunishment from '@table/table-reward-punishment/personal.vue'
import { useDatePickerRange, useMonthPicker } from '@/composables'
import { useServiceRewardsPunishment } from '@/services'
import {
  IParamsRewardsPunishment,
  IRewardsPunishment,
} from '@/interfaces/rewardsPunishments'
import { parseQueryToArrayNumber } from '@/utils'

export default defineComponent({
  name: 'RewardsPunishment',

  components: {
    TableRewardPunishment,
    SelectBehaviorGroup,
    SelectBehaviorType,
    SelectBranch,
    SelectStaff,
    SelectServiceStatus,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsRewardsPunishment>({
      search: '',
      cur_page: 1,
      per_page: 10,
      filter: {
        type: [],
        user_id: [],
        branch_id: [],
        behavior_group_id: [],
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
      ...useFetchRewardsPunishments(params),
      ...useSetQueryToParams(params),
    }
  },
})

const useFetchRewardsPunishments = (params: IParamsRewardsPunishment) => {
  const { all } = useServiceRewardsPunishment()

  const rewardsPunishments = ref<IRewardsPunishment[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      rewardsPunishments.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { rewardsPunishments, total, fetch }
}

const useSetQueryToParams = (params: any) => {
  const route = useRoute()

  const filterStaff = reactive({
    user_id: undefined as number | undefined,
    branch_id: undefined as number | undefined,
  })

  watch(
    () => filterStaff.user_id,
    (value: number | undefined) => {
      if (!value) {
        params.filter.user_id = []
      } else {
        params.filter.user_id = [value]
      }
    }
  )

  const getQuery = () =>
    route.value.query as { [index: string]: string | undefined }

  const setQueryToParam = () => {
    const {
      user,
      status,
      type,
      department,
      branch,
      timeFrom,
      timeTo,
      behaviorGroup,
    } = getQuery()

    filterStaff.user_id = Number(user) || undefined
    filterStaff.branch_id = Number(branch) || undefined
    params.filter.status = parseQueryToArrayNumber(status)
    params.filter.dept_id = parseQueryToArrayNumber(department)
    params.filter.type = parseQueryToArrayNumber(type)
    params.filter.behaviorGroup = parseQueryToArrayNumber(behaviorGroup)
    params.filter.time_from = timeFrom || ''
    params.filter.time_to = timeTo || ''
  }

  watch(() => route.value.query, setQueryToParam, { immediate: true })

  return {
    filterStaff,
  }
}
</script>
