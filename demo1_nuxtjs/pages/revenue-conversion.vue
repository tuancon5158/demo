<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <input-search
          v-model="params.search"
          placeholder="Tên ngành hàng"
        ></input-search>

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

      <table-revenue-conversion
        :loading="$fetchState.pending"
        :revenue-conversions="revenueConversions"
      ></table-revenue-conversion>

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
          @click="$router.push('/revenue-conversion/add')"
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
import SelectStatus from '@select/select-status.vue'
import SectionLayoutContent from '@common/section-layout-content.vue'
import InputSearch from '@common/input-search.vue'
import TableRevenueConversion from '@table/table-revenue-conversion/index.vue'
import { useSetQueryToParams } from '@/composables'
import { useServiceRevenueConversion } from '@/services'
import {
  IParamsRevenueConversion,
  IRevenueConversion,
} from '@/interfaces/revenueConversion'

export default defineComponent({
  name: 'RevenueConversion',

  components: {
    TableRevenueConversion,
    InputSearch,
    SectionLayoutContent,
    SelectStatus,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsRevenueConversion>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        status: [],
      },
    })

    return {
      params,

      ...useFetchRevenueConversions(params),
      ...useSetQueryToParams(params),
      ...useLayoutContent(),
    }
  },
})

const useFetchRevenueConversions = (params: IParamsRevenueConversion) => {
  const { all } = useServiceRevenueConversion()

  const revenueConversions = ref<IRevenueConversion[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      revenueConversions.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { revenueConversions, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Chính sách hiệu suất'
  const breadcrumbs = ['Chính sách hiệu suất', 'Quy đổi doanh thu']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
