<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Tạo hệ số lương"
    @ok="handleSubmit"
  >
    <form-wage-weight
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
  useRouter,
} from '@nuxtjs/composition-api'
import FormWageWeight from '@form/form-wage-weight.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceWageWeight } from '@/services'
import { IWageWeightForm } from '@/interfaces/wageWeight'

export default defineComponent({
  name: 'WageWeightAdd',
  components: { FormWageWeight },
  setup(_, context) {
    const { add } = useServiceWageWeight()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IWageWeightForm>({
      name: '',
      fields: '',
      weight: '',
      status: 1,
      note: '',
    })

    const back = () => {
      router.push('/wage-weight')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới hệ số lương thành công')
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
