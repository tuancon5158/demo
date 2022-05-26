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
    <a-form-model-item label="Tên chức danh" prop="name">
      <a-input v-model="form.name"></a-input>
    </a-form-model-item>
    <a-form-model-item
      label="Mã chức danh"
      prop="code"
      required
      :wrapper-col="{ span: 3 }"
      :label-col="{ span: 6 }"
    >
      <a-input v-model="form.code" class="uppercase"></a-input>
    </a-form-model-item>
    <a-form-model-item label="Số cấp tối đa" prop="max_level" required>
      <a-input v-model.number="form.max_level" type="number"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Cấp cán bộ " prop="cadre_level">
      <select-cadre-level
        v-model="form.cadre_level"
        :all="false"
        :allow-clear="false"
        placeholder="Cấp cán bộ"
      ></select-cadre-level>
    </a-form-model-item>
    <a-form-model-item label="Ngạch " prop="career_path">
      <select-career-path
        v-model="form.career_path"
        :all="false"
        :allow-clear="false"
        placeholder="Ngạch"
      ></select-career-path>
    </a-form-model-item>
    <a-form-model-item label="Nhóm " prop="group">
      <select-group-titles
        v-model="form.group"
        :all="false"
        :allow-clear="false"
        placeholder="Nhóm"
      ></select-group-titles>
    </a-form-model-item>
    <a-form-model-item v-if="form.id" label="Định biên" prop="boundary">
      <a-row :gutter="10">
        <a-col :span="9">
          <a-input
            v-model.number="form.boundary"
            type="number"
            class="col-span-3"
            :addon-after="`Hiện tại ${form.total_staff}`"
          ></a-input>
        </a-col>
        <a-col :span="12">
          <a-checkbox v-model="form.is_cross_boundary" class="col-span-3">
            Không cho phép vượt quá định biên
          </a-checkbox>
        </a-col>
      </a-row>
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

    <a-form-model-item label="Mô tả công việc" prop="document">
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
import SelectGroupTitles from '../select/select-group-titles.vue'
import SelectCareerPath from '../select/select-career-path.vue'
import SelectCadreLevel from '../select/select-cadre-level.vue'
import { useForm } from '@/composables'
import { formatter, formatDateTime, openFileNewTab } from '@/utils'

import { IDepartmentForm } from '@/interfaces/department'

export default defineComponent({
  name: 'FormDepartment',
  components: { SelectGroupTitles, SelectCareerPath, SelectCadreLevel },

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
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Tên chức danh là bắt buộc',
            trigger: 'change',
          },
        ],
        cadre_level: [
          {
            required: true,
            message: 'Cấp cán bộ là bắt buộc',
            trigger: 'change',
          },
        ],
        career_path: [
          {
            required: true,
            message: 'Ngách là bắt buộc',
            trigger: 'change',
          },
        ],
        group: [
          {
            required: true,
            message: 'Nhóm là bắt buộc',
            trigger: 'change',
          },
        ],
        boundary: [
          {
            required: true,
            message: 'Định biên là bắt buộc',
            trigger: 'change',
          },
        ],
        document: [
          {
            required: true,
            message: 'Mô tả công việc là bắt buộc',
            trigger: 'change',
          },
        ],
        code: [
          {
            required: true,
            message: 'Mã chức danh là bắt buộc',
            trigger: 'change',
          },
          {
            max: 8,
            message: 'Mã chức danh không quá 8 kí tự',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
