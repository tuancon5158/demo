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
        titles: item.titles?.[0]?.name || '',
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
    width: 100,
  },
  {
    title: 'Nhân viên',
    dataIndex: 'name',
  },
  {
    title: 'Chức danh',
    dataIndex: 'titles',
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branch.name',
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
