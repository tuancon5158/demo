<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa mẫu lịch làm việc (Timesheet)"
    width="60%"
    @ok="handleSubmit"
  >
    <form-timesheet
      v-if="formModel"
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-timesheet>

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
import FormTimesheet from '@form/form-timesheet.vue'
import { useServiceTimesheet } from '@/services'
import { useForm, useNotification } from '@/composables'

export default defineComponent({
  name: 'TimesheetEdit',
  components: { FormTimesheet },
  setup(_, context) {
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { edit } = useServiceTimesheet()

    const { formModel } = useFetchDetailTimesheet()

    const state = reactive({
      visible: true,
    })

    const back = () => {
      router.push('/timesheet')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa mẫu lịch làm việc thành công')
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

export const useFetchDetailTimesheet = () => {
  const { get } = useServiceTimesheet()
  const route = useRoute()
  const id = Number(route.value.params.id)

  const formModel = useAsync(async () => {
    try {
      const { data } = await get(id)

      Object.entries(data.timeline).forEach(([date, timeline]) => {
        // @ts-ignore
        data.timeline[date] = timeline.sort((a, b) => a[0] - b[0])
      })

      return { ...data, id }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel }
}
</script>
