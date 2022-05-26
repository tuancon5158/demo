<template>
  <a-form-model
    ref="formRef"
    :label-col="{ span: 6 }"
    :model="form"
    :wrapper-col="{ span: 16 }"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item :rules="rules.name" label="Tên chính sách" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item
      :rules="rules.time_check"
      label="Kỳ áp dụng"
      prop="time_check"
    >
      <div>
        <a-radio-group
          v-model="form.apply_for_account"
          :options="applyForAccounts"
        />
      </div>

      <div class="mb-2">
        <a-checkbox v-model="form.time_check">
          Có thời hạn bắt đầu và kết thúc
        </a-checkbox>
      </div>

      <div v-show="form.time_check" class="fbc space-x-2">
        <base-datepicker
          v-model="form.from_date"
          :disabled-date="disabledStartDate"
          placeholder="Chọn ngày bắt đầu"
          @openChange="handleStartOpenChange"
        ></base-datepicker>

        <base-datepicker
          v-model="form.to_date"
          :disabled-date="disabledEndDate"
          :open="endOpen"
          placeholder="Chọn ngày kết thúc"
          @openChange="handleEndOpenChange"
        ></base-datepicker>
      </div>
    </a-form-model-item>

    <a-form-model-item label="Trạng thái">
      <base-switch
        v-model="form.status"
        :active-value="1"
        :inactive-value="0"
      ></base-switch>
    </a-form-model-item>

    <a-form-model-item label="Mô tả" prop="note">
      <a-textarea
        v-model="form.note"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      ></a-textarea>
    </a-form-model-item>

    <hr />

    <div class="font-bold mt-3">Cài đặt chính sách</div>

    <a-form-model-item :rules="rules.type" label="Loại" prop="type">
      <select-policy-type
        v-model="form.type"
        @change="onChangeType"
      ></select-policy-type>
    </a-form-model-item>

    <template v-if="isSell(form.type)">
      <a-form-model-item class="mt-2" label="Áp dụng cho" prop="role">
        <a-radio-group v-model="form.apply_for" :options="applyForTypes" />
      </a-form-model-item>

      <a-form-model-item v-if="form.apply_for === 3" label="Nhóm sản phẩm">
        <select-product-group
          v-model="form.product_group_ids"
          multiple
          placeholder="Tìm nhóm sản phẩm"
          size="large"
        ></select-product-group>
      </a-form-model-item>
    </template>

    <template v-if="isService(form.type)">
      <a-form-model-item label="Khi thực hiện vai trò" prop="role">
        <select-policy-role v-model="form.role"></select-policy-role>
      </a-form-model-item>

      <a-form-model-item label="Trên các phiếu" prop="model_names">
        <a-checkbox-group
          v-model="form.model_names"
          class="!grid grid-cols-3 gap-2"
        >
          <a-checkbox
            v-for="policyModelName in policyModelNames"
            :key="policyModelName.code"
            :value="policyModelName.code"
          >
            {{ policyModelName.name }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
    </template>

    <a-form-model-item :wrapper-col="{ xs: { span: 24, offset: 0 } }">
      <base-table v-if="isService(form.type)" small>
        <base-table-header>
          <base-table-header-item>Đối tượng áp dụng</base-table-header-item>
          <base-table-header-item :width="200">
            Thu nhập (%)
          </base-table-header-item>
          <base-table-header-item :width="200">
            Thu nhập
            <span class="text-[9px]">
              <span v-if="form.role === 'SHIPPING'">(đ / km)</span>
              <span v-else>(đ / lượt)</span>
            </span>
          </base-table-header-item>
          <base-table-header-item :width="200">
            Điểm thưởng
            <span class="text-[9px]">(điểm / lượt)</span>
          </base-table-header-item>
          <base-table-header-item :width="100">Actions</base-table-header-item>
        </base-table-header>
        <base-table-body>
          <tr v-for="(title, index) in form.titles" :key="title.id">
            <td>
              <div class="mb-6">{{ findPosition(title.id).name }}</div>
            </td>
            <td>
              <a-form-model-item
                :prop="`titles[${index}].percents`"
                :rules="genRuleTitlePercents(title)"
              >
                <a-input-number
                  v-model="title.percents"
                  :formatter="formatter({ thousandsSeparator: ',' })"
                  class="!w-full"
                ></a-input-number>
              </a-form-model-item>
            </td>
            <td>
              <a-form-model-item
                :prop="`titles[${index}].dongs`"
                :rules="genRuleTitleDongs(title)"
              >
                <a-input-number
                  v-model="title.dongs"
                  :formatter="formatter({ thousandsSeparator: ',' })"
                  class="!w-full"
                ></a-input-number>
              </a-form-model-item>
            </td>
            <td>
              <a-form-model-item
                :prop="`titles[${index}].points`"
                :rules="genRuleTitlePoints(title)"
              >
                <a-input-number
                  v-model="title.points"
                  :formatter="formatter({ thousandsSeparator: ',' })"
                  class="!w-full"
                ></a-input-number>
              </a-form-model-item>
            </td>
            <td>
              <a-button
                class="mb-6"
                icon="close"
                type="danger"
                @click="onRemoveTitle(index)"
              ></a-button>
            </td>
          </tr>
          <tr></tr>
        </base-table-body>
      </base-table>

      <base-table v-if="isSell(form.type)" small>
        <base-table-header>
          <base-table-header-item>Đối tượng áp dụng</base-table-header-item>
          <base-table-header-item :width="200">
            Thu nhập
            <span class="text-[9px]">(%)</span>
          </base-table-header-item>
          <base-table-header-item :width="200">
            Điểm thưởng
            <span class="text-[9px]">(điểm / triệu đồng)</span>
          </base-table-header-item>
          <base-table-header-item :width="200">Actions</base-table-header-item>
        </base-table-header>
        <base-table-body>
          <tr v-for="(title, index) in form.titles" :key="title.id">
            <td>
              <div class="mb-6">{{ findPosition(title.id).name }}</div>
            </td>
            <td>
              <a-form-model-item
                :prop="`titles[${index}].percents`"
                :rules="genRuleTitlePercents(title)"
              >
                <a-input-number
                  v-model="title.percents"
                  :formatter="formatter({ thousandsSeparator: ',' })"
                  class="!w-full"
                ></a-input-number>
              </a-form-model-item>
            </td>
            <td>
              <a-form-model-item
                :prop="`titles[${index}].points`"
                :rules="genRuleTitlePoints(title)"
              >
                <a-input-number
                  v-model="title.points"
                  :formatter="formatter({ thousandsSeparator: ',' })"
                  class="!w-full"
                ></a-input-number>
              </a-form-model-item>
            </td>
            <td>
              <a-button
                class="mb-6"
                icon="close"
                type="danger"
                @click="onRemoveTitle(index)"
              ></a-button>
            </td>
          </tr>
          <tr></tr>
        </base-table-body>
      </base-table>
    </a-form-model-item>

    <a-form-model-item
      :rules="rules.titles"
      :wrapper-col="{ xs: { span: 6, offset: 0 } }"
      prop="titles"
    >
      <select-position
        placeholder="Tìm và thêm đối tượng"
        @change="onChangeTitle"
      ></select-position>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRef,
} from '@nuxtjs/composition-api'
import SelectPolicyType from '@select/select-policy-type.vue'
import SelectPolicyRole from '@select/select-policy-role.vue'
import SelectPosition from '@select/select-position.vue'
import SelectProductGroup from '@select/select-product-group.vue'
import { useDatePickerRange, useForm } from '@/composables'
import {
  useApplyForAccount,
  useApplyForType,
  usePolicyModelNames,
  usePolicyType,
  usePositions,
} from '@/state'
import { formatter } from '@/utils'
import { IPolicyForm, ITitle } from '@/interfaces/policy'

