<template>
  <base-tooltip placement="top">
    <template slot="title">
      <span>{{ placeholder }}</span>
    </template>
    <a-select
      v-model="internalValue"
      :mode="multiple ? 'multiple' : 'default'"
      :options="options"
      :allow-clear="allowClear"
      :placeholder="placeholder"
      v-bind="$attrs"
    ></a-select>
  </base-tooltip>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  toRef,
  watch,
} from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { IParamsDepartment } from '@/interfaces/department'
import { useServiceDepartment } from '@/services'
import { useLevelReportDepartment } from '@/state'

export default defineComponent({
  name: 'SelectDepartment',

  props: {
    value: {
      type: [Array, Number] as PropType<number | number[]>,
      default: undefined,
    },
    placeholder: { type: String, default: 'Đơn vị cha' },
    multiple: { type: Boolean, default: false },
    allowClear: {
      type: Boolean,
      default: true,
    },
    reportLevel: {
      type: String,
      default: `N1`,
    },
  },

  setup(props) {
    const params = reactive<IParamsDepartment>({
      search: '',
      per_page: 10,
      cur_page: 1,
      filter: { type: undefined, report_level: undefined, status: [1] },
    })

    const { levels } = useLevelReportDepartment()

    const options = ref<any[]>([])

    const { all } = useServiceDepartment()

    const getIdReport = (id: string) => {
      const index = levels.value.findIndex(item => item.value === id)

      params.filter.report_level = levels.value[index - 1].value
    }
    const fetch = async () => {
      try {
        const { data } = await all(params)

        options.value = data.departments
          .sort((a, b) => b.status - a.status)
          .map(item => ({
            value: item.id,
            label: `${
              params.filter.report_level ? params.filter.report_level : ''
            } - ${item.name}(${item.code})`,
            disabled: item.status === 0,
          }))
      } catch (e) {
        console.log({ e })
      }
    }

    if (props.reportLevel) {
      getIdReport(props.reportLevel)

      fetch()
    }

    watch(
      () => props.reportLevel,
      () => {
        getIdReport(props.reportLevel)
        fetch()
      }
    )

    fetch()

    return { options, ...useQueryValue(toRef(props, 'value'), 'dept_id') }
  },
})
</script>
