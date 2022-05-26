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
        type="link"
        @click="redirect('/phong-ban-chuc-danh/danh-muc-don-vi/' + item.id)"
      >
        Thay đổi
      </a-button>
    </template>
    <template #status="status_detail, item">
      <div>{{ item.status_detail }}</div>
    </template>
    <template #code="code">
      <column-copy :value-copy="code" />
    </template>
    <template #name="name">
      <column-truncate-text :max-length="20" :text="name" />
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useClipboard } from '@vueuse/core'
import { truncateText } from '@vt7/utils'
import ColumnTruncateText from '@/components/common/column-truncate-text.vue'
import { IDepartment } from '@/interfaces/department'
import { useRouteHistory, useSizeTable } from '@/composables'
import { useStatus, useTypeDepartment } from '@/state'
import ColumnCopy from '@/components/common/column-copy.vue'
export default defineComponent({
  name: 'TableDepartment',
  components: { ColumnCopy, ColumnTruncateText },

  props: {
    departments: { type: Array as PropType<IDepartment[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelTypeDepartment } = useTypeDepartment()
    const { getLabelStatus } = useStatus()
    const { copy, copied } = useClipboard()
    const items = computed(() => {
      return props.departments?.map(item => ({
        ...item,
        type: getLabelTypeDepartment(item.type),
        status: getLabelStatus(item.status),
      }))
    })

    return {
      columns,
      copy,
      copied,
      items,
      truncateText,
      ...useSizeTable(),
      ...useRouteHistory(),
    }
  },
})

const columns = [
  {
    title: 'Mã đơn vị',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    width: 150,
  },
  {
    title: 'Tên đơn vị',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Loại đơn vị',
    dataIndex: 'type',
    width: 150,
  },
  {
    title: 'Cấp báo cáo',
    dataIndex: 'report_level',
    width: 150,
  },
  {
    title: 'SL nhân sự',
    dataIndex: 'total_staff',
    width: 120,
  },
  { title: 'Đơn vị cha', dataIndex: 'parent_name', width: 150 },
  {
    title: 'Trạng thái',
    scopedSlots: { customRender: 'status' },
    dataIndex: 'status_detail',
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
