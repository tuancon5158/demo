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
    <a-form-model-item prop="avatar_files">
      <template #label>Avatar</template>
      <base-upload-v-2
        :file-list.sync="form.avatar_files"
        :multiple="false"
        :title="`Tải ảnh lên`"
        :max="1"
        :type="`picture-card`"
        folder="hrm/income-amounts"
      ></base-upload-v-2>
    </a-form-model-item>
    <a-form-model-item label="Họ và tên đệm" prop="first_name">
      <a-input v-model="form.first_name"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Tên(Không có khoảng trắng)" prop="last_name">
      <a-input v-model="form.last_name"></a-input>
    </a-form-model-item>
    <a-form-model-item
      v-if="form.id"
      label="Mã nhân sự"
      prop="code"
      required
      :wrapper-col="{ span: 3 }"
      :label-col="{ span: 6 }"
    >
      <a-input v-model="form.code" class="uppercase"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Ngày sinh" prop="dob">
      <base-datepicker
        v-model="form.dob"
        placeholder="Chọn ngày sinh"
      ></base-datepicker>
    </a-form-model-item>
    <a-form-model-item label="Chọn giới tính" prop="gender">
      <select-gender
        v-model="form.gender"
        :all="false"
        :allow-clear="false"
        placeholder="Chọn giới tính"
      ></select-gender>
      <!-- <select-behavior-type v-model="form.type"></select-behavior-type> -->
    </a-form-model-item>
    <a-form-model-item
      label="CMT/CCCD"
      prop="cmnd"
      :wrapper-col="{ span: 3 }"
      :label-col="{ span: 6 }"
    >
      <a-input v-model="form.cmnd"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Hình ảnh CMT/CCCD" prop="cmnd_files">
      <div class="relative">
        <base-upload-v-2
          :title="`Tải ảnh lên`"
          :max="2"
          :type="`picture-card`"
          :file-list.sync="form.cmnd_files"
          folder="hrm/income-amounts"
        ></base-upload-v-2>
        <span
          class="font-black"
          style="position: absolute; left: -255px; top: 22px"
        >
          Up theo thứ tự Mặt trước - Mặt sau
        </span>
      </div>
      <!-- <div></div> -->
    </a-form-model-item>
    <a-form-model-item label="Nơi cấp" prop="place_of_issue">
      <a-input v-model="form.place_of_issue"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Ngày cấp" prop="date_of_issue">
      <base-datepicker
        v-model="form.date_of_issue"
        placeholder="Chọn ngày cấp "
      ></base-datepicker>
    </a-form-model-item>

    <a-form-model-item label="Số điện thoại" prop="phone">
      <a-input v-model="form.phone"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Email cá nhân" prop="email">
      <a-input v-model="form.email"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Email công việc" prop="email_business">
      <a-input v-model="form.email_business"></a-input>
    </a-form-model-item>
    <a-form-model-item
      v-if="form.id"
      label="Mã số thuế cá nhân"
      prop="personal_tax_code"
    >
      <a-input v-model="form.personal_tax_code"></a-input>
    </a-form-model-item>
    <a-form-model-item
      v-if="form.id"
      label="Số sổ bảo hiểm"
      prop="code_insurance_book"
    >
      <a-input v-model="form.code_insurance_book"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Mật khẩu" prop="password">
      <a-input v-model="form.password"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Trình độ học vấn" prop="literacy" required>
      <select-literacy
        v-model="form.literacy"
        :all="false"
        :allow-clear="false"
        placeholder="Trình độ học vấn"
      ></select-literacy>
    </a-form-model-item>

    <a-form-model-item label="Ngày gia nhập công ty" prop="date_of_joining">
      <base-datepicker
        v-model="form.date_of_joining"
        placeholder="Chọn ngày cấp "
      ></base-datepicker>
    </a-form-model-item>

    <a-form-model-item
      label="Trạng thái công việc"
      prop="work_status_id"
      required
    >
      {{ form.work_status_detail }}
    </a-form-model-item>

    <a-form-model-item
      class="!m-0"
      :wrapper-col="{ span: 16, offset: 6 }"
      :label-col="{ offset: 6 }"
    >
      <div class="font-black">Thông tin công việc</div>
    </a-form-model-item>

    <a-form-model-item
      v-if="!form.id"
      label="Đơn vị  công tác"
      prop="dept_id"
      required
    >
      <select-department
        v-model="form.dept_id"
        :all="false"
        :allow-clear="false"
        placeholder="Đơn vị công tác"
      ></select-department>
    </a-form-model-item>
    <a-form-model-item
      v-if="!form.id"
      ref="titles"
      label="Chức danh"
      prop="titles"
      required
    >
      <div class="space-y-2">
        <div
          v-for="(title, key) in form.titles"
          :key="'title_' + title.id + key"
          class=""
        >
          <select-position
            v-model="title.id"
            placeholder="Chọn chức danh"
            class="flex-1"
            @change="changeTitles"
            @blur="blurTitles"
          ></select-position>
          <div class="relative">
            <select-level
              v-model="title.level"
              placeholder="Chọn level"
              class="flex-1"
              @change="changeTitles"
              @blur="blurTitles"
            ></select-level>
            <span style="position: absolute; left: -46px">Level :</span>
          </div>
        </div>
      </div>
    </a-form-model-item>

    <a-form-model-item
      label="Người quản lý trược tiếp"
      prop="direct_manager_id"
      required
    >
      <select-staff
        v-model="form.direct_manager_id"
        :all="false"
        :allow-clear="false"
        placeholder="Người quản lý trực tiếp"
      ></select-staff>
    </a-form-model-item>
    <a-form-model-item
      class="!m-0"
      :wrapper-col="{ span: 16, offset: 6 }"
      :label-col="{ offset: 6 }"
    >
      <div class="font-black">Nơi tạm trú (*)</div>
    </a-form-model-item>
    <a-form-model-item
      label="Tỉnh, thành phố"
      prop="temporary_residence_province"
    >
      <select-address-province
        v-model="form.temporary_residence_province"
      ></select-address-province>
    </a-form-model-item>
    <a-form-model-item label="Quận, huyện" prop="temporary_residence_district">
      <select-address-district
        v-model="form.temporary_residence_district"
        :province-code="form.temporary_residence_province"
        :disabled="!form.temporary_residence_province"
      ></select-address-district>
    </a-form-model-item>
    <a-form-model-item
      label="Xã, phường, thị trấn "
      prop="temporary_residence_commune"
    >
      <select-address-commune
        v-model="form.temporary_residence_commune"
        :province-code="form.temporary_residence_province"
        :district-code="form.temporary_residence_district"
        :disabled="
          !form.temporary_residence_province ||
          !form.temporary_residence_district
        "
      ></select-address-commune>
    </a-form-model-item>
    <a-form-model-item label="Số nhà , ngõ " prop="temporary_street">
      <a-input v-model="form.temporary_street"></a-input>
    </a-form-model-item>

    <a-form-model-item
      class="!m-0"
      :wrapper-col="{ span: 16, offset: 6 }"
      :label-col="{ offset: 6 }"
    >
      <div class="font-black">Nơi thường trú trú (*)</div>
    </a-form-model-item>
    <a-form-model-item
      label="Tỉnh, thành phố"
      prop="permanent_residence_province"
    >
      <select-address-province
        v-model="form.permanent_residence_province"
      ></select-address-province>
    </a-form-model-item>
    <a-form-model-item label="Quận, huyện" prop="permanent_residence_district">
      <select-address-district
        v-model="form.permanent_residence_district"
        :province-code="form.permanent_residence_province"
        :disabled="!form.permanent_residence_province"
      ></select-address-district>
    </a-form-model-item>
    <a-form-model-item
      label="Xã, phường, thị trấn "
      prop="permanent_residence_commune"
    >
      <select-address-commune
        v-model="form.permanent_residence_commune"
        :province-code="form.permanent_residence_province"
        :district-code="form.permanent_residence_district"
        :disabled="
          !form.permanent_residence_province ||
          !form.permanent_residence_district
        "
      ></select-address-commune>
    </a-form-model-item>
    <a-form-model-item label="Số nhà , ngõ " prop="permanent_street">
      <a-input v-model="form.permanent_street"></a-input>
    </a-form-model-item>
    <a-form-model-item v-if="form.id">
      <template #label>Hồ sơ nhân sự</template>
      <base-upload-v-2
        :file-list.sync="form.hr_files"
        folder="hrm/hr_records"
        multiple
        :type="null"
        :max="100"
      ></base-upload-v-2>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'
