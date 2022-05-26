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
    <a-form-model-item label="Tên đơn vị" prop="name">
      <a-input v-model="form.name"></a-input>
    </a-form-model-item>
    <a-form-model-item
      label="Mã đơn vị"
      prop="code"
      required
      :wrapper-col="{ span: 3 }"
      :label-col="{ span: 6 }"
    >
      <a-input v-model="form.code" class="uppercase"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Loại đơn vị" prop="type" required>
      <select-type-department
        v-model="form.type"
        :all="false"
        :allow-clear="false"
        placeholder="Loại đơn vị"
      ></select-type-department>
      <!-- <select-behavior-type v-model="form.type"></select-behavior-type> -->
    </a-form-model-item>
    <a-form-model-item
      class="!m-0"
      :wrapper-col="{ span: 16, offset: 6 }"
      :label-col="{ offset: 6 }"
    >
      <div class="font-black">Địa chỉ chính</div>
    </a-form-model-item>
    <a-form-model-item label="Tỉnh, thành phố" prop="province">
      <select-address-province
        v-model="form.province"
      ></select-address-province>
    </a-form-model-item>
    <a-form-model-item label="Quận, huyện" prop="district">
      <select-address-district
        v-model="form.district"
        :province-code="form.province"
        :disabled="!form.province"
      ></select-address-district>
    </a-form-model-item>
    <a-form-model-item label="Xã, phường" prop="commune">
      <select-address-commune
        v-model="form.commune"
        :province-code="form.province"
        :district-code="form.district"
        :disabled="!form.province || !form.district"
      ></select-address-commune>
    </a-form-model-item>
    <a-form-model-item label="Địa chỉ " prop="address">
      <a-input v-model="form.address"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Số điện thoại" prop="phone">
      <a-input v-model="form.phone"></a-input>
    </a-form-model-item>

    <a-form-model-item
      class="!m-0"
      :wrapper-col="{ span: 16, offset: 6 }"
      :label-col="{ offset: 6 }"
    >
      <div class="font-black">Thông tin quản trị</div>
    </a-form-model-item>
    <a-form-model-item label="Cấp báo cáo " prop="report_level">
      <select-level-report
        v-model="form.report_level"
        :all="false"
        :allow-clear="false"
        placeholder="Cấp báo cáo"
      ></select-level-report>
    </a-form-model-item>
    <a-form-model-item
      v-if="form.report_level !== 'N1'"
      label="Đơn vị cha"
      prop="parent_id"
    >
      <select-department
        v-model="form.parent_id"
        :all="false"
        :allow-clear="true"
        :report-level="form.report_level"
        placeholder="Cấp báo cáo"
      ></select-department>
    </a-form-model-item>
    <template v-if="form.id">
      <a-form-model-item label="Thời gian tạo" prop="created_at">
        {{ formatDateTime(form.created_at) }}
      </a-form-model-item>
      <a-form-model-item label="Cập nhật gần nhất " prop="updated_at">
        {{ formatDateTime(form.updated_at) }}
      </a-form-model-item>
      <a-form-model-item label="Người cập nhật" prop="report_level">
        {{ form.created_by_user.name }}
      </a-form-model-item>
    </template>
    <a-form-model-item label="Tài liệu" prop="document">
      <a-input
        v-model="form.document"
        placeholder="http://googlesheet.com/"
        :allow-clear="true"
      >
        <a-icon
          slot="addonAfter"
          :rotate="90"
          style="opacity: 0.85"
          type="select"
          @click="openFileNewTab(form.document)"
        />
      </a-input>
    </a-form-model-item>

    <a-form-model-item label="Chức năng" prop="feature">
      <a-textarea
        v-model="form.feature"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      ></a-textarea>
    </a-form-model-item>
    <a-form-model-item label="Nhiệm vụ" prop="tasks">
      <a-textarea
        v-model="form.tasks"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      ></a-textarea>
    </a-form-model-item>
    <a-form-model-item label="Ghi chú" prop="note">
      <a-textarea
        v-model="form.note"
        :auto-size="{ minRows: 1, maxRows: 3 }"
      ></a-textarea>
    </a-form-model-item>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  watch,
} from '@nuxtjs/composition-api'
import { isVnMobilePhone } from '@vt7/utils'
import SelectAddressCommune from '../select/select-address-commune.vue'
import SelectAddressDistrict from '../select/select-address-district.vue'
import SelectAddressProvince from '../select/select-address-province.vue'
import SelectTypeDepartment from '../select/select-type-department.vue'
import SelectDepartment from '../select/select-department.vue'
import SelectLevelReport from '../select/select-level-report.vue'
import { useForm } from '@/composables'
import { formatter, formatDateTime, openFileNewTab } from '@/utils'

import { IDepartmentForm } from '@/interfaces/department'

export default defineComponent({
  name: 'FormDepartment',
  components: {
    SelectAddressCommune,
    SelectAddressDistrict,
    SelectAddressProvince,
    SelectTypeDepartment,
    SelectLevelReport,
    SelectDepartment,
  },

  props: {
    value: {
      type: Object as PropType<IDepartmentForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    watch(
      () => form.province,
      () => {
        form.district = undefined
        form.commune = undefined
      }
    )

    watch(
      () => form.district,
      () => (form.commune = undefined)
    )
    const { validate } = useForm(context)

    return { form, validate, formatter, openFileNewTab, formatDateTime }
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
        name: [
          {
            required: true,
            message: 'Tên đơn vị là bắt buộc',
            trigger: 'change',
          },
        ],
        report_level: [
          {
            required: true,
            message: 'Yêu cầu cấp báo cáo',
            trigger: 'change',
          },
        ],
        feature: [
          {
            required: true,
            message: 'Chức năng là bắt buộc',
            trigger: 'change',
          },
        ],
        tasks: [
          {
            required: true,
            message: 'Nhiệm vụ là bắt buộc',
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
})
</script>
