<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa đơn vị "
    width="70%"
    @ok="handleSubmit"
  >
    <form-department
      v-if="formModel"
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-department>

    <template slot="footer">
      <a-popconfirm
        cancel-text="No"
        ok-text="Yes"
        placement="topRight"
        @confirm="confirm"
      >
        <template slot="title">
          <p v-if="isApproved">
            Bạn chắc chắn muốn bỏ áp dụng đơn vị này này ?
          </p>
          <p v-else>Bạn chắc chắn muốn áp dụng lại đơn vị này ?</p>
        </template>

        <a-button v-if="isApproved" ghost type="danger">Bỏ áp dụng</a-button>
        <a-button v-else ghost type="primary">Áp dụng lại</a-button>
      </a-popconfirm>
      <a-button key="submit" type="primary" @click="handleSubmit">
        Xác nhận
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useAsync,
  useRoute,
} from '@nuxtjs/composition-api'
import FormDepartment from '@/components/form/form-department.vue'
import { useForm, useNotification, useRouteHistory } from '@/composables'
import { useServiceDepartment } from '@/services'
import { E_Level } from '@/enums'

export default defineComponent({
  name: 'DepartmentEdit',
  components: { FormDepartment },
  setup(_, context) {
    const routeHistory = useRouteHistory()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { edit, changeStatus } = useServiceDepartment()
    const { formModel } = useFetchDetailDepartment()

    const isApproved = computed(
      () => formModel && formModel.value?.status === E_Level.Approved
    )

    const back = () => routeHistory.back('/phong-ban-chuc-danh/danh-muc-don-vi')

    const confirm = async () => {
      try {
        await changeStatus({
          id: formModel.value?.id,
          status: isApproved.value ? E_Level.Cancel : E_Level.Approved,
        })
        success('Thay đổi trạng thái thành công')
        back()
        context.emit('fetch')
      } catch (e: any) {
        if (e === false) return

        error(e?.data?.message || 'Vui lòng thử lại')
      }
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa đơn vị thành công')
        back()
        context.emit('fetch')
      } catch (e: any) {
        if (e === false) return

        error(e?.data?.message || 'Vui lòng thử lại')
      }
    }

    return {
      formModel,
      back,
      handleSubmit,
      confirm,
      isApproved,
    }
  },

  data() {
    return {
      visible: true,
    }
  },
})

const useFetchDetailDepartment = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)

  const { get } = useServiceDepartment()

  const formModel = useAsync(async () => {
    try {
      const { data } = await get(id)

      return {
        ...data.department,
        district: Number(data.department.district) || undefined,
        commune: Number(data.department.commune) || undefined,
        province: Number(data.department.province) || undefined,
        id,
      }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel }
}
</script>
