<template>
  <div>
    <div
      v-if="count !== 0"
      class="
        grid
        gap-2
        grid-cols-2
        md:grid-cols-5
        lg:grid-cols-9
        items-center
        mb-4
        border border-primary-2
        bg-primary-2
      "
    >
      <div class="col-span-7 ml-4 font-bold text-xd">
        {{ count }}/{{ total }} - Tiền dự kiến:
        <span v-currency="totalPaymentSelect"></span>
        <span class="ml-1">₫</span>
        - Tiền nghiệm thu:
        <span v-currency="totalPaymentFutureSelect"></span>
        <span class="ml-1">₫</span>
      </div>

      <button-decline-all
        :count="count"
        :total-payment-select="totalPaymentSelect"
        :total-payment-future-select="totalPaymentFutureSelect"
        :filtered-approved-amounts="filteredApprovedAmounts"
        @fetch="handleOnSuccess"
      ></button-decline-all>

      <button-accept-all
        :count="count"
        :total-payment-select="totalPaymentSelect"
        :total-payment-future-select="totalPaymentFutureSelect"
        :filtered-approved-amounts="filteredApprovedAmounts"
        @fetch="handleOnSuccess"
      ></button-accept-all>
    </div>
    <a-table
      v-if="type !== 'READY_FOR_PAY'"
      :columns="type !== 'APPROVED' ? columns : columnsApproved"
      :data-source="items"
      :row-selection="rowSelection"
      :loading="loading"
      :pagination="false"
      :scroll="{ y: 1800 }"
      row-key="id"
    >
      <template #action="_, item">
        <button-details
          :item="item"
          :type="type"
          @fetch="handleOnSuccess"
        ></button-details>
      </template>

      <template #status="_, item">
        <section-status :status="item.status"></section-status>
      </template>

      <template #name="_, item">
        <p>{{ item.user.name }} - {{ item.user.id }}</p>
      </template>

      <template #approved_amount="_, item">
        <p>{{ item.approved_amount }} ₫</p>
      </template>

      <template #additional_amount="_, item">
        <p>{{ item.additional_amount }} ₫</p>
      </template>

      <template #checkbox>
        <a-checkbox @change="onChange"></a-checkbox>
      </template>
    </a-table>

    <a-table
      v-else
      :columns="columnsPay"
      :data-source="items"
      :loading="loading"
      :pagination="false"
      :scroll="{ y: 1800 }"
      row-key="id"
    >
      <template #action="_, item">
        <button-details
          :item="item"
          type="READY_FOR_PAY"
          @fetch="handleOnSuccess"
        ></button-details>
      </template>

      <template #name="_, item">
        <p>{{ item.user.name }} - {{ item.user.id }}</p>
      </template>

      <template #additional_amount="_, item">
        <p>{{ item.additional_amount }} ₫</p>
      </template>
      <template #approved_amount="_, item">
        <p>{{ item.approved_amount }} ₫</p>
      </template>
      <template #timeApproved="_, item">
        <p>{{ dayjs(item.approved_at).format('DD/MM/YYYY') }}</p>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import ButtonDetails from '@table/table-income-amount/button-details.vue'
