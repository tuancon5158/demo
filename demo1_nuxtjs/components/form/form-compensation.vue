<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 14 }"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item
      class="title"
      label="Bảng tính công"
      prop="wage_scale_id"
    >
      <a-checkbox-group v-model="form.wage_weight_id" class="w-full">
        <base-table small bordered>
          <base-table-header v-show="false">
            <base-table-header-item></base-table-header-item>
            <base-table-header-item :width="150"></base-table-header-item>
            <base-table-header-item :width="150"></base-table-header-item>
          </base-table-header>
          <base-table-body>
            <tr>
              <td class="w-50"></td>
              <td>Thang lương phục vụ</td>
              <td>
                <select-wage-scale
                  v-model="form.wage_scale_id"
                ></select-wage-scale>
              </td>
              <td>
                <span
                  v-currency="wageScaleAmount"
                  class="block text-right"
                ></span>
              </td>
            </tr>
            <tr>
              <td class="w-50" style="width: 50px"></td>
              <td>Tính theo thời gian</td>
              <td>
                <a-select v-model="form.salary_formula" class="flex-1">
                  <a-select-option :value="24">24</a-select-option>
                  <a-select-option :value="26">26</a-select-option>
                </a-select>
              </td>
              <td>
                <span v-currency="totalSalary" class="block text-right"></span>
              </td>
            </tr>
            <tr
              v-for="wageWeight in wageWeights"
              :key="wageWeight.id"
              style="border-right: 1px solid #ddd"
            >
              <td class="w-50">
                <div class="text-center">
                  <a-checkbox
                    :default-value="form.wage_weight_id"
                    :value="wageWeight.id"
                    :disabled="isDisabledWageWeight(wageWeight)"
                  ></a-checkbox>
                </div>
              </td>
              <td>{{ wageWeight.name }}</td>

              <td>
                <span class="block text-right">x {{ wageWeight.weight }}</span>
              </td>
            </tr>

            <tr>
              <td class="w-50"></td>
              <td>Lương theo giờ</td>
              <td></td>
              <td>
                <span v-currency="hourlySalary" class="block text-right"></span>
              </td>
            </tr>
          </base-table-body>
        </base-table>
      </a-checkbox-group>
    </a-form-model-item>

    <a-form-model-item label="Timesheet" prop="time_sheet_id">
      <a-radio-group
        v-model="timeSheetType"
        :options="[
          { label: 'Cố định', value: 0 },
          { label: 'Linh hoạt', value: 1 },
        ]"
      />

      <select-timesheet
        v-show="timeSheetType === 0"
        v-model="form.time_sheet_id"
      ></select-timesheet>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import SelectWageScale from '@select/select-wage-scale.vue'
import SelectTimesheet from '@select/select-timesheet.vue'
import { useForm } from '@/composables'
import {
  usePositions,
  useWageScales,
  useWageWeights,
  useWorkStatuses,
} from '@/state'
import { useGetterWorkStatus } from '@/state/useWorkStatus'
import { IProfileForm } from '@/interfaces/profile'
import { IWageWeight } from '@/interfaces/wageWeight'

const WORKING_A_DAY_DEFAULT = 8 // hour

const usePayroll = (form: IProfileForm) => {
  const { wageWeights, findWageWeight } = useWageWeights()
  const { findWageScale } = useWageScales()

  const isDisabledWageWeight = (wageWeight: IWageWeight) => {
    return (
      wageWeight.status === 0 && !form.wage_weight_id.includes(wageWeight.id)
    )
  }

  const wageScaleAmount = computed(() => {
    if (!form.wage_scale_id) return 0

    const wageScale = findWageScale(form.wage_scale_id)

    if (!wageScale) return 0

    return Number(wageScale.amount)
  })

  const totalSalary = computed(() => {
    return form.wage_weight_id.reduce((acc, wageWeightId) => {
      const wageWeight = findWageWeight(wageWeightId)

      if (!wageWeight) return acc

      acc *= Number(wageWeight.weight)

      return acc
    }, wageScaleAmount.value)
  })

  const hourlySalary = computed(() => {
    const dailySalary = totalSalary.value / form.salary_formula

    return dailySalary / WORKING_A_DAY_DEFAULT
  })

  return {
    wageWeights,
    wageScaleAmount,
    totalSalary,
    hourlySalary,
    isDisabledWageWeight,
  }
}

