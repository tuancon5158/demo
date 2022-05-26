<template>
  <a-table
    :columns="columns"
    :data-source="dateblocks"
    :loading="loading"
    :pagination="false"
    :row-key="(_, key) => 'row-key-' + key"
    :scroll="{ y: heightTable, x: 1500 }"
  >
    <template slot="reportHeader">
      <base-time-blocks :time-blocks="getTotalTimeBlocks"></base-time-blocks>
    </template>
    <template #time_blocks="time_blocks">
      <base-timeline-range
        :time-blocks="time_blocks"
        :time-line-end="24"
        :time-line-start="7"
      ></base-timeline-range>
    </template>
    <template #report="_, item">
      <base-time-blocks
        :time-blocks="getTimeBlocks(item.time_blocks)"
      ></base-time-blocks>
    </template>
    <template #action="action, item">
      <a-button
        icon="edit"
        shape="circle"
        @click="onRedirectUpdate(item)"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from '@nuxtjs/composition-api'
import { useSizeTable } from '@/composables'
import { useGetterDateBlock } from '@/state'
import { IDateBlock } from '@/interfaces/dateBlock'

export default defineComponent({
  name: 'TableDateBlockPersonal',

  props: {
    dateblocks: { type: Array as PropType<IDateBlock[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    return {
      columns,
      ...useSizeTable(false),
      ...useGetterDateBlock(toRef(props, 'dateblocks')),
    }
  },

  methods: {
    onRedirectUpdate(item: IDateBlock) {
      this.$router.push({
        path: `/lich-lam-viec/ca-nhan/${item.user_id}`,
        query: { date: item.date },
      })
    },
  },
})

const columns = [
  {
    title: 'Ngày',
    dataIndex: 'date',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'user.name',
    width: 150,
  },
  {
    title: 'Timeline',
    dataIndex: 'time_blocks',
    scopedSlots: { customRender: 'time_blocks' },
    width: 750,
  },
  {
    dataIndex: 'report',
    slots: { title: 'reportHeader' },
    scopedSlots: { customRender: 'report' },
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 150,
  },
]
</script>
