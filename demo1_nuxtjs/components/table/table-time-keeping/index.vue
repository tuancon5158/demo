<template>
  <a-table
    :columns="columns"
    :data-source="formattedItems"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1500 }"
    row-key="id"
    size="middle"
  >
    <template #type="type">
      <section-type :type="type"></section-type>
    </template>

    <template #status="status">
      <section-status :status="status"></section-status>
    </template>

    <template #action="_, item, key">
      <button-edit :item="items[key]"></button-edit>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import ButtonEdit from '@table/table-time-keeping/button-edit.vue'
import SectionType from '@table/table-time-keeping/section-type.vue'
import SectionStatus from '@table/table-duyet-de-xuat/section-status.vue'
import { useSizeTable } from '@/composables'
import { useGetterTimeKeeping } from '@/state'
import { ITimeKeeping } from '@/interfaces/timeKeeping'

export default defineComponent({
  name: 'TableTimeKeeping',

  components: { SectionStatus, SectionType, ButtonEdit },

  props: {
    items: { type: Array as PropType<ITimeKeeping[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getUserName, getStandardDateTime, getRealDateTime } =
      useGetterTimeKeeping()

    const formattedItems = computed(() => {
      return props.items?.map(item => {
        return {
          ...item,
          username: getUserName(item),
          realDateTime: getRealDateTime(item),
          standardDateTime: getStandardDateTime(item),
        }
      })
    })

    return { columns, formattedItems, ...useSizeTable() }
  },
})

const columns = [
  {
    title: 'Giờ đúng',
    dataIndex: 'realDateTime',
  },
  {
    title: 'Giờ tạo',
    dataIndex: 'standardDateTime',
  },
  {
    title: 'ID phiếu chấm công',
    dataIndex: 'id',
  },
  {
    title: 'Tên nhân sự',
    dataIndex: 'username',
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department.name',
  },
  {
    title: 'Loại chấm công',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'Chi tiết',
    dataIndex: 'behavior.name',
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 95,
  },
]
</script>
