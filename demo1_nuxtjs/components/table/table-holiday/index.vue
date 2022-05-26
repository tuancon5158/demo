<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 1500 }"
    row-key="id"
  >
    <template #time_sheets="time_sheets">
      <ul class="list-disc">
        <li v-for="timesheet in time_sheets" :key="timesheet.id">
          {{ timesheet.name }}
        </li>
      </ul>
    </template>
    <template #files="files">
      <div class="grid grid-cols-3 gap-2">
        <base-file-preview
          v-for="file in files"
          :key="file"
          :src="file"
          @click="onPreviewImage(file)"
        ></base-file-preview>
      </div>
    </template>
    <template #action="action, item">
      <a-button
        icon="edit"
        shape="circle"
        @click="$router.push('/holiday/' + item.id)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useStatus } from '@/state'
import { IHoliday } from '@/interfaces/holiday'

export default defineComponent({
  name: 'TableHoliday',

  props: {
    holidays: { type: Array as PropType<IHoliday[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { getLabelStatus } = useStatus()

    const items = computed(() => {
      return props.holidays?.map(item => ({
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

  methods: {
    onPreviewImage(file: string) {
      this.$router.push({
        path: '/holiday/preview',
        query: { image: file },
      })
    },
  },
})

const columns = [
  {
    title: 'Tên kỳ nghỉ',
    dataIndex: 'name',
    width: 200,
    fixed: 'left',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Timesheet áp dụng',
    dataIndex: 'time_sheets',
    scopedSlots: { customRender: 'time_sheets' },
    width: 300,
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'from_date',
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'to_date',
  },
  {
    title: 'Hệ số lương',
    dataIndex: 'wage_weight',
  },
  {
    title: 'Tài liệu',
    dataIndex: 'files',
    scopedSlots: { customRender: 'files' },
    width: 180,
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
