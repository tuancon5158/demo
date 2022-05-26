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
import { useBehaviorApplyFor, useBehaviorType, useStatus } from '@/state'
import { IBehavior } from '@/interfaces/behavior'

export default defineComponent({
  name: 'TableBehavior',

  props: {
    behaviors: { type: Array as PropType<IBehavior[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelBehaviorApplyFor } = useBehaviorApplyFor()
    const { getLabelBehaviorType } = useBehaviorType()
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.behaviors?.map(item => ({
        ...item,
        type: getLabelBehaviorType(item.type),
        apply_for: getLabelBehaviorApplyFor(item.apply_for),
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
    width: 100,
  },
  {
    title: 'Loại khen thưởng',
    dataIndex: 'type',
  },
  {
    title: 'Tên hành vi',
    dataIndex: 'name',
  },
  {
    title: 'Nhóm hành vi',
    dataIndex: 'behavior_group.name',
  },
  {
    title: 'Đối tượng',
    dataIndex: 'apply_for',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Mức độ',
    dataIndex: 'level',
  },
  {
    title: 'Điểm',
    dataIndex: 'apply_value.user.points',
  },
  {
    title: 'Thu nhập (đ)',
    dataIndex: 'apply_value.user.money',
  },
  {
    title: 'Thu nhập (h)',
    dataIndex: 'apply_value.user.hours',
  },
  {
    title: 'Điểm chi nhánh',
    dataIndex: 'apply_value.branch.points',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
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
