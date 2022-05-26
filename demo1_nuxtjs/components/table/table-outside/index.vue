<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1500 }"
    row-key="id"
    size="middle"
  >
    <template #status="status">
      <section-status :status="status"></section-status>
    </template>
    <template #action="_, item">
      <button-detail :item="item" @done="$emit('fetch')"></button-detail>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import SectionStatus from '@table/table-duyet-de-xuat/section-status.vue'
import ButtonDetail from '@table/table-outside/button-detail.vue'
import { useSizeTable, useTimeBlocks } from '@/composables'
import { sortDate, sortNumber, sortString, formatDateTime } from '@/utils'
import { IOutside } from '@/interfaces/outside'

export default defineComponent({
  name: 'TableOutside',

  components: { ButtonDetail, SectionStatus },

  props: {
    outsides: { type: Array as PropType<IOutside[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getStartDate, getEndDate, getTotalTime } = useTimeBlocks()

    const items = computed(() => {
      return props.outsides?.map(item => ({
        ...item,
        createdDateTime: formatDateTime(item.created_at),
        username: `${item.user.name} - ${item.user.id}`,
        startTime: getStartDate(item.time_blocks),
        endTime: getEndDate(item.time_blocks),
        totalTime: getTotalTime(item.time_blocks),
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
    dataIndex: 'createdDateTime',
    width: 180,
    sorter: sortDate<IOutside>(item => item.created_at),
  },
  {
    title: 'Nhân sự',
    dataIndex: 'username',
    sorter: sortString<IOutside>(item => item.user.name),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 200,
    sorter: sortNumber<IOutside>(item => item.status),
  },
  {
    title: 'Giờ bắt đầu',
    dataIndex: 'startTime',
    width: 180,
  },
  {
    title: 'Giờ kết thúc',
    dataIndex: 'endTime',
    width: 180,
  },
  {
    title: 'Số giờ',
    dataIndex: 'totalTime',
    width: 100,
  },
  {
    title: 'Địa điểm làm việc',
    dataIndex: 'location',
    width: 150,
  },
  {
    title: 'Khu vực',
    dataIndex: 'area.name',
    width: 100,
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department.name',
    width: 100,
  },
  {
    title: 'Hành động',
    dataIndex: 'id',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 100,
  },
]
</script>
