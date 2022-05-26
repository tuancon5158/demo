<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa hành vi"
    width="60%"
    @ok="handleSubmit"
  >
    <form-behavior
      v-if="formModel"
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
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import FormBehavior from '@form/form-behavior.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceBehavior } from '@/services'

export default defineComponent({
  name: 'BehaviorGroupEdit',
  components: { FormBehavior },
  setup(_, context) {
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { edit } = useServiceBehavior()
    const { formModel } = useFetchDetailBehavior()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/behavior')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa hành vi thành công')
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

const useFetchDetailBehavior = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)

  const { get } = useServiceBehavior()

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
