<template>
  <section-layout-content v-bind="content">
    <div class="p-4 space-y-4">
      <div class="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <input-search v-model="params.search"></input-search>

        <base-tooltip :disabled="!params.filter.type.length" title="Loại">
          <select-behavior-type
            v-model="params.filter.type"
            multiple
            placeholder="Loại"
          ></select-behavior-type>
        </base-tooltip>

        <base-tooltip
          :disabled="!params.filter.behavior_group_id.length"
          title="Nhóm hành vi"
        >
          <select-behavior-group
            v-model="params.filter.behavior_group_id"
            multiple
            placeholder="Nhóm hành vi"
          ></select-behavior-group>
        </base-tooltip>

        <base-tooltip
          :disabled="!params.filter.status.length"
          title="Trạng thái sử dung"
        >
          <select-status
            v-model="params.filter.status"
            multiple
            placeholder="Trạng thái sử dung"
          ></select-status>
        </base-tooltip>
      </div>

      <table-behavior
        :behaviors="behaviors"
        :loading="$fetchState.pending"
      ></table-behavior>

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
          @click="$router.push('/behavior/add')"
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
import SelectBehaviorType from '@select/select-behavior-type.vue'
import SelectBehaviorGroup from '@select/select-behavior-group.vue'
import SectionLayoutContent from '@common/section-layout-content.vue'
import InputSearch from '@common/input-search.vue'
import TableBehavior from '@table/table-behavior/index.vue'
import { useSetQueryToParams } from '@/composables'
import { useServiceBehavior } from '@/services'
import { IBehavior, IParamsBehavior } from '@/interfaces/behavior'

export default defineComponent({
  name: 'Behavior',

  components: {
    TableBehavior,
    InputSearch,
    SectionLayoutContent,
    SelectBehaviorGroup,
    SelectBehaviorType,
    SelectStatus,
  },

  middleware: 'admin',

  setup() {
    const params = reactive<IParamsBehavior>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: {
        status: [],
        type: [],
        user_id: [],
        branch_id: [],
        behavior_group_id: [],
        time_to: '',
        time_from: '',
      },
    })

    return {
      params,

      ...useFetchBehaviors(params),
      ...useSetQueryToParams(params),
      ...useLayoutContent(),
    }
  },
})

export const useFetchBehaviors = (params: IParamsBehavior) => {
  const { all } = useServiceBehavior()

  const behaviors = ref<IBehavior[]>([])
  const total = ref(0)

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      behaviors.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { behaviors, total, fetch }
}

const useLayoutContent = () => {
  const title = 'Thi đua'
  const breadcrumbs = ['Thi đua', 'Danh sách hành vi']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
