<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1800 }"
    row-key="id"
  >
    <template #action="action, item">
      <a-button
        icon="edit"
        shape="circle"
        @click="$router.push('/behavior/' + item.id)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useStatus } from '@/state'
import { IBehaviorGroup } from '@/interfaces/behaviorGroup'

export default defineComponent({
  name: 'TableBehaviorGroup',

  props: {
    behaviorGroups: {
      type: Array as PropType<IBehaviorGroup[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.behaviorGroups?.map(item => ({
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
  },
  {
    title: 'Tên nhóm hành vi',
    dataIndex: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
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
