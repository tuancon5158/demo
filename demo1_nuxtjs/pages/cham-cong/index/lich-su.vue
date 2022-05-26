<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center space-x-8">
      <h5>Tổng số: {{ total }}</h5>

      <div class="flex-1 gap-2 grid grid-cols-4">
        <select-timekeeping-type
          v-model="params.filter.type"
          allow-clear
        ></select-timekeeping-type>

        <select-timekeeping-status
          v-model="params.filter.status"
          allow-clear
        ></select-timekeeping-status>

        <a-range-picker
          :default-value="defaultValue"
          @change="onChangeDateRange"
        >
          <a-icon slot="suffixIcon" type="calendar" />
        </a-range-picker>

        <input-search
          v-model="params.search"
          placeholder="Tên nhân sự, mã nhân sự..."
        ></input-search>
      </div>
    </div>

    <table-time-keeping
      :items="timeKeepingList"
      :loading="loading"
    ></table-time-keeping>

    <div class="flex justify-end">
      <a-pagination
        v-model="params.page"
        :page-size.sync="params.per_page"
        :total="total"
        show-size-changer
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  useFetch,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import { debouncedWatch } from '@vueuse/core'
import TableTimeKeeping from '@table/table-time-keeping/index.vue'
import InputSearch from '@common/input-search.vue'
import SelectTimekeepingType from '@select/select-timekeeping-type.vue'
import SelectTimekeepingStatus from '@select/select-timekeeping-status.vue'
import { useServiceTimeKeeping } from '@/services'
import { ITimeKeeping, ITimeKeepingParams } from '@/interfaces/timeKeeping'
import { useDateRangePicker } from '@/composables/useDateRangePicker'

export default defineComponent({
  name: 'LichSu',

  components: {
    SelectTimekeepingStatus,
    SelectTimekeepingType,
    InputSearch,
    TableTimeKeeping,
  },

  setup() {
    const params = reactive<ITimeKeepingParams>({
      cur_page: 1,
      per_page: 20,
      search: '',
      filter: {
        time_from: '',
        time_to: '',
        status: '',
        type: '',
      },
    })

    return {
      params,
      ...useFetchTimeKeeping(params),
      ...useSetQueryToParams(params),
      ...useDateRangePicker(),
    }
  },
})

const useFetchTimeKeeping = (params: ITimeKeepingParams) => {
  const { all } = useServiceTimeKeeping()
  const timeKeepingList = ref<ITimeKeeping[]>([])
  const state = reactive({
    loading: false,
    total: 0,
  })

  const { fetch } = useFetch(async () => {
    try {
      state.loading = true
      const { data, meta } = await all(params)

      timeKeepingList.value = data
      state.total = meta.total
    } catch (e) {
      console.log({ e })
    } finally {
      state.loading = false
    }
  })

  debouncedWatch(params, fetch, { debounce: 300 })

  return { ...toRefs(state), timeKeepingList }
}

export const useSetQueryToParams = (params: any) => {
  const route = useRoute()

  const getQuery = () =>
    route.value.query as { [index: string]: string | undefined }

  const setQueryToParam = () => {
    const { search, status, type, timeFrom, timeTo } = getQuery()

    params.search = search || ''
    params.filter.status = status
    params.filter.type = type
    params.filter.time_from = timeFrom || ''
    params.filter.time_to = timeTo || ''
  }

  watch(() => route.value.query, setQueryToParam, { immediate: true })

  return {}
}
</script>
