<template>
  <div class="p-4 space-y-4">
    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <base-tooltip
        :disabled="!params.filter.title_id.length"
        title="Chức danh"
      >
        <select-position
          v-model="params.filter.title_id"
          allow-clear
          multiple
        ></select-position>
      </base-tooltip>

      <base-tooltip
        :disabled="!params.filter.branch_id.length"
        title="Chi nhánh"
      >
        <select-branch
          v-model="params.filter.branch_id"
          allow-clear
          multiple
          placeholder="Chi nhánh"
        ></select-branch>
      </base-tooltip>

      <select-department
        v-model="params.filter.dept_id"
        allow-clear
        multiple
      ></select-department>

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
import moment from 'moment'
import SelectBranch from '@select/select-branch.vue'
import SelectDepartment from '@select/select-department.vue'
import SelectPosition from '@select/select-position.vue'
import TablePoint from '@table/table-point/company.vue'
import { IParamsPoint } from '@/interfaces/point'
import { useOnlyMonthPicker, useSetQueryToParams } from '@/composables'
import { useFetchPoints } from '@/state'

export default defineComponent({
  name: 'PointCompany',
  components: {
    TablePoint,
    SelectPosition,
    SelectDepartment,
    SelectBranch,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsPoint>({
      filter: {
        year: moment().year(),
        month: moment().month() + 1,
        branch_id: [],
        dept_id: [],
        title_id: [],
      },
      view_mode: 'company',
    })

    return {
      params,

      ...useFetchPoints(params),
      ...useSetQueryToParams(params),
      ...useOnlyMonthPicker(params),
    }
  },
})
</script>
