<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Tạo chức danh"
    width="60%"
    @ok="handleSubmit"
  >
    <form-title
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-title>

    <template slot="footer">
      <a-button key="back" @click="visible = false">Huỷ bỏ</a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        Xác nhận
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import FormTitle from '@/components/form/form-title.vue'
import { useForm, useNotification, useRouteHistory } from '@/composables'
import { useServiceTitles } from '@/services'
import { ITitlesForm } from '@/interfaces/titles'

export default defineComponent({
  name: 'TitlesAdd',
  components: { FormTitle },
  setup(_, context) {
    const routeHistory = useRouteHistory()
    const { add } = useServiceTitles()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const formModel = reactive<ITitlesForm>({
      name: '',
      status: 1,
      note: '',
      max_level: 0,
      code: '',
      cadre_level: undefined,
      career_path: undefined,
      rank: 1,
      group: undefined,
      boundary: undefined,
      document: '',
    })

    const back = () =>
      routeHistory.back('/phong-ban-chuc-danh/danh-muc-chuc-danh')

    const handleSubmit = async () => {
      try {
        await validate()
        await add(formModel)

        success('Tạo mới đơn vị thành công')
        back()
        context.emit('fetch')
      } catch (e: any) {
        if (e === false) return

        error(e?.data.message || 'Vui lòng thử lại')
      }
    }

    return { formModel, back, handleSubmit }
  },

  data() {
    return {
      visible: true,
    }
  },
})
</script>
