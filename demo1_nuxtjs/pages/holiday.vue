<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <input-search v-model="params.search"></input-search>

        <base-tooltip
          :disabled="!params.filter.time_sheet_id.length"
          placement="top"
        >
          <template slot="title">
            <span>Timesheet áp dụng</span>
          </template>
          <select-timesheet
            v-model="params.filter.time_sheet_id"
            multiple
          ></select-timesheet>
        </base-tooltip>

        <input-search-currency
          v-model="params.filter.from_weight"
          placeholder="Hệ số bắt đầu"
          route-key="fromWeight"
        ></input-search-currency>

        <input-search-currency
          v-model="params.filter.to_weight"
          placeholder="Hệ số kết thúc"
          route-key="toWeight"
        ></input-search-currency>

        <base-datepicker
          v-model="params.filter.time_from"
          :disabled-date="disabledStartDate"
          placeholder="Thời gian bắt đầu"
          size="default"
          @openChange="handleStartOpenChange"
        ></base-datepicker>

        <base-datepicker
          v-model="params.filter.time_to"
          :disabled-date="disabledEndDate"
          :open="endOpen"
          placeholder="Thời gian kết thúc"
          size="default"
          @openChange="handleEndOpenChange"
        ></base-datepicker>
      </div>

      <table-holiday
        :holidays="holidays"
        :loading="$fetchState.pending"
      ></table-holiday>

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
          @click="$router.push('/holiday/add')"
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
  toRef,
  useFetch,
  watch,
} from '@nuxtjs/composition-api'
import InputSearch from '@common/input-search.vue'
import InputSearchCurrency from '@common/input-search-currency.vue'
import SectionLayoutContent from '@common/section-layout-content.vue'
import TableHoliday from '@table/table-holiday/index.vue'
import SelectTimesheet from '@select/select-timesheet.vue'
import { useDatePickerRange, useSetQueryToParams } from '@/composables'
import { useServiceHoliday } from '@/services'
import { IHoliday, IParamsHoliday } from '@/interfaces/holiday'

export default defineComponent({
  name: 'Holiday',

  components: {
    InputSearchCurrency,
    SectionLayoutContent,
    InputSearch,
    TableHoliday,
    SelectTimesheet,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsHoliday>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        time_sheet_id: [],
        created_by_id: [],
        from_weight: '',
        to_weight: '',
        time_from: '',
        time_to: '',
        status: [],
      },
    })

    return {
      params,

      ...useDatePickerRange({
        startDate: toRef(params.filter, 'time_from'),
        endDate: toRef(params.filter, 'time_to'),
      }),

      ...useSetQueryToParams(params),
      ...useFetchHoliday(params),
      ...useLayoutContent(),
    }
  },
})

export const useFetchHoliday = (params: IParamsHoliday) => {
  const { all } = useServiceHoliday()

  const holidays = ref<IHoliday[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      holidays.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { holidays, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Tổ chức'
  const breadcrumbs = ['Tổ chức', 'Lễ tết']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
