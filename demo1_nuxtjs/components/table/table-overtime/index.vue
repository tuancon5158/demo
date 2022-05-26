<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1300 }"
    row-key="id"
    size="middle"
  >
    <template #status="status">
      <section-status :status="status"></section-status>
    </template>
    <template #action="id, item">
      <button-detail :item="item" @done="$emit('fetch')"></button-detail>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import SectionStatus from '@table/table-duyet-de-xuat/section-status.vue'
import ButtonDetail from '@table/table-overtime/button-detail.vue'
import { useSizeTable } from '@/composables'
import {
  parseTimeToString,
  sortDate,
  sortNumber,
  sortString,
  formatDateTime,
} from '@/utils'
import { IOvertime } from '@/interfaces/overtime'

export default defineComponent({
  name: 'TableOvertime',

  components: { SectionStatus, ButtonDetail },

  props: {
    overtimes: { type: Array as PropType<IOvertime[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const getTimeShift = (shift: number, date: string) => {
      const hourMinute = parseTimeToString(shift)

      const time = `${hourMinute}:00`
      const dateTime = `${date} ${time}`

      return formatDateTime(dateTime)
    }

    const items = computed(() => {
      return props.overtimes?.map(item => ({
        ...item,
        createdDateTime: formatDateTime(item.created_at),
        username: `${item.user.name} - ${item.user.id}`,
        startTime: getTimeShift(item.period[0], item.date),
        endTime: getTimeShift(item.period[1], item.date),
        totalTime: `${item.period[1] - item.period[0]}h`,
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
    sorter: sortDate<IOvertime>(item => item.created_at),
  },
  {
    title: 'Nhân sự',
    dataIndex: 'username',
    sorter: sortString<IOvertime>(item => item.user.name),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 200,
    sorter: sortNumber<IOvertime>(item => item.status),
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
