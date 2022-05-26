<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable }"
    row-key="id"
  >
    <template #type="type, item">
      <select-listing-timesheet
        v-if="type === 'FIXED' || type === 'FLEXIBLE'"
        :value="item.meta_data"
      ></select-listing-timesheet>

      <select-listing-position
        v-if="type === 'NO_TIMEKEEPING'"
        :value="item.meta_data"
      ></select-listing-position>
    </template>

    <template #action="_, item, index">
      <div>
        <button-edit-timesheet
          v-if="item.type === 'FIXED' || item.type === 'FLEXIBLE'"
          :index="index"
          :items="items"
          @done="$emit('done')"
        ></button-edit-timesheet>

        <button-edit-position
          v-if="item.type === 'NO_TIMEKEEPING'"
          :index="index"
          :items="items"
          @done="$emit('done')"
        ></button-edit-position>
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import SelectListingTimesheet from '@table/table-time-keeping-setting/select-listing-timesheet.vue'
import SelectListingPosition from '@table/table-time-keeping-setting/select-listing-position.vue'
import ButtonEditTimesheet from '@table/table-time-keeping-setting/button-edit-timesheet.vue'
import ButtonEditPosition from '@table/table-time-keeping-setting/button-edit-position.vue'
import { useSizeTable } from '@/composables'
import { ITimeKeepingSetting } from '@/interfaces/timeKeeping'

export default defineComponent({
  name: 'TableTimeKeepingSetting',

  components: {
    ButtonEditPosition,
    ButtonEditTimesheet,
    SelectListingPosition,
    SelectListingTimesheet,
  },

  props: {
    items: {
      type: Array as PropType<ITimeKeepingSetting[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
  },

  setup() {
    return { columns, ...useSizeTable() }
  },
})

const columns = [
  { title: 'Hình thức', dataIndex: 'name' },
  {
    title: 'Đối tượng',
    scopedSlots: { customRender: 'type' },
    dataIndex: 'type',
  },
  {
    title: 'Thao tác',
    dataIndex: 'meta_data',
    scopedSlots: { customRender: 'action' },
    width: 150,
  },
]
</script>
