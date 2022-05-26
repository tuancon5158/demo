<template>
  <base-tooltip
    :disabled="multiple ? !internalValue.length : !internalValue"
    placement="top"
  >
    <template slot="title">
      <span>{{ placeholder }}</span>
    </template>

    <a-select
      v-model="internalValue"
      :filter-option="filterOption"
      :mode="multiple ? 'multiple' : 'default'"
      :options="options"
      :placeholder="placeholder"
      option-filter-prop="children"
      show-search
      v-bind="$attrs"
    ></a-select>
  </base-tooltip>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  toRef,
} from '@nuxtjs/composition-api'
import { useQueryValue } from '@/composables'
import { useStaffs } from '@/state'
import { removeVietnameseTones } from '@/utils'

export default defineComponent({
  name: 'SelectStaff',

  props: {
    value: {
      type: [Array, Number] as PropType<number | number[]>,
      default: undefined,
    },
    areaId: {
      type: Number,
      default: undefined,
    },
    branchId: {
      type: Number,
      default: undefined,
    },
    deptId: {
      type: Number,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Nhân viên',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { staffs } = useStaffs()

    const filteredStaffs = computed(() => {
      return staffs.value.filter(item => {
        if (!props.areaId && !props.deptId && !props.branchId) return true

        if (props.areaId && props.areaId === item.profile?.area_id) return true

        if (props.deptId && props.deptId === item.profile?.dept_id) return true

        if (props.branchId && props.branchId === item.branch?.id) return true

        return false
      })
    })
    const options = computed(() => {
      return filteredStaffs.value.map(item => ({
        value: item.id,
        label: `${item.name} - ${item.id}`,
      }))
    })
    const filterOption = (inputValue: string, option: any) => {
      if (!option.componentOptions.children[0]?.text) return false

      return removeVietnameseTones(
        option.componentOptions.children[0].text.toLowerCase()
      ).includes(removeVietnameseTones(inputValue.toLowerCase()))
    }

    return {
      options,
      filterOption,
      filteredStaffs,
      ...useQueryValue(toRef(props, 'value'), 'user_id'),
    }
  },
})
</script>
