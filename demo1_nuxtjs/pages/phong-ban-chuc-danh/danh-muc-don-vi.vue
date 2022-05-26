<template>
  <div class="p-4 space-y-4">
    <div
      class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 items-center"
    >
      <input-search
        v-model="params.search"
        placeholder="Tên đơn vị, mã đơn vị..."
      ></input-search>

      <base-tooltip :disabled="!params.filter.type" placement="top">
        <template slot="title">
          <span>Loại đơn vị</span>
        </template>
        <select-type-department
          v-model="params.filter.type"
          placeholder="Loại đơn vị"
        ></select-type-department>
      </base-tooltip>

      <base-tooltip :disabled="!params.filter.report_level" placement="top">
        <template slot="title">
          <span>Cấp báp cáo</span>
        </template>
        <select-level-report
          v-model="params.filter.report_level"
          placeholder="Cấp báo cáo"
        ></select-level-report>
      </base-tooltip>
      <checkbox-status-detail-department
        v-model="params.filter.status"
        class="col-span-2 pt-6"
      />
    </div>
    <div class="flex justify-between items-center">
      <h5 class="flex space-x-6">
        <span class="mr-4">{{ total }} Đơn vị</span>
        |
        <span>{{ overView }} Nhân sự</span>
      </h5>

      <a-button
        icon="plus"
        type="primary"
        @click="redirect('/phong-ban-chuc-danh/danh-muc-don-vi/add')"
      >
        Tạo mới đơn vị
      </a-button>
    </div>
    <table-department
      :departments="departments"
      :loading="$fetchState.pending"
    ></table-department>

    <div class="flex">
      <a-pagination
        v-model="params.cur_page"
        :page-size.sync="params.per_page"
        :total="total"
        show-size-changer
      />
    </div>

    <nuxt-child @fetch="fetch"></nuxt-child>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'
import SelectTypeDepartment from '@select/select-type-department.vue'
import TableDepartment from '@table/table-department/index.vue'
import InputSearch from '@common/input-search.vue'
import { useRouteHistory, useSetQueryToParams } from '@/composables'
import { useServiceDepartment } from '@/services'
import { IDepartment, IParamsDepartment } from '@/interfaces/department'
import CheckboxStatusDetailDepartment from '@/components/checkbox/checkbox-status-detail-department.vue'
import SelectLevelReport from '@/components/select/select-level-report.vue'

export default defineComponent({
  name: 'Department',

  components: {
    InputSearch,
    TableDepartment,
    SelectTypeDepartment,
    CheckboxStatusDetailDepartment,
    SelectLevelReport,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsDepartment>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: { type: 0, report_level: undefined, status: [1] },
    })

    return {
      params,
      ...useSetQueryToParams(params),
      ...useFetchDepartments(params),
      ...useRouteHistory(),
    }
  },
})

export const useFetchDepartments = (params: IParamsDepartment) => {
  const { all } = useServiceDepartment()

  const departments = ref<IDepartment[]>([])
  const total = ref(0)
  const overView = ref(0)
  const { fetch } = useFetch(async () => {
    try {
      const { data } = await all(params)

      overView.value = data.overview?.total_staff || 0
      departments.value = data.departments
      total.value = data.meta_data.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { departments, total, overView, fetch }
}
</script>
