<template>
  <a-modal
    v-model="visible"
    title="Tạo hành vi"
    :after-close="back"
    centered
    width="60%"
    @ok="handleSubmit"
  >
    <form-behavior
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-behavior>

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
import FormBehavior from '@form/form-behavior.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceBehavior } from '@/services'
import { IBehaviorForm } from '@/interfaces/behavior'

export default defineComponent({
  name: 'BehaviorAdd',
  components: { FormBehavior },
  setup(_, context) {
    const { add } = useServiceBehavior()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IBehaviorForm>({
      name: '',
      status: 1,
      description: '',
      apply_for: 1,
      apply_value: {
        branch: { points: 0 },
        user: { points: 0, hours: 0, money: 0 },
      },
      behavior_group_id: undefined,
      level: 1,
      type: 1,
    })

    const back = () => {
      router.push('/behavior')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới hành vi thành công')
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
