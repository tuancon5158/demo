<template>
  <a-form-model
    ref="formRef"
    :model="form"
    :rules="rules"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Phòng ban/chi nhánh" prop="dept_id">
      <select-department v-model="form.dept_id"></select-department>
    </a-form-model-item>

    <a-form-model-item label="Khu vực" prop="area_id">
      <select-area v-model="form.area_id"></select-area>
    </a-form-model-item>

    <a-form-model-item
      ref="workStatus"
      label="Trạng thái công tác"
      prop="work_status_id"
    >
      <a-select
        v-model="workStatusId"
        :options="workStatusParent"
        @change="onChangeWorkStatusParent"
      ></a-select>

      <a-radio-group
        v-show="workStatusChild.length"
        v-model="workStatusChildId"
        :options="workStatusChild"
        @change="onChangeWorkStatusChild"
      />
    </a-form-model-item>

    <a-form-model-item ref="titles" label="Chức danh" prop="titles" required>
      <div class="space-y-2">
        <div
          v-for="(title, key) in form.titles"
          :key="'title_' + title.id + key"
          class="flex space-x-2"
        >
          <select-position
            v-model="title.id"
            placeholder="Chọn chức danh"
            class="flex-1"
            @change="changeTitles"
            @blur="blurTitles"
          ></select-position>
          <select-level
            v-model="title.level"
            placeholder="Chọn level"
            class="flex-1"
            @change="changeTitles"
            @blur="blurTitles"
          ></select-level>
          <a-button
            icon="minus"
            :disabled="key === 0"
            @click="removePosition(key)"
          ></a-button>
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <a-button icon="plus" @click="addMorePosition"></a-button>
      </div>
    </a-form-model-item>

    <a-form-model-item label="Bảng tính công" prop="wage_scale_id">
      <a-checkbox-group v-model="form.wage_weights" class="w-full">
        <base-table small bordered>
          <base-table-header v-show="false">
            <base-table-header-item></base-table-header-item>
            <base-table-header-item :width="150"></base-table-header-item>
            <base-table-header-item :width="150"></base-table-header-item>
          </base-table-header>
          <base-table-body>
            <tr>
              <td>Thang lương phục vụ</td>
              <td>
                <select-wage-scale
                  v-model="form.wage_scale_id"
                ></select-wage-scale>
              </td>
              <td>
                <span class="block text-right">
                  {{ wageScaleAmount | formatCurrency }} đ
                </span>
              </td>
            </tr>

            <tr v-for="wageWeight in wageWeights" :key="wageWeight.id">
              <td>{{ wageWeight.name }}</td>
              <td>
                <div class="text-center">
                  <a-checkbox
                    :value="wageWeight.id"
                    :disabled="isDisabledWageWeight(wageWeight)"
                  ></a-checkbox>
                </div>
              </td>
              <td>
                <span class="block text-right">x {{ wageWeight.weight }}</span>
              </td>
            </tr>
            <tr>
              <td>Công thức tính</td>
              <td>
                <a-select v-model="form.salary_formula" class="flex-1">
                  <a-select-option :value="24">24</a-select-option>
                  <a-select-option :value="26">26</a-select-option>
                </a-select>
              </td>
              <td>
                <span class="block text-right">
                  {{ totalSalary | formatCurrency }} đ
                </span>
              </td>
            </tr>
            <tr>
              <td>Lương theo giờ</td>
              <td></td>
              <td>
                <span class="block text-right">
                  {{ hourlySalary | formatCurrency }} đ
                </span>
              </td>
            </tr>
          </base-table-body>
        </base-table>
      </a-checkbox-group>
    </a-form-model-item>

    <a-form-model-item label="Quản lý trực tiếp" prop="direct_manager_id">
      <select-staff v-model="form.direct_manager_id"></select-staff>
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

    <a-form-model-item label="Hợp đồng lao động">
      <base-upload
        :file-list.sync="form.labor_contracts"
        folder="hrm/labor-contracts"
      ></base-upload>
    </a-form-model-item>

    <a-form-model-item label="Tải hồ sơ nhân sự">
      <base-upload
        :file-list.sync="form.hr_records"
        folder="hrm/hr-records"
      ></base-upload>
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
import SelectArea from '@select/select-area.vue'
import SelectDepartment from '@select/select-department.vue'
import SelectWageScale from '@select/select-wage-scale.vue'
import SelectPosition from '@select/select-position.vue'
import SelectLevel from '@select/select-level.vue'
import SelectStaff from '@select/select-staff.vue'
import SelectTimesheet from '@select/select-timesheet.vue'
import { useForm } from '@/composables'
import {
  usePositions,
  useWageScales,
  useWageWeights,
  useWorkStatuses,
} from '@/state'
import { useGetterWorkStatus } from '@/state/useWorkStatus'
import { formatCurrency } from '@/utils'
import { IProfileForm, ITitle } from '@/interfaces/profile'
import { IWageWeight } from '@/interfaces/wageWeight'

const WORKING_A_DAY_DEFAULT = 8 // hour

const usePayroll = (form: IProfileForm) => {
  const { wageWeights, findWageWeight } = useWageWeights()
  const { findWageScale } = useWageScales()

  const isDisabledWageWeight = (wageWeight: IWageWeight) => {
    return wageWeight.status === 0 && !form.wage_weights.includes(wageWeight.id)
  }

  const wageScaleAmount = computed(() => {
    if (!form.wage_scale_id) return 0

    const wageScale = findWageScale(form.wage_scale_id)

    if (!wageScale) return 0

    return Number(wageScale.amount)
  })

  const totalSalary = computed(() => {
    return form.wage_weights.reduce((acc, wageWeightId) => {
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
  name: 'FormProfile',
  components: {
    SelectTimesheet,
    SelectStaff,
    SelectLevel,
    SelectPosition,
    SelectWageScale,
    SelectDepartment,
    SelectArea,
  },
  filters: { formatCurrency },
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
    const validateTitles = (_: any, titles: ITitle[], callback: any) => {
      titles.forEach(title => {
        if (!title.id || !title.level) {
          callback(new Error('Chức danh và level cần nhập đầy đủ'))
        }
      })

      callback()
    }

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
        dept_id: [
          {
            required: true,
            message: 'Tên đơn vị là bắt buộc',
            trigger: 'change',
          },
        ],
        area_id: [
          {
            required: true,
            message: 'Khu vực là bắt buộc',
            trigger: 'change',
          },
        ],
        work_status_id: [
          {
            required: true,
            message: 'Trạng thái công tác là bắt buộc',
            trigger: ['change', 'blur'],
          },
        ],
        direct_manager_id: [
          {
            required: true,
            message: 'Quản lý trực tiếp là bắt buộc',
            trigger: 'change',
          },
        ],
        wage_scale_id: [
          {
            required: true,
            message: 'Thang lương là bắt buộc',
            trigger: 'change',
          },
        ],
        titles: [
          {
            validator: validateTitles,
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
