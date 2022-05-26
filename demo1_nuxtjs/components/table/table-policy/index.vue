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
        @click="$router.push('/policy/' + item.id)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useApplyForAccount, usePolicyType, useStatus } from '@/state'
import { IPolicy } from '@/interfaces/policy'

export default defineComponent({
  name: 'TablePolicy',

  props: {
    policies: { type: Array as PropType<IPolicy[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelPolicyType } = usePolicyType()
    const { getLabelApplyForAccount } = useApplyForAccount()
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.policies?.map(item => ({
        ...item,
        apply_for_account: getLabelApplyForAccount(item.apply_for_account),
        type: getLabelPolicyType(item.type),
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
    title: 'Thời gian tạo',
    dataIndex: 'created_at',
    width: 150,
  },
  {
    title: 'Người tạo',
    dataIndex: 'created_by_user.name',
  },
  {
    title: 'Tên chính sách',
    dataIndex: 'name',
  },
  {
    title: 'Kỳ áp dụng',
    dataIndex: 'apply_for_account',
  },
  {
    title: 'Loại chính sách',
    dataIndex: 'type',
    width: 150,
  },
  {
    title: 'Mô tả',
    dataIndex: 'note',
  },
  {
    title: 'Bắt đầu',
    dataIndex: 'from_date',
  },
  {
    title: 'Kết thúc',
    dataIndex: 'to_date',
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
