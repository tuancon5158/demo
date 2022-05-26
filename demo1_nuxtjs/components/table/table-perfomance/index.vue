<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1400 }"
    row-key="id"
  ></a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useStatus } from '@/state'
import { formatCurrency } from '@/utils'
import { IPerformance } from '@/interfaces/performance'

export default defineComponent({
  name: 'TablePerformance',

  props: {
    performances: {
      type: Array as PropType<IPerformance[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.performances?.map(item => ({
        ...item,
        status: getLabelStatus(item.status),
        money: formatCurrency(item.money),
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
    title: 'Thời gian',
    dataIndex: 'updated_at',
  },
  {
    title: 'Nhân sự',
    dataIndex: 'user.name',
  },
  {
    title: 'Chính sách',
    dataIndex: 'perf_policy.name',
  },
  {
    title: 'Mô tả khoản',
    dataIndex: 'description',
    width: 300,
  },
  {
    title: 'Chứng từ',
    dataIndex: 'model_code',
    width: 150,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 150,
  },
  {
    title: 'Thu nhập',
    dataIndex: 'money',
  },
  {
    title: 'Điểm thưởng',
    dataIndex: 'points',
  },
]
</script>
