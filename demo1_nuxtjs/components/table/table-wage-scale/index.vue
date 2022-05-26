<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable }"
    row-key="id"
  >
    <template #action="action, item">
      <a-button
        icon="edit"
        shape="circle"
        @click="$router.push('/wage-scale/' + item.id)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useStatus } from '@/state'
import { formatCurrency } from '@/utils'
import { IWageScale } from '@/interfaces/wageScale'

export default defineComponent({
  name: 'TableWageScale',

  props: {
    wageScales: { type: Array as PropType<IWageScale[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.wageScales?.map(item => ({
        ...item,
        amount: `${formatCurrency(Number(item.amount))} đ`,
        status: getLabelStatus(item.status),
      }))
    })

    return {
      columns,
      items,
      ...useSizeTable(),
    }
  },
})

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 150,
  },
  {
    title: 'Mã thang lương',
    dataIndex: 'code',
  },
  {
    title: 'Tiền',
    dataIndex: 'amount',
    width: 150,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 150,
  },
  {
    title: 'Cập nhật cuối',
    dataIndex: 'updated_at',
    width: 150,
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150,
  },
]
</script>
