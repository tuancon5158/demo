<template>
  <div class="p-4 space-y-4">
    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <base-tooltip :disabled="!params.filter.branch_id.length" title="Đơn vị">
        <select-branch
          v-model="params.filter.branch_id"
          multiple
          placeholder="Đơn vị"
        ></select-branch>
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

      <a-month-picker placeholder="Chọn theo tháng" @change="onChangeMonth" />
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
  watch,
} from '@nuxtjs/composition-api'
import SelectServiceStatus from '@select/select-service-status.vue'
import SelectBranch from '@select/select-branch.vue'
import SelectBehaviorType from '@select/select-behavior-type.vue'
import SelectBehaviorGroup from '@select/select-behavior-group.vue'
import TableRewardPunishment from '@table/table-reward-punishment/company.vue'
import {
  useDatePickerRange,
  useMonthPicker,
  useSetQueryToParams,
} from '@/composables'
import { useServiceRewardsPunishment } from '@/services'
import {
  IParamsRewardsPunishment,
  IRewardsPunishment,
} from '@/interfaces/rewardsPunishments'

export default defineComponent({
  name: 'RewardsPunishment',

  components: {
    TableRewardPunishment,
    SelectBehaviorGroup,
    SelectBehaviorType,
    SelectBranch,
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
      ...useFetchRewardsPunishments(params),
      ...useMonthPicker(),
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
</script>
