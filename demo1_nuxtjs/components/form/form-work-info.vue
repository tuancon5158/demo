<template>
  <a-form-model
    ref="formRef"
    :label-col="{ span: 6 }"
    :model="form"
    :rules="rules"
    :wrapper-col="{ span: 14 }"
    @submit="$emit('submit')"
    @submit.native.prevent
  >
    <a-form-model-item label="Cửa hàng " prop="branch_id">
      <select-branch
        v-model="form.branch_id"
        placeholder="Cửa hàng"
      ></select-branch>
      <div class="mb-2">
        <a-checkbox v-model="form.is_treasurer">Thủ quỹ cửa hàng</a-checkbox>
      </div>
    </a-form-model-item>
    <a-form-model-item
      class="!m-0"
      :wrapper-col="{ span: 16, offset: 6 }"
      :label-col="{ offset: 6 }"
    >
      <div class="font-black">Chức danh chính</div>
    </a-form-model-item>
    <a-form-model-item ref="titles" label="Chức danh" prop="titles">
      <div class="space-y-2">
        <div
          v-for="(title, key) in form.titles"
          :key="'title_' + title.id + key"
        >
          <div v-if="key !== 0" class="font-black">
            Chức danh kiêm nhiệm {{ key }}
            <a-button
              icon="minus"
              size="small"
              :disabled="key === 0"
              @click="removePosition(key)"
            ></a-button>
          </div>
          <div class="relative">
            <select-position
              v-model="title.id"
              placeholder="Chọn chức danh"
            ></select-position>
            <span v-if="key !== 0" style="position: absolute; left: -80px">
              Chức danh :
            </span>
          </div>
          <div v-if="key === 0" class="relative">
            <select-staff
              v-model="form.direct_manager_id"
              :all="false"
              :allow-clear="false"
              placeholder="Người quản lý trực tiếp"
            ></select-staff>
            <span style="position: absolute; left: -155px">
              Người quản lý trực tiếp :
            </span>
          </div>
          <div class="relative">
            <select-level
              v-model="title.level"
              placeholder="Chọn level"
            ></select-level>
            <span style="position: absolute; left: -46px">Level :</span>
          </div>
          <div class="relative">
            <a-input
              v-model="title.document"
              placeholder="htpp://google.com"
            ></a-input>
            <span style="position: absolute; left: -113px">
              Mô tả công việc :
            </span>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <a-button type="primary" @click="addMorePosition">
          + Thêm kiêm nhiệm
        </a-button>
      </div>
    </a-form-model-item>
    <a-form-model-item label="Trạng thái" prop="status">
      {{ form.work_status_parent_detail }}
    </a-form-model-item>
    <a-form-model-item label="Trạng thái chi tiết" prop="status">
      {{ form.work_status_detail }}
    </a-form-model-item>

    <a-form-model-item label="Ngày gia nhập" prop="ddate_of_joining">
      <base-datepicker
        v-model="form.date_of_joining"
        placeholder="Ngày gia nhập"
      ></base-datepicker>
    </a-form-model-item>
    <a-form-model-item label="Ngày nghỉ việc" prop="date_end_work">
      {{ formatDateTime(form.date_end_work) }}
    </a-form-model-item>
    <a-form-model-item
      label="Thời gian tạm dừng công việc "
      prop="date_pause_work"
    >
      {{ formatDateTime(form.date_pause_work) }}
    </a-form-model-item>

    <a-form-model-item>
      <template #label>Hợp đồng lao động</template>
      <base-upload-v-2
        :file-list.sync="form.labor_contracts_files"
        folder="hrm/hr_records"
        multiple
        :type="null"
        :max="100"
      ></base-upload-v-2>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { isVnMobilePhone } from '@vt7/utils'

import SelectBranch from '../select/select-branch.vue'
import SelectPosition from '../select/select-position.vue'
import SelectLevel from '../select/select-level.vue'
import SelectStaff from '../select/select-staff.vue'
import BaseUploadV2 from '../elements/base-upload-v2.vue'
import { useForm } from '@/composables'
import { formatter, formatDateTime, openFileNewTab } from '@/utils'

const usePosition = (form: any) => {
  const addMorePosition = () => {
    form.titles.push({ id: undefined, level: undefined })
  }

  const removePosition = (key: number) => {
    form.titles.splice(key, 1)
  }

  return { addMorePosition, removePosition }
}

export default defineComponent({
  name: 'FormWorkInfo',
  components: {
    SelectBranch,
    SelectPosition,
    SelectLevel,
    SelectStaff,
    BaseUploadV2,
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    const { addMorePosition, removePosition } = usePosition(form)

    return {
      addMorePosition,
      removePosition,
      form,
      validate,
      formatter,
      openFileNewTab,
      formatDateTime,
    }
  },

  data() {
    const validatePhone = (_: any, phone: number, callback: any) => {
      if (phone) {
        if (!isVnMobilePhone(`${phone}`)) {
          callback(new Error('Không đúng định dạng số điện thoại'))
        }
      }

      callback()
    }

    return {
      rules: {
        last_name: [
          {
            required: true,
            message: 'Tên đơn vị là bắt buộc',
            trigger: 'change',
          },
        ],
        first_name: [
          {
            required: true,
            message: 'Tên đơn vị là bắt buộc',
            trigger: 'change',
          },
        ],
        parent_id: [
          {
            required: true,
            message: 'Yêu cầu đơn vị cha',
            trigger: 'change',
          },
        ],
        phone: [{ validator: validatePhone }],

        code: [
          {
            required: true,
            message: 'Mã đơn vị là bắt buộc',
            trigger: 'change',
          },
          {
            max: 8,
            message: 'Mã đơn vị không quá 8 kí tự',
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
