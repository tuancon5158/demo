<template>
  <a-table
    :columns="columns"
    :data-source="profiles"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: 2100 }"
    row-key="id"
  >
    <template #status="status">
      <span>{{ getLabelStatus(status) }}</span>
    </template>
    <template #phone="phone">
      <base-tooltip>
        <template slot="title">
          <span>{{ text === phone ? 'Copied' : 'Click to copy' }}</span>
        </template>
        <a-button class="!p-0" type="link" @click="copy(phone)">
          {{ phone }}
        </a-button>
      </base-tooltip>
    </template>
    <template #email="email">
      <base-tooltip>
        <template slot="title">
          <span>{{ text === email ? 'Copied' : 'Click to copy' }}</span>
        </template>
        <a-button class="!p-0" type="link" @click="copy(email)">
          {{ email }}
        </a-button>
      </base-tooltip>
    </template>
    <template #date_of_joining="date">
      <span>{{ date | formatDate }}</span>
    </template>
    <template #timesheet="timesheet">
      <span>{{ timesheet || 'Linh hoạt' }}</span>
    </template>
    <template #area_id="areaId">
      <span>{{ getLabelArea(areaId) }}</span>
    </template>
    <template #action="action, item">
      <a-button
        icon="edit"
        shape="circle"
        @click="$router.push('/profile/' + item.id + '/nhan-su')"
      ></a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useClipboard } from '@vueuse/core'
import { useArea, useStatus } from '@/state'
import { formatDate } from '@/utils'
import { IProfile } from '@/interfaces/profile'
import { useSizeTable } from '@/composables'

export default defineComponent({
  name: 'TableProfile',

  filters: { formatDate },

  props: {
    profiles: {
      type: Array as PropType<IProfile[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const { heightTable } = useSizeTable()
    const { getLabelStatus } = useStatus()
    const { getLabelArea } = useArea()
    const { copy, text } = useClipboard()

    return { heightTable, getLabelArea, getLabelStatus, copy, text, columns }
  },
})

const columns = [
  {
    title: 'Mã',
    dataIndex: 'code',
    width: 100,
  },
  {
    title: 'Họ và tên nhân sự',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Chức danh',
    dataIndex: 'profile.titles[0].name',
    width: 100,
  },
  {
    title: 'Level',
    dataIndex: 'profile.titles[0].level',
    width: 100,
  },
  {
    title: 'Tên đơn vị',
    dataIndex: 'profile.dept_name',
    width: 100,
  },
  {
    title: 'Trạng thái chi tiết',
    dataIndex: 'profile.work_status_name',
    width: 130,
  },
  {
    title: 'Thời gian gia nhập',
    dataIndex: 'profile.date_of_joining',
    width: 140,
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150,
  },
]
</script>