const useHandleWorkStatus = (form: IProfileForm) => {
  const { findWorkStatus } = useWorkStatuses()

  const { workStatusId, workStatusChildId, workStatusParent, workStatusChild } =
    useGetterWorkStatus()

  watch(
    () => form.work_status_id,
    () => {
      if (!form.work_status_id) return

      const workStatusInit = findWorkStatus(form.work_status_id)

      if (workStatusInit) {
        const hasParentId = Boolean(workStatusInit.parent_id)

        if (hasParentId) {
          workStatusId.value = workStatusInit.parent_id
          workStatusChildId.value = workStatusInit.id
        } else {
          workStatusId.value = workStatusInit.id
        }
      }
    }
  )

  const onChangeWorkStatusParent = (value: number) => {
    const hasChild = Boolean(workStatusChild.value.length)

    if (hasChild) {
      workStatusChildId.value = workStatusChild.value[0].value

      form.work_status_id = workStatusChildId.value
    } else {
      form.work_status_id = value as number
    }
  }

  const onChangeWorkStatusChild = (e: any) => {
    form.work_status_id = e.target.value
  }

  return {
    workStatusId,
    workStatusChildId,
    workStatusChild,
    workStatusParent,
    onChangeWorkStatusParent,
    onChangeWorkStatusChild,
  }
}

const usePosition = (form: IProfileForm) => {
  const { positions } = usePositions()

  const addMorePosition = () => {
    form.titles.push({ id: undefined, level: undefined })
  }

  const removePosition = (key: number) => {
    form.titles.splice(key, 1)
  }

  return { positions, addMorePosition, removePosition }
}

const useTimesheet = (form: IProfileForm) => {
  const timeSheetType = ref(0)
  const isInit = ref(false)

  watch(
    () => form.time_sheet_id,
    value => {
      if (isInit.value) return

      if (value) {
        timeSheetType.value = 0
      } else {
        timeSheetType.value = 1
      }

      isInit.value = true
    }
  )

  watch(timeSheetType, () => {
    form.time_sheet_id = null
  })

  return { timeSheetType }
}

export default defineComponent({
  name: 'FormCompensation',
  components: {
    SelectTimesheet,

    SelectWageScale,
  },
  props: {
    value: {
      type: Object as PropType<IProfileForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    const {
      wageWeights,
      totalSalary,
      wageScaleAmount,
      hourlySalary,
      isDisabledWageWeight,
    } = usePayroll(form)

    const {
      workStatusId,
      workStatusChildId,
      workStatusChild,
      workStatusParent,
      onChangeWorkStatusParent,
      onChangeWorkStatusChild,
    } = useHandleWorkStatus(form)

    const { positions, addMorePosition, removePosition } = usePosition(form)

    const { timeSheetType } = useTimesheet(form)

    const laborContracts = ref([])

    return {
      wageWeights,
      totalSalary,
      wageScaleAmount,
      hourlySalary,
      isDisabledWageWeight,

      workStatusId,
      workStatusChildId,
      workStatusChild,
      workStatusParent,
      onChangeWorkStatusParent,
      onChangeWorkStatusChild,

      positions,
      addMorePosition,
      removePosition,

      timeSheetType,

      laborContracts,

      form,
      validate,
    }
  },
  data() {
    const validateTimesheet = (
      _: any,
      time_sheet_id: number | null,
      callback: any
    ) => {
      // @ts-ignore
      if (this.timeSheetType === 0 && !time_sheet_id) {
        callback(new Error('Timesheet là bắt buộc'))
      }

      callback()
    }

    return {
      rules: {
        wage_scale_id: [
          {
            required: true,
            message: 'Thang lương là bắt buộc',
            trigger: 'change',
          },
        ],

        time_sheet_id: [
          {
            validator: validateTimesheet,
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    blurWorkStatus() {
      // @ts-ignore
      this.$refs.workStatus.onFieldBlur()
    },
    resetWorkStatus() {
      // @ts-ignore
      this.$refs.workStatus.resetField()
    },
    blurTitles() {
      // @ts-ignore
      this.$refs.titles.onFieldBlur()
    },
    changeTitles() {
      // @ts-ignore
      this.$refs.titles.onFieldChange()
    },
  },
})
</script>