import { isVnMobilePhone } from '@vt7/utils'
import SelectPosition from '../select/select-position.vue'
import SelectLevel from '../select/select-level.vue'

import SelectAddressCommune from '../select/select-address-commune.vue'
import SelectAddressDistrict from '../select/select-address-district.vue'
import SelectAddressProvince from '../select/select-address-province.vue'
import SelectGender from '../select/select-gender.vue'
import SelectStaff from '../select/select-staff.vue'
import SelectLiteracy from '../select/select-literacy.vue'
import SelectDepartment from '../select/select-department.vue'
import BaseUploadV2 from '../elements/base-upload-v2.vue'
import { useForm } from '@/composables'
import { formatter, formatDateTime, openFileNewTab } from '@/utils'

export default defineComponent({
  name: 'FormStaff',
  components: {
    SelectAddressCommune,
    SelectAddressDistrict,
    SelectAddressProvince,
    SelectPosition,
    SelectLevel,
    SelectStaff,
    SelectGender,
    SelectLiteracy,
    SelectDepartment,
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
    const validateStartWith = (_: any, text: string, callback: any) => {
      if (text) {
        if (!text.toLowerCase().startsWith('t')) {
          callback(new Error('Mã nhân sự bắt đầu bằng chữ T'))
        }
      }

      callback()
    }

    const validatePhone = (_: any, phone: number, callback: any) => {
      if (phone) {
        if (!isVnMobilePhone(`${phone}`)) {
          callback(new Error('Không đúng định dạng số điện thoại'))
        }
      }

      callback()
    }
    const validateWhiteSpace = (_: any, text: string, callback: any) => {
      if (text) {
        if (text.includes(' ')) {
          callback(new Error('Tên không được có khoảng trắng'))
        }
      }

      callback()
    }

    return {
      rules: {
        last_name: [
          {
            required: true,
            message: 'Tên là bắt buộc',
            trigger: 'change',
          },
          {
            validator: validateWhiteSpace,
          },
        ],
        first_name: [
          {
            required: true,
            message: 'Họ và tên đệm là bắt buộc',
            trigger: 'change',
          },
        ],
        avatar_files: [
          {
            required: true,
            message: 'Avatar là bắt buộc',
            trigger: 'change',
          },
        ],
        cmnd_files: [
          {
            required: true,
            message: 'Cmnd là bắt buộc',
            trigger: 'change',
          },
        ],
        phone: [
          {
            required: true,
            message: 'Số điện thoại là bắt buộc',
            trigger: 'change',
          },
          { validator: validatePhone },
        ],
        gender: [
          {
            required: true,
            message: 'Giới tính là bắt buộc',
            trigger: 'change',
          },
        ],
        cmnd: [
          {
            required: true,
            message: 'Chứng minh nhân dân là bắt buộc',
            trigger: 'change',
          },
        ],
        date_of_issue: [
          {
            required: true,
            message: 'Ngày cấp là bắt buộc',
            trigger: 'change',
          },
        ],
        place_of_issue: [
          {
            required: true,
            message: 'Nơi cấp là bắt buộc',
            trigger: 'change',
          },
        ],
        date_of_joining: [
          {
            required: true,
            message: 'Ngày  cấp là bắt buộc',
            trigger: 'change',
          },
        ],
        direct_manager_id: [
          {
            required: true,
            message: 'Người quản lý trực tiếp là bắt buộc',
            trigger: 'change',
          },
        ],
        dept_id: [
          {
            required: true,
            message: 'Đơn vị công tác là bắt buộc',
            trigger: 'change',
          },
        ],
        literacy: [
          {
            required: true,
            message: 'Trình độ học vấn  là bắt buộc',
            trigger: 'change',
          },
        ],
        code: [
          {
            required: true,
            message: 'Mã nhân sự là bắt buộc',
            trigger: 'change',
          },
          {
            validator: validateStartWith,
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
