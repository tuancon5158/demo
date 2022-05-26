<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa bảng quy đổi doanh thu"
    @ok="handleSubmit"
  >
    <form-revenue-conversion
      v-if="formModel"
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-revenue-conversion>

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
import FormRevenueConversion from '@form/form-revenue-conversion.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceRevenueConversion } from '@/services'

export default defineComponent({
  name: 'RevenueConversionUpdate',

  components: { FormRevenueConversion },

  setup(_, context) {
    const { edit } = useServiceRevenueConversion()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const state = reactive({
      visible: true,
    })

    const { formModel } = useFetchDetailRevenueConversion()

    const back = () => {
      router.push('/revenue-conversion')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa quy đổi doanh thu thành công')
        back()
        context.emit('fetch')
      } catch (e) {
        if (e === false) return

        error(e?.data || 'Vui lòng thử lại')
      }
    }

    return { ...toRefs(state), formModel, back, handleSubmit }
  },
})

export const useFetchDetailRevenueConversion = () => {
  const { get } = useServiceRevenueConversion()
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

  return { formModel, fetch }
}
</script>
