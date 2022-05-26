<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <input-search v-model="params.search"></input-search>

        <base-tooltip :disabled="!params.filter.status.length" placement="top">
          <template slot="title">
            <span>Trạng thái</span>
          </template>
          <select-status
            v-model="params.filter.status"
            multiple
            placeholder="Trạng thái"
          ></select-status>
        </base-tooltip>

        <input-search-currency
          v-model="params.filter.fromMoney"
          placeholder="Tiền bắt đầu"
          route-key="fromMoney"
        ></input-search-currency>

        <input-search-currency
          v-model="params.filter.toMoney"
          placeholder="Tiền kết thúc"
          route-key="toMoney"
        ></input-search-currency>
      </div>

      <table-wage-scale
        :loading="$fetchState.pending"
        :wage-scales="wageScales"
      ></table-wage-scale>

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
          @click="$router.push('/wage-scale/add')"
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
import SectionLayoutContent from '@common/section-layout-content.vue'
import InputSearch from '@common/input-search.vue'
import InputSearchCurrency from '@common/input-search-currency.vue'
import SelectStatus from '@select/select-status.vue'
import TableWageScale from '@table/table-wage-scale/index.vue'
import { useSetQueryToParams } from '@/composables'
import { useServiceWageScale } from '@/services'
import { formatter } from '@/utils'
import { IParamsWageScale, IWageScale } from '@/interfaces/wageScale'

export default defineComponent({
  name: 'WageScale',

  components: {
    InputSearchCurrency,
    SectionLayoutContent,
    TableWageScale,
    InputSearch,
    SelectStatus,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsWageScale>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        status: [],
        fromMoney: '',
        toMoney: '',
      },
    })

    return {
      params,
      formatter,
      ...useFetchWageScale(params),
      ...useSetQueryToParams(params),
      ...useLayoutContent(),
    }
  },
})

export const useFetchWageScale = (params: IParamsWageScale) => {
  const { all } = useServiceWageScale()

  const wageScales = ref<IWageScale[]>([])
  const total = ref(0)

  const { fetch, fetchState } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      wageScales.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { wageScales, total, fetch, fetchState }
}

const useLayoutContent = () => {
  const title = 'Tổ chức'
  const breadcrumbs = ['Tổ chức', 'Thang lương']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
