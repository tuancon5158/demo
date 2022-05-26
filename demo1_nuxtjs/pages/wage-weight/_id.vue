<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa hệ số lương"
    @ok="handleSubmit"
  >
    <form-wage-weight
      v-if="formModel"
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-wage-weight>

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
  defineComponent,
  reactive,
  toRefs,
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import FormWageWeight from '@form/form-wage-weight.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceWageWeight } from '@/services'

export default defineComponent({
  name: 'WageWeightEdit',
  components: { FormWageWeight },
  setup(_, context) {
    const { edit } = useServiceWageWeight()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { formModel } = useFetchDetailWageWeight()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/wage-weight')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa hệ số lương thành công')
        back()
        context.emit('fetch')
      } catch (e) {
        if (e === false) return

        error(e?.data || 'Vui lòng thử lại')
      }
    }

    return { ...toRefs(state), formModel, handleSubmit, back }
  },
})

export const useFetchDetailWageWeight = () => {
  const { get } = useServiceWageWeight()
  const route = useRoute()
  const id = Number(route.value.params.id)

  const formModel = useAsync(async () => {
    try {
      const { data } = await get(id)

      return { ...data, id }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel }
}
</script>
