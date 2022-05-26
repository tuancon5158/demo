<template>
  <div class="p-4 space-y-4">
    <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <input-search
        v-model="params.search"
        placeholder="Tên nhân viên"
      ></input-search>

      <base-tooltip :disabled="!params.filter.area_id.length" placement="top">
        <template slot="title">
          <span>Khu vực</span>
        </template>
        <select-area v-model="params.filter.area_id" multiple></select-area>
      </base-tooltip>

      <base-tooltip :disabled="!params.filter.branch_id.length" placement="top">
        <template slot="title">
          <span>Chi nhánh</span>
        </template>
        <select-branch
          v-model="params.filter.branch_id"
          :max-tag-count="1"
          multiple
        ></select-branch>
      </base-tooltip>

      <base-datepicker
        v-model="params.filter.time_from"
        placeholder="Chọn ngày"
      ></base-datepicker>
    </div>

    <table-date-block-company
      :dateblocks="dateBlocks"
      :loading="$fetchState.pending"
    ></table-date-block-company>

    <nuxt-child @fetch="fetch"></nuxt-child>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import InputSearch from '@common/input-search.vue'
import TableDateBlockCompany from '@table/table-date-block/company.vue'
import SelectArea from '@select/select-area.vue'
import SelectBranch from '@select/select-branch.vue'
import { useConfig } from '@/composables'
import { useFetchDateBlock } from '@/state'
import { IParamsDateBlock } from '@/interfaces/dateBlock'
import { parseQueryToArrayNumber } from '@/utils'

export default defineComponent({
  name: 'DateBlockCompany',
  components: {
    TableDateBlockCompany,
    InputSearch,
    SelectBranch,
    SelectArea,
  },
  setup() {
    const config = useConfig()
    const params = reactive<IParamsDateBlock>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        time_from: dayjs().format(config.dateFormat),
        time_to: dayjs().format(config.dateFormat),
        area_id: [],
        user_id: [],
        branch_id: [],
        block_type_id: [],
      },
      view_mode: 'company',
    })

    watch(
      () => params.filter.time_from,
      value => {
        params.filter.time_to = value
      }
    )

    return {
      params,
      ...useSetQueryToParams(params),
      ...useFetchDateBlock(params),
    }
  },
})

const useSetQueryToParams = (params: IParamsDateBlock) => {
  const route = useRoute()
  const config = useConfig()

  const getQuery = () =>
    route.value.query as { [index: string]: string | undefined }

  const setQueryToParam = () => {
    const { search, area, branch, date } = getQuery()

    params.search = search || ''
    params.filter.area_id = parseQueryToArrayNumber(area)
    params.filter.branch_id = parseQueryToArrayNumber(branch)
    params.filter.time_from = params.filter.time_to =
      date || dayjs().format(config.dateFormat)
  }

  watch(() => route.value.query, setQueryToParam, { immediate: true })

  return {}
}
</script>
