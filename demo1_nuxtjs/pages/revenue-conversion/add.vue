<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Tạo bảng quy đổi doanh thu"
    @ok="handleSubmit"
  >
    <form-revenue-conversion
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
  useRouter,
} from '@nuxtjs/composition-api'
import FormRevenueConversion from '@form/form-revenue-conversion.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceRevenueConversion } from '@/services'
import { IRevenueConversionForm } from '@/interfaces/revenueConversion'

export default defineComponent({
  name: 'RevenueConversionAdd',
  components: { FormRevenueConversion },
  setup(_, context) {
    const { add } = useServiceRevenueConversion()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IRevenueConversionForm>({
      name: '',
      description: '',
      product_group_id: null,
      conversion_weight: 0,
      status: 1,
    })

    const back = () => {
      router.push('/revenue-conversion')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới quy đổi doanh thu thành công')
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
</script>
