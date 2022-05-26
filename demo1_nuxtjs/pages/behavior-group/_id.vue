<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa nhóm hành vi"
    @ok="handleSubmit"
  >
    <form-behavior-group
      v-if="formModel"
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
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import FormBehaviorGroup from '@form/form-behavior-group.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceBehaviorGroup } from '@/services'

export default defineComponent({
  name: 'BehaviorGroupEdit',
  components: { FormBehaviorGroup },
  setup(_, context) {
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { edit } = useServiceBehaviorGroup()
    const { formModel } = useFetchDetailBehaviorGroup()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/behavior-group')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa nhóm hành vi thành công')
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

export const useFetchDetailBehaviorGroup = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)

  const { get } = useServiceBehaviorGroup()

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
