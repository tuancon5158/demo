<template>
  <div class="p-4 space-y-4">
    <div
      class="
        grid
        gap-2
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4
        lg:grid-cols-7
        items-center
      "
    >
      <input-search
        v-model="params.search"
        placeholder="Tên , mã chức danh..."
      ></input-search>

      <select-cadre-level
        v-model="params.filter.cadre_level"
        placeholder="Cấp cán bộ"
      ></select-cadre-level>

      <select-career-path
        v-model="params.filter.career_path"
        :multiple="true"
        placeholder="Ngạch"
      ></select-career-path>

      <select-group-titles
        v-model="params.filter.group"
        placeholder="Nhóm"
      ></select-group-titles>

      <select-boundary
        v-model="params.filter.boundary"
        placeholder="Định Biên"
      ></select-boundary>

      <checkbox-status-detail-department
        v-model="params.filter.status"
        class="col-span-1 pt-6"
      />
    </div>
    <div class="flex justify-between items-center">
      <h5 class="flex space-x-6">
        <span class="mr-4">Tổng : {{ total }} chức danh</span>
        |
        <span>{{ overView }} Nhân sự</span>
      </h5>

      <a-button
        icon="plus"
        type="primary"
        @click="redirect('/phong-ban-chuc-danh/danh-muc-chuc-danh/add')"
      >
        Tạo mới chức danh
      </a-button>
    </div>
    <table-titles
      :loading="$fetchState.pending"
      :titles="titles"
    ></table-titles>

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
import InputSearch from '@common/input-search.vue'
import TableTitles from '@table/table-titles.vue'
import { useRouteHistory, useSetQueryToParams } from '@/composables'
import { useServiceTitles } from '@/services'
import { ITitle, IParamsTitles } from '@/interfaces/titles'
import CheckboxStatusDetailDepartment from '@/components/checkbox/checkbox-status-detail-department.vue'
import SelectCareerPath from '@/components/select/select-career-path.vue'
import SelectGroupTitles from '@/components/select/select-group-titles.vue'
import SelectBoundary from '@/components/select/select-boundary.vue'
import SelectCadreLevel from '@/components/select/select-cadre-level.vue'

export default defineComponent({
  name: 'Titles',

  components: {
    InputSearch,
    TableTitles,
    CheckboxStatusDetailDepartment,
    SelectCareerPath,
    SelectGroupTitles,
    SelectBoundary,
    SelectCadreLevel,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsTitles>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        group: undefined,
        cadre_level: undefined,
        career_path: [],
        boundary: undefined,
        status: [1],
      },
    })

    return {
      params,
      ...useSetQueryToParams(params),
      ...useFetchTitles(params),
      ...useRouteHistory(),
    }
  },
})

export const useFetchTitles = (params: IParamsTitles) => {
  const { all } = useServiceTitles()

  const titles = ref<ITitle[]>([])
  const total = ref(0)
  const overView = ref(0)
  const { fetch } = useFetch(async () => {
    try {
      const { data } = await all(params)

      overView.value = data.overview?.total_staff || 0
      titles.value = data.titles
      total.value = data.meta_data.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { titles, total, overView, fetch }
}
</script>
