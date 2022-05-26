<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Tạo thang lương"
    @ok="handleSubmit"
  >
    <form-wage-scale
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
  defineComponent,
  reactive,
  toRefs,
  useRouter,
} from '@nuxtjs/composition-api'
import FormWageScale from '@form/form-wage-scale.vue'
import { useNotification, useForm } from '@/composables'
import { useServiceWageScale } from '@/services'
import { IWageScaleForm } from '@/interfaces/wageScale'

export default defineComponent({
  name: 'WageScaleAdd',
  components: { FormWageScale },
  setup(_, context) {
    const router = useRouter()
    const { add } = useServiceWageScale()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IWageScaleForm>({
      code: '',
      amount: '',
      status: 1,
    })

    const back = () => {
      router.push('/wage-scale')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới thang lương thành công')
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
</script>