import ButtonAcceptAll from '@table/table-income-amount/button-accept-all.vue'
import ButtonDeclineAll from '@table/table-income-amount/button-decline-all.vue'
import SectionStatus from '@table/table-duyet-de-xuat/section-status.vue'
import dayjs from 'dayjs'
import { sum } from '@vt7/utils'
import { E_Duration } from '@/enums/incomeAmount'
import { useSizeTable } from '@/composables'
import { formatCurrency } from '@/utils'
import {
  IIncomeAmountNew,
  IIncomeAmountDetail,
} from '@/interfaces/incomeAmountDetail'
export default defineComponent({
  name: 'TableIncomeAmount',
  components: {
    ButtonDetails,
    ButtonAcceptAll,
    ButtonDeclineAll,
    SectionStatus,
  },
  props: {
    type: {
      type: String,
      default: undefined,
    },
    incomeAmounts: {
      type: Array as PropType<IIncomeAmountNew[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
    total: { type: Number, default: 0 },
  },

  setup(props, { emit }) {
    const totalSelect = ref<number[]>([])
    const totalPaymentSelect = ref(0)
    const totalPaymentFutureSelect = ref(0)
    const filteredApprovedAmounts = ref<IIncomeAmountDetail[]>([])
    const count = ref(0)

    const rowSelection = computed(() => {
      return {
        onChange: (
          selectedRowKeys: number[],
          selectedRows: IIncomeAmountDetail[]
        ) => {
          totalSelect.value = selectedRowKeys
          count.value = totalSelect.value.length

          totalPaymentSelect.value = sum(selectedRows, item => {
            return Number(item.additional_amount_same_format)
          })

          totalPaymentFutureSelect.value = sum(selectedRows, item => {
            return Number(item.approved_amount_same_format)
          })

          filteredApprovedAmounts.value = selectedRows
        },
      }
    })

    const items = computed(() => {
      return props.incomeAmounts?.map(item => {
        return {
          ...item,
          kykhoan: kyKhoanFormat(item),
          additional_amount: formatCurrency(item.additional_amount),
          approved_amount: formatCurrency(Number(item.approved_amount)),
          additional_amount_same_format: item.additional_amount,
          approved_amount_same_format: item.approved_amount,
        }
      })
    })

    const handleOnSuccess = () => {
      emit('fetch')
      count.value = 0
      totalPaymentSelect.value = 0
      totalPaymentFutureSelect.value = 0
      filteredApprovedAmounts.value = []
    }

    return {
      columns,
      columnsPay,
      columnsApproved,
      items,
      dayjs,
      totalSelect,
      count,
      totalPaymentSelect,
      filteredApprovedAmounts,
      totalPaymentFutureSelect,
      rowSelection,
      handleOnSuccess,
      ...useSizeTable(),
    }
  },
})

// ts later
const kyKhoanFormat = (item: IIncomeAmountNew) => {
  if (item.duration === E_Duration.Month) {
    return `Tháng ${item.month}/${item.year}`
  }

  if (item.duration === E_Duration.Quarter) {
    return `Quý ${item.quarter}/${item.year}`
  }

  return `Năm ${item.year}`
}
// table
const columns = [
  {
    title: 'ID Khoản',
    dataIndex: 'id',
    width: 30,
  },
  {
    title: 'Tên nhân sự',
    width: 40,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Kỳ khoản',
    dataIndex: 'kykhoan',
    width: 30,
  },
  {
    title: 'Tên khoản',
    dataIndex: 'name',
    width: 30,
  },
  {
    title: 'Tiền dự kiến',
    width: 40,
    dataIndex: 'additional_amount',
    scopedSlots: { customRender: 'additional_amount' },
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department.name',
    width: 30,
  },
  {
    title: 'Phản hồi',
    dataIndex: 'discussion.message',
    width: 30,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 30,
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 40,
  },
]
const columnsApproved = [
  {
    title: 'ID Khoản',
    dataIndex: 'id',
    width: 30,
  },
  {
    title: 'Tên nhân sự',
    width: 40,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Kỳ khoản',
    dataIndex: 'kykhoan',
    width: 30,
  },
  {
    title: 'Tên khoản',
    dataIndex: 'name',
    width: 35,
  },
  {
    title: 'Tiền nghiệm thu',
    width: 45,
    dataIndex: 'approved_amount',
    scopedSlots: { customRender: 'approved_amount' },
  },
  {
    title: 'Tiền dự kiến',
    width: 40,
    dataIndex: 'additional_amount',
    scopedSlots: { customRender: 'additional_amount' },
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department.name',
    width: 30,
  },
  {
    title: 'Phản hồi',
    dataIndex: 'discussion.message',
    width: 25,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 30,
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 30,
  },
]
const columnsPay = [
  {
    title: 'T.g nghiệm thu',
    dataIndex: 'approved_at',
    scopedSlots: { customRender: 'timeApproved' },
    width: 40,
  },
  {
    title: 'ID Khoản',
    dataIndex: 'id',
    width: 30,
  },
  {
    title: 'Tên nhân sự',
    width: 40,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Kỳ khoản',
    dataIndex: 'kykhoan',
    width: 30,
  },
  {
    title: 'Tên khoản',
    dataIndex: 'name',
    width: 35,
  },
  {
    title: 'Tiền nghiệm thu',
    width: 45,
    dataIndex: 'approved_amount',
    scopedSlots: { customRender: 'approved_amount' },
  },
  {
    title: 'Tiền dự kiến',
    width: 40,
    dataIndex: 'additional_amount',
    scopedSlots: { customRender: 'additional_amount' },
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department.name',
    width: 35,
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 35,
  },
]
</script>
