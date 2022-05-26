<template>
  <a-table
    :columns="columns"
    :data-source="points"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable }"
    row-key="id"
  ></a-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { IPoint } from '@/interfaces/point'

export default defineComponent({
  name: 'TablePoint',

  props: {
    points: { type: Array as PropType<IPoint[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup() {
    return {
      columns,
      ...useSizeTable(),
    }
  },
})

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
    sorter: (a: any, b: any) => {
      return Number(a.id) - Number(b.id)
    },
  },
  {
    title: 'Tên đơn vị',
    dataIndex: 'name',
  },
  {
    title: 'Loại đơn vị',
    dataIndex: 'type',
    sorter: (a: any, b: any) => {
      return a.type.localeCompare(b.type)
    },
  },
  {
    title: 'Điểm',
    dataIndex: 'points',
    sorter: (a: any, b: any) => {
      return Number(a.points) - Number(b.points)
    },
  },
]
</script>
