<template>
  <a-modal
    v-model="visible"
    title="Tạo chính sách"
    :after-close="back"
    centered
    width="80%"
    @ok="handleSubmit"
  >
    <form-policy
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-policy>

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
import FormPolicy from '@form/form-policy.vue'
import { useForm, useNotification } from '@/composables'
import { useServicePolicy } from '@/services'
import { IPolicyForm } from '@/interfaces/policy'

export default defineComponent({
  name: 'PolicyAdd',
  components: { FormPolicy },
  setup(_, context) {
    const { add } = useServicePolicy()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IPolicyForm>({
      name: '',
      type: 1,
      time_check: false,
      from_date: '',
      to_date: '',
      apply_for_account: 1,
      apply_for: 1,
      role: '',
      model_names: [],
      product_group_ids: [],
      titles: [],
      status: 1,
      note: '',
    })

    const back = () => {
      router.push('/policy')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới chính sách thành công')
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