export default defineComponent({
  name: 'FormPolicy',
  components: {
    SelectProductGroup,
    SelectPosition,
    SelectPolicyRole,
    SelectPolicyType,
  },
  props: {
    value: {
      type: Object as PropType<IPolicyForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)
    const { applyForAccounts } = useApplyForAccount()
    const { isSell, isService } = usePolicyType()
    const { applyForTypes } = useApplyForType()
    const { policyModelNames } = usePolicyModelNames()
    const { findPosition } = usePositions()
    const {
      endOpen,
      handleStartOpenChange,
      handleEndOpenChange,
      disabledStartDate,
      disabledEndDate,
    } = useDatePickerRange({
      startDate: toRef(form, 'from_date'),
      endDate: toRef(form, 'to_date'),
    })

    const onChangeType = () => {
      form.titles = []
    }

    const onChangeTitle = (id: number) => {
      if (isSell(form.type)) {
        form.titles.push({
          id,
          percents: 0,
          points: 0,
        })
      }

      if (isService(form.type)) {
        form.titles.push({
          id,
          dongs: 0,
          points: 0,
        })
      }
    }

    const onRemoveTitle = (index: number) => {
      form.titles.splice(index, 1)
    }

    return {
      form,
      validate,
      applyForAccounts,
      isSell,
      isService,
      applyForTypes,
      policyModelNames,
      onChangeType,
      onChangeTitle,
      onRemoveTitle,
      findPosition,

      endOpen,
      handleStartOpenChange,
      handleEndOpenChange,
      disabledStartDate,
      disabledEndDate,
    }
  },
  data() {
    const validateTimeCheck = (_: any, timeCheck: boolean, callback: any) => {
      if (timeCheck) {
        // @ts-ignore
        if (!this.form.from_date && !this.form.to_date) {
          callback(new Error('Ngày bắt đầu và ngày kết thúc là bắt buộc'))
        }

        // @ts-ignore
        if (!this.form.from_date) {
          callback(new Error('Ngày bắt đầu là bắt buộc'))
        }

        // @ts-ignore
        if (!this.form.to_date) {
          callback(new Error('Ngày kết thúc là bắt buộc'))
        }
      }

      callback()
    }

    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Tên chính sách là bắt buộc',
            trigger: 'change',
          },
        ],
        type: [
          {
            required: true,
            message: 'Loại vai trò là bắt buộc',
            trigger: 'change',
          },
        ],
        titles: [
          {
            type: 'array',
            required: true,
            message: 'Đối tượng là bắt buộc',
            trigger: 'change',
          },
        ],
        time_check: [
          {
            validator: validateTimeCheck,
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    formatter,
    genRuleTitlePoints(title: ITitle) {
      const validateTitlesTable = (_: any, points: number, callback: any) => {
        if (this.isSell(this.form.type)) {
          if (!title.percents && !points) {
            callback(new Error('Điểm thưởng là bắt buộc'))
          }
        }

        if (this.isService(this.form.type)) {
          if (!title.dongs && !points) {
            callback(new Error('Điểm thưởng là bắt buộc'))
          }
        }

        callback()
      }

      return [{ validator: validateTitlesTable, trigger: 'change' }]
    },
    genRuleTitleDongs(title: ITitle) {
      const validateTitlesTable = (_: any, dongs: number, callback: any) => {
        if (!title.points && !dongs) {
          callback(new Error('Tiền thưởng là bắt buộc'))
        }

        callback()
      }

      return [{ validator: validateTitlesTable, trigger: 'change' }]
    },
    genRuleTitlePercents(title: ITitle) {
      const validateTitlesTable = (_: any, percents: number, callback: any) => {
        if (!title.points && !percents) {
          callback(new Error('Thu nhập là bắt buộc'))
        }

        callback()
      }

      return [{ validator: validateTitlesTable, trigger: 'change' }]
    },
  },
})
</script>
