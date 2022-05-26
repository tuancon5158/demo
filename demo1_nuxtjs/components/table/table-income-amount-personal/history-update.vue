<template>
  <div v-if="latestUpdate">
    <span class="cursor-pointer" @click="visible = true">
      {{ item.latest_update.updated_by_user.name }}, {{ latestUpdate }}
    </span>

    <a-modal v-model="visible" centered title="Lịch sử duyệt phiếu" width="60%">
      <base-table bordered>
        <base-table-header>
          <base-table-header-item :width="200">
            Nhân viên
          </base-table-header-item>
          <base-table-header-item :width="150">
            Trạng thái
          </base-table-header-item>
          <base-table-header-item :width="200">Lý do</base-table-header-item>
          <base-table-header-item :width="100">Ngày</base-table-header-item>
        </base-table-header>
        <base-table-body>
          <tr v-for="(updateItem, key) in item.updates" :key="key">
            <td>{{ updateItem.updated_by_user.name }}</td>
            <td>{{ getStatusLabel(updateItem.new.status) }}</td>
            <td>{{ updateItem.updated_reasons }}</td>
            <td>{{ formattedDate(updateItem.new.updated_at) }}</td>
          </tr>
        </base-table-body>
      </base-table>

      <template slot="footer"><span></span></template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import moment from 'moment'
import { useStatusIncomeAmountDetail } from '@/state'
import { IIncomeAmountDetail } from '@/interfaces/incomeAmountDetail'

export default defineComponent({
  name: 'HistoryUpdate',

  props: {
    item: {
      type: Object as PropType<IIncomeAmountDetail>,
      required: true,
    },
  },

  setup(props) {
    const { getStatusLabel } = useStatusIncomeAmountDetail()

    const latestUpdate = computed(() => {
      const updated_at = props.item.latest_update?.new?.updated_at

      if (!updated_at) return ''

      return formattedDate(updated_at)
    })

    const formattedDate = (date: string) => {
      return moment(date).format('DD/MM/YYYY')
    }

    return { latestUpdate, formattedDate, getStatusLabel }
  },

  data() {
    return {
      visible: false,
    }
  },
})
</script>
