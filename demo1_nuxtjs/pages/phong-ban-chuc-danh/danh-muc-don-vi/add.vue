<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Tạo đơn vị"
    width="70%"
    @ok="handleSubmit"
  >
    <form-department
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-department>

    <template slot="footer">
      <a-button key="back" @click="visible = false">Huỷ bỏ</a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        Xác nhận
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import FormDepartment from '@form/form-department.vue'
import { useForm, useNotification, useRouteHistory } from '@/composables'
import { useServiceDepartment } from '@/services'
import { IDepartmentForm } from '@/interfaces/department'

export default defineComponent({
  name: 'DepartmentAdd',
  components: { FormDepartment },
  setup(_, context) {
    const routeHistory = useRouteHistory()
    const { add } = useServiceDepartment()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const formModel = reactive<IDepartmentForm>({
      code: '',
      name: '',
      type: 1,
      note: '',
      district: undefined,
      commune: undefined,
      province: undefined,
      phone: '',
      parent_id: undefined,
      report_level: '',
      document: '',
      feature: '',
      tasks: '',
      street: undefined,
    })

    const back = () => routeHistory.back('/phong-ban-chuc-danh/danh-muc-don-vi')

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)

        success('Tạo mới đơn vị thành công')
        back()
        context.emit('fetch')
      } catch (e: any) {
        if (e === false) return

        error(e?.data.message || 'Vui lòng thử lại')
      }
    }

    return {
      formModel,
      handleSubmit,
      back,
    }
  },

  data() {
    return {
      visible: true,
    }
  },
})
</script>
