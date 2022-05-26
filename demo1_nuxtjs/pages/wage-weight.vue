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
          v-model="params.filter.fromWeight"
          placeholder="Hệ số bắt đầu"
          route-key="fromWeight"
        ></input-search-currency>

        <input-search-currency
          v-model="params.filter.toWeight"
          placeholder="Hệ số kết thúc"
          route-key="toWeight"
        ></input-search-currency>
      </div>

      <table-wage-weight
        :loading="$fetchState.pending"
        :wage-weights="wageWeights"
      ></table-wage-weight>

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
          @click="$router.push('/wage-weight/add')"
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
import TableWageWeight from '@table/table-wage-weight/index.vue'
import { useSetQueryToParams } from '@/composables'
import { useServiceWageWeight } from '@/services'
import { IParamsWageWeight, IWageWeight } from '@/interfaces/wageWeight'

export default defineComponent({
  name: 'WageWeight',

  components: {
    SectionLayoutContent,
    TableWageWeight,
    InputSearchCurrency,
    InputSearch,
    SelectStatus,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsWageWeight>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        status: [],
        fromWeight: '',
        toWeight: '',
      },
    })

    return {
      params,
      ...useSetQueryToParams(params),
      ...useFetchWageWeight(params),
      ...useLayoutContent(),
    }
  },
})

export const useFetchWageWeight = (params: IParamsWageWeight) => {
  const { all } = useServiceWageWeight()

  const wageWeights = ref<IWageWeight[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      wageWeights.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { wageWeights, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Tổ chức'
  const breadcrumbs = ['Tổ chức', 'Hệ số lương']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
