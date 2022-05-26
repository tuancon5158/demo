<template>
  <section-layout-content v-bind="content">
    <div class="mt-4">
      <form-staff
        ref="formRef"
        v-model="formModel"
        @submit="handleSubmit"
      ></form-staff>
      <div class="col-span-2 space-x-2 mr-auto flex justify-center py-3">
        <a-button @click="back">Huỷ bỏ</a-button>
        <a-button type="primary" @click="handleSubmit">Tạo mới</a-button>
      </div>
    </div>
  </section-layout-content>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  useRouter,
} from '@nuxtjs/composition-api'
import SectionLayoutContent from '@common/section-layout-content.vue'
import FormStaff from '@/components/form/form-staff.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceProfile } from '@/services'
// import { useFetchDetailProfile } from '@/state'
import { IProfileV2 } from '@/interfaces/profile'

export default defineComponent({
  name: 'ProfileAdd',

  components: { SectionLayoutContent, FormStaff },

  setup(_, context) {
    const formModel = reactive<any>({
      avatar_files: [],
      cmnd_files: [],
      area_id: '1',
      avatar: '',
      cmnd: '',
      dob: '',
      date_of_issue: '',
      date_of_joining: '',
      dept_id: '',
      direct_manager_id: '',
      email: '',
      email_business: '',
      first_name: '',
      gender: '1',
      images_cmnd: [],
      last_name: '',
      level: '1',
      literacy: '1',
      note: '',
      password: '',

      permanent_street: undefined,
      phone: '',
      place_of_issue: '',
      salary_formula: '',
      permanent_residence_commune: undefined,
      permanent_residence_district: undefined,
      permanent_residence_province: undefined,
      temporary_residence_commune: undefined,
      temporary_residence_district: undefined,
      temporary_residence_province: undefined,
      temporary_street: undefined,
      titles: [
        {
          id: undefined,
          level: undefined,
          document: '',
        },
      ],
      wage_scale_id: '1',
      work_status_id: '6',
    })
    const { add } = useServiceProfile()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const back = () => {
      router.push(`/profile`)
    }

    const handleFormatForm = (form: IProfileV2) => {
      const formattedForm = { ...form }

      Object.entries(formModel).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length === 0) {
          // @ts-ignore
          delete formattedForm[key]
        }
      })

      return formattedForm
    }

    const handleSubmit = async () => {
      try {
        await validate()

        await add({
          ...formModel,
          avatar_files: formModel?.avatar_files.map((item: any) => {
            return item.data ? item.data[0] : item
          }),
          cmnd_files: formModel?.cmnd_files.map((item: any) => {
            return item.data ? item.data[0] : item
          }),
        })
        success('Tạo mới nhân sự thành công')

        back()
        context.emit('fetch')
      } catch (e) {
        if (e === false) return

        error(e?.data?.message || 'Vui lòng thử lại')
      }
    }

    return {
      formModel,
      handleSubmit,
      back,
      handleFormatForm,
      ...useLayoutContent(),
    }
  },
})
const useLayoutContent = () => {
  const title = 'Tạo mới nhân sự'
  const breadcrumbs = ['Tổ chức', 'Nhân sự', 'Tạo mới nhân sự']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
