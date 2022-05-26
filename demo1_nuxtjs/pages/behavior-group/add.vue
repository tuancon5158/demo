<template>
  <a-modal
    v-model="visible"
    title="Tạo nhóm hành vi"
    :after-close="back"
    centered
    @ok="handleSubmit"
  >
    <form-behavior-group
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-behavior-group>

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
import FormBehaviorGroup from '@form/form-behavior-group.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceBehaviorGroup } from '@/services'
import { IBehaviorGroupForm } from '@/interfaces/behaviorGroup'

export default defineComponent({
  name: 'BehaviorGroupAdd',
  components: { FormBehaviorGroup },
  setup(_, context) {
    const { add } = useServiceBehaviorGroup()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IBehaviorGroupForm>({
      name: '',
      status: 1,
      description: '',
    })

    const back = () => {
      router.push('/behavior-group')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới nhóm hành vi thành công')
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
