<template>
  <div>
    <a-button type="link" @click="visibleModal = true">Duyệt tất cả</a-button>

    <a-modal v-model="visibleModal" centered :title="title" width="55%">
      <div
        class="
          grid
          gap-2
          grid-cols-2
          md:grid-cols-5
          lg:grid-cols-9
          items-center
        "
      >
        <h1 class="col-span-2 ml-8">Ghi chú</h1>
        <a-input v-model="note" class="col-span-6" />
      </div>
      <p class="mt-3 text-center">
        Các khoản thu nhập sẽ chuyển sang trạng thái
        <span class="font-bold">Đã duyệt</span>
        .
      </p>
      <p class="text-center font-bold">
        Có ({{ filteredApprovedAmounts.length }}) khoản chưa có tiền nghiệm thu,
        giá trị Nghiệm thu sẽ tự động bằng Dự kiến
      </p>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleSubmitApproveAll">
          Duyệt
        </a-button>
        <a-button key="back" @click="visibleModal = false">Huỷ</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
} from '@nuxtjs/composition-api'
import { useDrawer, useNotification } from '@/composables'
import { useGetterTimeKeeping } from '@/state'
import { ITimeKeeping } from '@/interfaces/timeKeeping'
import { IIncomeAmount } from '@/interfaces/incomeAmount'
import { useServiceIncomeAmountDetail } from '@/services'
import { formatCurrency } from '@/utils'

export default defineComponent({
  name: 'ButtonAcceptAll',

  components: {},

  props: {
    item: {
      type: Object as PropType<ITimeKeeping>,
      default: () => ({}),
    },
    count: {
      type: Number,
      default: 0,
    },
    totalPaymentSelect: {
      type: Number,
      default: 0,
    },
    totalPaymentFutureSelect: {
      type: Number,
      default: 0,
    },
    filteredApprovedAmounts: {
      type: Array as PropType<IIncomeAmount[]>,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const visibleModal = ref(false)
    const { approveAll } = useServiceIncomeAmountDetail()
    const title = computed(() => {
      return `Hủy khoản(${props.count}) - Tổng dự kiến: ${formatCurrency(
        props.totalPaymentSelect
      )} ₫ - Tổng số tiền nghiệm thu: ${formatCurrency(
        props.totalPaymentFutureSelect
      )} ₫`
    })

    const note = ref('')
    const { success, error } = useNotification()
    const handleSubmitApproveAll = async () => {
      const amount_ids = props.filteredApprovedAmounts.map(item => item.id)

      try {
        await approveAll({
          amount_ids,
          note: note.value,
        })
        emit('fetch')
        success(`Đã duyệt thành công ${props.count} khoản`)
        visibleModal.value = false
      } catch (e) {
        error('Duyệt tất cả thất bại')
      }
    }

    return {
      visibleModal,
      title,
      note,
      handleSubmitApproveAll,
      approveAll,
      ...useDrawer(),
      ...useGetterTimeKeeping(),
    }
  },
})
</script>
