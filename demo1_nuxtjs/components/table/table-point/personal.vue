<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable }"
    row-key="id"
  ></a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { IPoint } from '@/interfaces/point'
import { formatCurrency } from '@/utils'

export default defineComponent({
  name: 'TablePoint',

  props: {
    points: { type: Array as PropType<IPoint[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const items = computed(() => {
      return props.points?.map(item => ({
        ...item,
        id: `ID ${item.id}`,
        points: formatCurrency(item.points),
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
    title: 'Ngày tạo',
    dataIndex: 'created_at',
    width: 150,
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Content',
    dataIndex: 'content',
  },
  {
    title: 'Loại',
    dataIndex: 'type',
  },
  {
    title: 'Điểm',
    dataIndex: 'points',
  },
]
</script>
