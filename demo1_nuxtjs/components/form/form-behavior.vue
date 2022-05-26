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
    <a-form-model-item label="Tên nhóm hành vi" prop="name">
      <a-input v-model="form.name" size="large"></a-input>
    </a-form-model-item>

    <a-form-model-item label="Trạng thái">
      <base-switch
        v-model="form.status"
        :active-value="1"
        :inactive-value="0"
      ></base-switch>
    </a-form-model-item>

    <a-form-model-item label="Loại" prop="type" required>
      <select-behavior-type v-model="form.type"></select-behavior-type>
    </a-form-model-item>

    <a-form-model-item label="Nhóm hành vi" prop="behavior_group_id">
      <select-behavior-group
        v-model="form.behavior_group_id"
      ></select-behavior-group>
    </a-form-model-item>

    <a-form-model-item label="Áp dụng cho" prop="apply_for" required>
      <select-behavior-apply-for
        v-model="form.apply_for"
      ></select-behavior-apply-for>
    </a-form-model-item>

    <a-form-model-item label="Mức độ" prop="level" required>
      <a-select v-model="form.level">
        <a-select-option v-for="i in 10" :key="i" :value="i">
          {{ i }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="Mô tả" prop="description">
      <a-textarea
        v-model="form.description"
        :auto-size="{ minRows: 3, maxRows: 6 }"
      ></a-textarea>
    </a-form-model-item>

    <template v-if="form.apply_for === 1 && form.apply_value">
      <a-row>
        <a-col :span="6" class="text-right leading-8">Cá nhân</a-col>
      </a-row>
      <a-form-model-item label="Điểm" prop="apply_value.user.points">
        <a-input-number
          v-model="form.apply_value.user.points"
          :formatter="formatter({ thousandsSeparator: ',' })"
          :min="0"
          class="!w-full"
          size="large"
        ></a-input-number>
      </a-form-model-item>
      <a-form-model-item label="Thu nhập (h)" prop="apply_value.user.hours">
        <a-input-number
          v-model="form.apply_value.user.hours"
          :formatter="formatter({ thousandsSeparator: ',' })"
          :min="0"
          class="!w-full"
          size="large"
        ></a-input-number>
      </a-form-model-item>
      <a-form-model-item label="Thu nhập (đ)" prop="apply_value.user.money">
        <a-input-number
          v-model="form.apply_value.user.money"
          :formatter="formatter({ thousandsSeparator: ',' })"
          :min="0"
          class="!w-full"
          size="large"
        ></a-input-number>
      </a-form-model-item>
    </template>

    <template v-if="form.apply_value">
      <a-row>
        <a-col :span="6" class="text-right leading-8">Chi nhánh</a-col>
      </a-row>
      <a-form-model-item label="Điểm" prop="apply_value.user.points">
        <a-input-number
          v-model="form.apply_value.branch.points"
          :formatter="formatter({ thousandsSeparator: ',' })"
          :min="0"
          class="!w-full"
          size="large"
        ></a-input-number>
      </a-form-model-item>
    </template>

    <button v-show="false" type="submit">Submit</button>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from '@nuxtjs/composition-api'
import SelectBehaviorType from '@select/select-behavior-type.vue'
import SelectBehaviorGroup from '@select/select-behavior-group.vue'
import SelectBehaviorApplyFor from '@select/select-behavior-apply-for.vue'
import { useForm } from '@/composables'
import { formatter } from '@/utils'
import { IBehaviorForm } from '@/interfaces/behavior'

export default defineComponent({
  name: 'FormBehavior',
  components: {
    SelectBehaviorApplyFor,
    SelectBehaviorGroup,
    SelectBehaviorType,
  },
  props: {
    value: {
      type: Object as PropType<IBehaviorForm>,
      required: true,
    },
  },
  setup(props, context) {
    const form = reactive(props.value)

    const { validate } = useForm(context)

    return { form, validate, formatter }
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: 'Tên hành vi là bắt buộc',
            trigger: 'change',
          },
        ],
        behavior_group_id: [
          {
            required: true,
            message: 'Nhóm hành vi là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
})
</script>
