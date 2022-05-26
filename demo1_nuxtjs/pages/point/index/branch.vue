<template>
  <div class="p-4 space-y-4">
    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <a-month-picker
        v-model="defaultMonth"
        placeholder="Chọn tháng"
        @change="onChangeMonth"
      />
    </div>

    <table-point :loading="$fetchState.pending" :points="points"></table-point>

    <nuxt-child @fetch="fetch"></nuxt-child>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import TablePoint from '@table/table-point/branch.vue'
import moment from 'moment'
import { useOnlyMonthPicker } from '@/composables'
import { useFetchPoints } from '@/state'
import { IParamsPoint } from '@/interfaces/point'

export default defineComponent({
  name: 'PointBranch',

  components: { TablePoint },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsPoint>({
      filter: {
        month: moment().month() + 1,
        year: moment().year(),
      },
      view_mode: 'branch_dept',
    })

    return {
      params,
      ...useFetchPoints(params),
      ...useOnlyMonthPicker(params),
    }
  },
})
</script>
