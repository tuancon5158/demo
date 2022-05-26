<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <input-search v-model="params.search"></input-search>

        <base-tooltip
          :disabled="!params.filter.career_path.length"
          placement="top"
        >
          <template slot="title">
            <span>Chức danh</span>
          </template>
          <select-orientation
            v-model="params.filter.career_path"
            multiple
          ></select-orientation>
        </base-tooltip>

        <base-tooltip :disabled="!params.filter.status.length" placement="top">
          <template slot="title">
            <span>Trạng thái sử dung</span>
          </template>
          <select-status
            v-model="params.filter.status"
            multiple
          ></select-status>
        </base-tooltip>
      </div>

      <table-position
        :loading="$fetchState.pending"
        :positions="positions"
      ></table-position>

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
          @click="$router.push('/position/add')"
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
import SelectOrientation from '@select/select-orientation.vue'
import SelectStatus from '@select/select-status.vue'
import TablePosition from '@table/table-position/index.vue'
import { useServicePosition } from '@/services'
import { IParamsPosition, IPosition } from '@/interfaces/position'
import { useSetQueryToParams } from '@/composables'

export default defineComponent({
  name: 'Position',

  components: {
    InputSearch,
    TablePosition,
    SectionLayoutContent,
    SelectStatus,
    SelectOrientation,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsPosition>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        career_path: [],
        status: [],
      },
    })

    return {
      params,
      ...useSetQueryToParams(params),
      ...useFetchPotions(params),
      ...useLayoutContent(),
    }
  },
})

export const useFetchPotions = (params: IParamsPosition) => {
  const { all } = useServicePosition()

  const positions = ref<IPosition[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      positions.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { positions, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Tổ chức'
  const breadcrumbs = ['Tổ chức', 'Chức danh']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
