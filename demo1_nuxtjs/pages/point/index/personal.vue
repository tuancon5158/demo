<template>
  <div class="p-4 space-y-4">
    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <select-staff
        v-model="params.filter.user_id"
        :branch-id="filterStaff.branch_id"
        :dept-id="filterStaff.dept_id"
      ></select-staff>

      <select-department
        v-model="filterStaff.dept_id"
        allow-clear
      ></select-department>

      <base-tooltip :disabled="!filterStaff.branch_id" title="Chi nhánh">
        <select-branch
          v-model="filterStaff.branch_id"
          allow-clear
          placeholder="Chi nhánh"
        ></select-branch>
      </base-tooltip>

      <a-select v-model="params.filter.quarter" placeholder="Chọn Quý">
        <a-select-option :value="1">Quý 1</a-select-option>
        <a-select-option :value="2">Quý 2</a-select-option>
        <a-select-option :value="3">Quý 3</a-select-option>
        <a-select-option :value="4">Quý 4</a-select-option>
      </a-select>

      <a-select v-model="params.filter.year" placeholder="Chọn năm">
        <a-select-option
          v-for="year in Array.from({ length: 20 }, (v, i) => 2010 + i)"
          :key="'year' + year"
          :value="year"
        >
          {{ year }}
        </a-select-option>
      </a-select>
    </div>

    <div class="flex justify-end pr-4">
      <span>Tổng điểm</span>
    </div>

    <a-collapse v-model="collapseActivated">
      <a-collapse-panel
        v-for="(points, month) in pointMonths"
        :key="month"
        :header="'Tháng ' + month"
      >
        <template slot="extra">
          <span>{{ getTotalPoint(points) | formatCurrency }} điểm</span>
        </template>
        <table-point
          :points="points"
          :loading="$fetchState.pending"
        ></table-point>
      </a-collapse-panel>
    </a-collapse>

    <nuxt-child @fetch="fetch"></nuxt-child>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import moment from 'moment'
import SelectBranch from '@select/select-branch.vue'
import SelectDepartment from '@select/select-department.vue'
import SelectStaff from '@select/select-staff.vue'
import TablePoint from '@table/table-point/personal.vue'
import { useAuth } from '@/composables'
import { useFetchPoints } from '@/state'
import { formatCurrency } from '@/utils'
import { IParamsPoint, IPoint } from '@/interfaces/point'

export default defineComponent({
  name: 'PointPersonal',

  components: {
    TablePoint,
    SelectStaff,
    SelectDepartment,
    SelectBranch,
  },

  filters: { formatCurrency },

  middleware: 'admin',

  setup() {
    const { user } = useAuth()
    const params = reactive<IParamsPoint>({
      filter: {
        year: moment().year(),
        quarter: moment().quarter(),
        branch_id: [],
        dept_id: [],
        user_id: user.id,
      },
      view_mode: 'personal',
    })

    const filterStaff = reactive({
      branch_id: undefined,
      dept_id: undefined,
    })

    const collapseActivated = ref(moment().month() + 1)

    const { points: pointMonths, fetch } = useFetchPoints(params)

    const getTotalPoint = (points: IPoint[]) => {
      return points.reduce((acc, point) => {
        acc += point.points

        return acc
      }, 0)
    }

    return {
      params,
      filterStaff,
      pointMonths,
      fetch,
      collapseActivated,
      getTotalPoint,
    }
  },
})
</script>
