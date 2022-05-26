<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <input-search
          v-model="params.search"
          placeholder="Tên chính sách"
        ></input-search>

        <base-tooltip :disabled="!params.filter.type.length" placement="top">
          <template slot="title">
            <span>Loại chính sách</span>
          </template>
          <select-policy-type
            v-model="params.filter.type"
            multiple
          ></select-policy-type>
        </base-tooltip>

        <base-tooltip
          :disabled="!params.filter.apply_for_account.length"
          placement="top"
        >
          <template slot="title">
            <span>Loại chính sách</span>
          </template>
          <select-apply-for-account
            v-model="params.filter.apply_for_account"
            multiple
          ></select-apply-for-account>
        </base-tooltip>

        <base-tooltip :disabled="!params.filter.status.length" placement="top">
          <template slot="title">
            <span>Trạng thái</span>
          </template>
          <select-status
            v-model="params.filter.status"
            multiple
            placeholder="Trạng thái"
          ></select-status>
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
      </div>

      <table-policy
        :loading="$fetchState.pending"
        :policies="policies"
      ></table-policy>

      <div class="flex">
        <a-pagination
          v-model="params.cur_page"
          :page-size.sync="params.per_page"
          :total="total"
          show-size-changer
        />
      </div>

      <a-affix class="absolute right-[16px] bottom-[16px]">
        <a-button
          icon="plus"
          shape="circle"
          size="large"
          type="primary"
          @click="$router.push('/policy/add')"
        ></a-button>
      </a-affix>

      <nuxt-child @fetch="fetch"></nuxt-child>
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
import SelectStatus from '@select/select-status.vue'
import SelectPolicyType from '@select/select-policy-type.vue'
import SectionLayoutContent from '@common/section-layout-content.vue'
import InputSearch from '@common/input-search.vue'
import SelectApplyForAccount from '@select/select-apply-for-account.vue'
import TablePolicy from '@table/table-policy/index.vue'
import {
  useDatePickerRange,
  useMonthPicker,
  useSetQueryToParams,
} from '@/composables'
import { useServicePolicy } from '@/services'
import { IParamsPolicy, IPolicy } from '@/interfaces/policy'

export default defineComponent({
  name: 'Policy',

  components: {
    TablePolicy,
    SelectApplyForAccount,
    InputSearch,
    SectionLayoutContent,
    SelectPolicyType,
    SelectStatus,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsPolicy>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        type: [],
        status: [],
        created_by_id: [],
        apply_for_account: [],
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
      ...useFetchPolicies(params),
      ...useSetQueryToParams(params),
      ...useLayoutContent(),
    }
  },
})

export const useFetchPolicies = (params: IParamsPolicy) => {
  const { all } = useServicePolicy()

  const policies = ref<IPolicy[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      policies.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { policies, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Chính sách hiệu suất'
  const breadcrumbs = ['Chính sách hiệu suất', 'Chính sách']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
