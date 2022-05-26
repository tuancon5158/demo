<template>
  <div>
    <a-button type="link" @click="visibleModal = true">Hủy tất cả</a-button>

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
      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleDeclineApproveAll">
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
  name: 'ButtonDeclineAll',

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
    const title = computed(() => {
      return `Hủy khoản(${props.count}) - Tổng dự kiến: ${formatCurrency(
        props.totalPaymentSelect
      )} ₫ - Tổng số tiền nghiệm thu: ${formatCurrency(
        props.totalPaymentFutureSelect
      )} ₫`
    })

    const { declineAll } = useServiceIncomeAmountDetail()
    const note = ref('')
    const { success, error } = useNotification()
    const handleDeclineApproveAll = async () => {
      const amount_ids = props.filteredApprovedAmounts.map(item =>
        item.id.toString()
      )

      try {
        await declineAll({
          amount_ids,
          note: note.value,
        })
        emit('fetch')
        success(`Đã hủy ${props.count} khoản thu nhập`)
        note.value = ''
        visibleModal.value = false
      } catch (e) {
        error('Hủy tất cả thất bại')
      }
    }

    return {
      visibleModal,
      title,
      note,
      handleDeclineApproveAll,
      ...useDrawer(),
      ...useGetterTimeKeeping(),
    }
  },
})
</script>
