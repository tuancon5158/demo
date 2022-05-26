<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa thang lương"
    @ok="handleSubmit"
  >
    <form-wage-scale
      v-if="formModel"
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-wage-scale>

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
import FormWageScale from '@form/form-wage-scale.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceWageScale } from '@/services'

export default defineComponent({
  name: 'WageScaleEdit',
  components: { FormWageScale },
  setup(_, context) {
    const router = useRouter()
    const { edit } = useServiceWageScale()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { formModel } = useFetchDetailWageScale()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/wage-scale')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa thang lương thành công')
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

export const useFetchDetailWageScale = () => {
  const { get } = useServiceWageScale()
  const route = useRoute()
  const id = computed(() => Number(route.value.params.id))

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
