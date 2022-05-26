<template>
  <a-table
    ref="table"
    :columns="columns"
    :data-source="dataSource"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1600 }"
    row-key="id"
  >
    <template #latest_update="latest_update, item">
      <history-update v-if="latest_update" :item="item"></history-update>
    </template>
    <template #attached_files="attached_files">
      <div v-if="attached_files">
        <div
          v-for="(attached_file, key) in attached_files"
          :key="key"
          class="text-blue-400 hover:underline cursor-pointer"
          @click="onOpenAttachedFile(attached_file)"
        >
          {{ getTruncateFileName(attached_file) }}
        </div>
      </div>
    </template>
    <template #status="status">
      <badge-status v-if="status" :date="date" :status="status"></badge-status>
    </template>
    <template #action="_, item, index">
      <div v-if="index + 1 !== dataSource.length" class="flex space-x-2">
        <button-approve :item="item" @done="$emit('fetch')"></button-approve>

        <modal-update :item="item" @done="$emit('fetch')"></modal-update>
      </div>
    </template>

    <template #footer>
      <modal-them-khoan
        :month="params.filter.month"
        :user-id="params.filter.user_id"
        :year="params.filter.year"
        @done="$emit('fetch')"
      ></modal-them-khoan>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import BadgeStatus from '@table/table-income-amount-personal/badge-status.vue'
import HistoryUpdate from '@table/table-income-amount-personal/history-update.vue'
import ModalThemKhoan from '@table/table-income-amount-personal/modal-them-khoan.vue'
import ModalUpdate from '@table/table-income-amount-personal/modal-update.vue'
import ButtonApprove from '@table/table-income-amount-personal/button-approve.vue'
import { useSizeTable } from '@/composables'
import { formatCurrency, getTruncateFileName } from '@/utils'
import { IIncomeAmountDetail } from '@/interfaces/incomeAmountDetail'

export default defineComponent({
  name: 'TableIncomeAmountPersonal',

  components: {
    ButtonApprove,
    ModalThemKhoan,
    HistoryUpdate,
    BadgeStatus,
    ModalUpdate,
  },

  filters: { formatCurrency },

  props: {
    loading: { type: Boolean, default: false },
    items: {
      type: Array as PropType<IIncomeAmountDetail[]>,
      default: () => [],
    },
    params: { type: Object, default: () => ({}) },
    date: { type: Object, default: () => ({}) },
  },

  setup(props) {
    const dataSource = computed(() => {
      return props.items?.map(item => ({
        ...item,
        typeName:
          item.type.id === 7 ? item.policy_details?.name : item.type.name,
      }))
    })

    return {
      dataSource,
      getTruncateFileName,
      ...useSizeTable(),
    }
  },

  data() {
    return {
      columns,
    }
  },

  methods: {
    onOpenAttachedFile(filename: string) {
      const url = `${this.$config.mediaBaseURL}/${filename}`

      window.open(url)
    },
  },
})

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: 'Loại lương',
    dataIndex: 'typeName',
    width: 250,
  },
  {
    title: 'Khoản dự kiến',
    dataIndex: 'calculatedAmount',
  },
  {
    title: 'Khoản xác nhận',
    dataIndex: 'approvedAmount',
  },
  {
    title: 'Ghi chú của khoản',
    dataIndex: 'note',
    scopedSlots: { customRender: 'note' },
    width: 250,
  },
  {
    title: 'File đính kèm',
    dataIndex: 'attached_files',
    scopedSlots: { customRender: 'attached_files' },
    width: 150,
  },
  {
    title: 'Lịch sử phiếu',
    dataIndex: 'latest_update',
    scopedSlots: { customRender: 'latest_update' },
    width: 150,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 200,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 200,
    fixed: 'right',
    scopedSlots: { customRender: 'action' },
  },
]
</script>
