<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <input-search v-model="params.search"></input-search>

        <base-tooltip :disabled="!params.filter.status.length" placement="top">
          <template slot="title">
            <span>Trạng thái sử dung</span>
          </template>
          <select-status
            v-model="params.filter.status"
            multiple
            placeholder="Trạng thái sử dung"
          ></select-status>
        </base-tooltip>
      </div>

      <table-timesheet
        :loading="$fetchState.pending"
        :timesheets="timesheets"
      ></table-timesheet>

      <div class="flex">
        <a-pagination
          v-model="params.cur_page"
          :page-size.sync="params.per_page"
          :total="total"
          show-size-changer
        />
      </div>

      <a-affix class="absolute right-[16px] bottom-[16px]">
        <a-button
          icon="plus"
          shape="circle"
          size="large"
          type="primary"
          @click="$router.push('/timesheet/add')"
        ></a-button>
      </a-affix>

      <nuxt-child @fetch="fetch"></nuxt-child>
    </div>
  </section-layout-content>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'
import InputSearch from '@common/input-search.vue'
import SectionLayoutContent from '@common/section-layout-content.vue'
import SelectStatus from '@select/select-status.vue'
import TableTimesheet from '@table/table-timesheet/index.vue'
import { useSetQueryToParams } from '@/composables'
import { useServiceTimesheet } from '@/services'
import { IParamsTimesheet, ITimesheet } from '@/interfaces/timesheet'

export default defineComponent({
  name: 'Timesheet',

  components: {
    SectionLayoutContent,
    TableTimesheet,
    InputSearch,
    SelectStatus,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsTimesheet>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        status: [],
      },
    })

    return {
      params,
      ...useFetchTimesheets(params),
      ...useSetQueryToParams(params),
      ...useLayoutContent(),
    }
  },
})

export const useFetchTimesheets = (params: IParamsTimesheet) => {
  const { all } = useServiceTimesheet()

  const timesheets = ref<ITimesheet[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      timesheets.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { timesheets, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Tổ chức'
  const breadcrumbs = ['Tổ chức', 'Timesheet']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
