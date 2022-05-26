<template>
  <a-select
    v-model="internalValue"
    :mode="multiple ? 'multiple' : 'default'"
    :options="formattedBehaviorGroups"
    :placeholder="placeholder"
    v-bind="$attrs"
  ></a-select>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRef,
  useFetch,
} from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { useServiceBehaviorGroup } from '@/services'
import {
  IBehaviorGroup,
  IParamsBehaviorGroup,
} from '@/interfaces/behaviorGroup'

export default defineComponent({
  name: 'SelectBehaviorGroup',
  props: {
    value: {
      type: [Array, Number],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { behaviorGroups } = useFetchBehaviorGroups()

    const formattedBehaviorGroups = computed(() => {
      return behaviorGroups.value.map(item => ({
        value: item.id,
        label: item.name,
      }))
    })

    return {
      ...useQueryValue(toRef(props, 'value'), 'behavior_group_id'),
      formattedBehaviorGroups,
    }
  },
})

const useFetchBehaviorGroups = () => {
  const { all } = useServiceBehaviorGroup()

  const params = reactive<IParamsBehaviorGroup>({
    search: '',
    per_page: 9999,
    cur_page: 1,
    filter: {
      name: [],
      status: [],
    },
  })

  const behaviorGroups = ref<IBehaviorGroup[]>([])
  const total = ref(0)

  useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      behaviorGroups.value = data
      total.value = meta.total
    } catch (e) {
      console.log({ e })
    }
  })

  return { behaviorGroups, total }
}
</script>
