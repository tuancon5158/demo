<template>
  <a-modal
    v-model="visible"
    title="Tạo ngày lễ tết"
    :after-close="back"
    centered
    @ok="handleSubmit"
  >
    <form-holiday
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
  useRouter,
} from '@nuxtjs/composition-api'
import FormHoliday from '@form/form-holiday.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceHoliday } from '@/services'
import { IHolidayForm } from '@/interfaces/holiday'

export default defineComponent({
  name: 'HolidayAdd',
  components: { FormHoliday },
  setup(_, context) {
    const { add } = useServiceHoliday()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const state = reactive({
      visible: true,
    })

    const formModel = reactive<IHolidayForm>({
      name: '',
      description: '',
      from_date: '',
      to_date: '',
      time_sheets: [],
      files: [],
      wage_weight: 0,
      color: '',
      apply_for_flex_time_sheet: false,
      status: 1,
    })

    const back = () => {
      router.push('/holiday')
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)
        success('Tạo mới ngày lễ tết thành công')
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
