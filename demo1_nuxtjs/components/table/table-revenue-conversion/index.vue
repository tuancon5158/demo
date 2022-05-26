<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1500 }"
    row-key="id"
  >
    <template #action="action, item">
      <a-button
        icon="edit"
        shape="circle"
        @click="$router.push('/revenue-conversion/' + item.id)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useStatus } from '@/state'
import { IRevenueConversion } from '@/interfaces/revenueConversion'

export default defineComponent({
  name: 'TableRevenueConversion',

  props: {
    revenueConversions: {
      type: Array as PropType<IRevenueConversion[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.revenueConversions?.map(item => ({
        ...item,
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
    defaultSortOrder: 'ascend',
    sorter: (a: IRevenueConversion, b: IRevenueConversion) => {
      return a.id - b.id
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Tên ngành hàng',
    dataIndex: 'name',
    sorter: (a: IRevenueConversion, b: IRevenueConversion) => {
      return a.name.localeCompare(b.name)
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Mô tả ngành hàng',
    dataIndex: 'description',
  },
  {
    title: 'Nhóm sản phẩm',
    dataIndex: 'product_group.name',
  },
  {
    title: 'Hệ số quy đổi',
    dataIndex: 'conversion_weight',
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
    fixed: 'right',
  },
]
</script>
