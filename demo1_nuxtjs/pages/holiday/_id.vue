<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa ngày lễ tết"
    @ok="handleSubmit"
  >
    <form-holiday
      v-if="formModel"
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-holiday>

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
import FormHoliday from '@form/form-holiday.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceHoliday } from '@/services'

export default defineComponent({
  name: 'HolidayEdit',
  components: { FormHoliday },
  setup(_, context) {
    const { edit } = useServiceHoliday()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { formModel } = useFetchDetailHoliday()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/holiday')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa ngày lễ tết thành công')
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

export const useFetchDetailHoliday = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)

  const { get } = useServiceHoliday()

  const formModel = useAsync(async () => {
    try {
      const { data } = await get(id)

      data.time_sheets = data.time_sheets.map(item => item.id) as any

      data.apply_for_flex_time_sheet = Boolean(
        data.apply_for_flex_time_sheet
      ) as any

      return { ...data, id }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel }
}
</script>
