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
        @click="$router.push('/wage-weight/' + item.id)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useStatus } from '@/state'
import { IWageWeight } from '@/interfaces/wageWeight'

export default defineComponent({
  name: 'TableWageWeight',

  props: {
    wageWeights: { type: Array as PropType<IWageWeight[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.wageWeights?.map(item => ({
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
    title: 'Người tạo',
    dataIndex: 'created_by_user.name',
  },
  {
    title: 'Tên hệ số lương',
    dataIndex: 'name',
  },
  {
    title: 'Đặc tính',
    dataIndex: 'fields',
    width: 150,
  },
  {
    title: 'Hệ số',
    dataIndex: 'weight',
    width: 150,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
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
