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
        @click="$router.push('/position/' + item.id)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useOrientation, useStatus } from '@/state'
import { IPosition } from '@/interfaces/position'

export default defineComponent({
  name: 'TablePosition',

  props: {
    positions: { type: Array as PropType<IPosition[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelOrientation } = useOrientation()
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.positions?.map(item => ({
        ...item,
        career_path: getLabelOrientation(item.career_path),
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
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cấp tối đa',
    dataIndex: 'max_level',
    width: 150,
  },
  {
    title: 'Định hướng',
    dataIndex: 'career_path',
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
