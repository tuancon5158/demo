<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa chính sách"
    width="80%"
    @ok="handleSubmit"
  >
    <form-policy
      v-if="formModel"
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
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import FormPolicy from '@form/form-policy.vue'
import { useForm, useNotification } from '@/composables'
import { useServicePolicy } from '@/services'

export default defineComponent({
  name: 'PolicyUpdate',
  components: { FormPolicy },
  setup(_, context) {
    const { edit } = useServicePolicy()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const state = reactive({
      visible: true,
    })

    const { formModel } = useFetchDetailPolicy()

    const back = () => {
      router.push('/policy')
    }

    const handleSubmit = async () => {
      try {
        console.log('submit')
        await validate()
        await edit(formModel.value)
        success('Sửa chính sách thành công')
        back()
        context.emit('fetch')
      } catch (e) {
        console.log({ e })

        if (e === false) return

        error(e?.data || 'Vui lòng thử lại')
      }
    }

    return { ...toRefs(state), formModel, back, handleSubmit }
  },
})

const useFetchDetailPolicy = () => {
  const { get } = useServicePolicy()
  const route = useRoute()
  const id = Number(route.value.params.id)

  const formModel = useAsync(async () => {
    const { data } = await get(id)

    return { ...data, id }
  })

  return { formModel, fetch }
}
</script>
