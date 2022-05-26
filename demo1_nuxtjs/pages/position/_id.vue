<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa chức danh"
    @ok="handleSubmit"
  >
    <form-position
      v-if="formModel"
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
  computed,
  defineComponent,
  reactive,
  toRefs,
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import FormPosition from '@form/form-position.vue'
import { useForm, useNotification } from '@/composables'
import { useServicePosition } from '@/services'

export default defineComponent({
  name: 'PositionEdit',
  components: { FormPosition },
  setup(_, context) {
    const { edit } = useServicePosition()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const { formModel } = useFetchDetailPosition()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/position')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa chức danh thành công')
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

export const useFetchDetailPosition = () => {
  const { get } = useServicePosition()
  const route = useRoute()
  const id = computed(() => Number(route.value.params.id))

  const formModel = useAsync(async () => {
    try {
      const { data } = await get(id.value)

      return { ...data, id: id.value }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel }
}
</script>
