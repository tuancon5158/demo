<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

      <table-behavior-group
        :behavior-groups="behaviorGroups"
        :loading="$fetchState.pending"
      ></table-behavior-group>

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
          @click="$router.push('/behavior-group/add')"
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
import TableBehaviorGroup from '@table/table-behavior-group/index.vue'
import { useSetQueryToParams } from '@/composables'
import { useServiceBehaviorGroup } from '@/services'
import {
  IBehaviorGroup,
  IParamsBehaviorGroup,
} from '@/interfaces/behaviorGroup'

export default defineComponent({
  name: 'BehaviorGroup',

  components: { TableBehaviorGroup, SectionLayoutContent, SelectStatus },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsBehaviorGroup>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        name: [],
        status: [],
      },
    })

    return {
      params,

      ...useLayoutContent(),
      ...useSetQueryToParams(params),
      ...useFetchBehaviorGroups(params),
    }
  },
})

export const useFetchBehaviorGroups = (params: IParamsBehaviorGroup) => {
  const { all } = useServiceBehaviorGroup()

  const behaviorGroups = ref<IBehaviorGroup[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      behaviorGroups.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { behaviorGroups, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Thi đua'
  const breadcrumbs = ['Thi đua', 'Nhóm hành vi']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
