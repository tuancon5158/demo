<template>
  <div class="space-y-4 mt-8">
    <div
      class="grid gap-2 grid-cols-2 md:grid-cols-5 lg:grid-cols-9 items-center"
    >
      <input-search
        class="col-span-2"
        placeholder="Tên nhân sự, mã nhân sự..."
      ></input-search>

      <select-department
        placeholder="Phòng ban"
        allow-clear
        class="col-span-2"
      ></select-department>

      <select-income-amount-duration
        allow-clear
      ></select-income-amount-duration>

      <select-income-amount-type
        allow-clear
        class="col-span-2"
        placeholder="Nguồn khoản"
      ></select-income-amount-type>

      <checkbox-income-amount-status></checkbox-income-amount-status>
    </div>

    <div class="flex justify-between items-center">
      <h5 class="flex space-x-6">
        <span>Tổng: {{ total }} khoản</span>
        <span>
          Tiền dự kiến:
          <span v-currency="totalAdditionalAmount"></span>
          đ
        </span>
        <span>
          Tiền nghiệm thu:
          <span v-currency="totalApprovedAmount"></span>
          đ
        </span>
      </h5>

      <button-them-khoan></button-them-khoan>
    </div>

    <table-income-amount-approved
      type="APPROVED"
      :income-amounts="incomeAmounts"
      :loading="$fetchState.pending"
      :total="total"
      @fetch="fetch"
    ></table-income-amount-approved>

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
  watch,
  useRoute,
} from '@nuxtjs/composition-api'
import SelectDepartment from '@select/select-department.vue'
import InputSearch from '@common/input-search.vue'
import ButtonThemKhoan from '@page/thu-nhap-nhan-su/button-them-khoan.vue'
import SelectIncomeAmountDuration from '@select/select-income-amount-duration.vue'
import SelectIncomeAmountType from '@select/select-income-amount-type.vue'
import CheckboxIncomeAmountStatus from '@checkbox/checkbox-income-amount-status.vue'
import TableIncomeAmountApproved from '@/components/table/table-income-amount/table-income-amount-approved/table-income-amount-approved.vue'
import { useFetchIncomeAmountDetail } from '@/state'
import { IParamsIncomeAmount } from '@/interfaces/incomeAmount'
import { parseQueryToArrayNumber } from '@/utils'

export default defineComponent({
  name: 'DaDuyet',

  components: {
    CheckboxIncomeAmountStatus,
    SelectIncomeAmountType,
    SelectIncomeAmountDuration,
    TableIncomeAmountApproved,
    ButtonThemKhoan,
    InputSearch,
    SelectDepartment,
  },

  setup() {
    const params = reactive<IParamsIncomeAmount>({
      per_page: 10,
      cur_page: 1,
      search: '',
      filter: {
        duration: [],
        dept_id: [],
        type_id: [],
        status: [],
        stage: ['APPROVED'],
      },
    })

    return {
      params,
      ...params,
      ...useSetQueryToParams(params),
      ...useFetchIncomeAmountDetail(params),
    }
  },
})
const useSetQueryToParams = (params: IParamsIncomeAmount) => {
  const route = useRoute()

  const getQuery = () =>
    route.value.query as { [index: string]: string | undefined }

  const setQueryToParam = () => {
    const { search, dept_id, duration, type_id, status } = getQuery()

    params.search = search || ''
    params.filter.duration = parseQueryToArrayNumber(duration)
    params.filter.dept_id = parseQueryToArrayNumber(dept_id)
    params.filter.type_id = parseQueryToArrayNumber(type_id)
    params.cur_page = 1

    if (status === undefined) {
      params.filter.status = ['APPROVED', 'REJECTED']
    } else {
      params.filter.status = status.split(',')
    }
  }

  watch(() => route.value.query, setQueryToParam, { immediate: true })

  return {}
}
</script>
