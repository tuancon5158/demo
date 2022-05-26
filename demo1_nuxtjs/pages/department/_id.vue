<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa phòng ban"
    @ok="handleSubmit"
  >
    <form-department
      v-if="formModel"
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
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import FormDepartment from '@form/form-department.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceDepartment } from '@/services'

export default defineComponent({
  name: 'DepartmentEdit',

  components: { FormDepartment },

  setup(_, context) {
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { edit } = useServiceDepartment()
    const { formModel } = useFetchDetailDepartment()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/department')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa đơn vị thành công')
        back()
        context.emit('fetch')
      } catch (e) {
        if (e === false) return

        error(e?.data || 'Vui lòng thử lại')
      }
    }

    return {
      formModel,
      back,
      handleSubmit,
      ...toRefs(state),
    }
  },
})

export const useFetchDetailDepartment = () => {
  const route = useRoute()
  const id = computed(() => Number(route.value.params.id))

  const { get } = useServiceDepartment()

  const formModel = useAsync(async () => {
    try {
      const { data } = await get(id.value)

      return { ...data, id: id.value }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel }
}
</script>
