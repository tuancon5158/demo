<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Thêm mẫu lịch làm việc (Timesheet)"
    width="60%"
    @ok="handleSubmit"
  >
    <form-timesheet
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
  useRouter,
} from '@nuxtjs/composition-api'
import FormTimesheet from '@form/form-timesheet.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceTimesheet } from '@/services'
import { TIMESHEET_DEFAULT } from '@/state'
import { ITimesheetForm } from '@/interfaces/timesheet'

export default defineComponent({
  name: 'TimesheetAdd',
  components: { FormTimesheet },
  setup(_, context) {
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const { add } = useServiceTimesheet()

    const state = reactive({
      visible: true,
    })

    const formModel = reactive<ITimesheetForm>({
      ...TIMESHEET_DEFAULT,
      status: 1,
    })

    const back = () => {
      router.push('/timesheet')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Thêm mẫu lịch làm việc thành công')
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
</script>
