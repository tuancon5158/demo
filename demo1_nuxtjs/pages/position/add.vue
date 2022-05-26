<template>
  <a-modal
    v-model="visible"
    title="Tạo chức danh"
    :after-close="back"
    centered
    @ok="handleSubmit"
  >
    <form-position
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-position>

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
import FormPosition from '@form/form-position.vue'
import { useForm, useNotification } from '@/composables'
import { useServicePosition } from '@/services'
import { IPositionForm } from '@/interfaces/position'

export default defineComponent({
  name: 'PositionAdd',
  components: { FormPosition },
  setup(_, context) {
    const { add } = useServicePosition()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IPositionForm>({
      name: '',
      career_path: 1,
      status: 1,
      note: '',
      max_level: 1,
    })

    const back = () => {
      router.push('/position')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới chức danh thành công')
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
