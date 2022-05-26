<template>
  <div class="mt-4">
    <template v-if="formModel">
      <form-staff
        ref="formRef"
        v-model="formModel"
        @submit="handleSubmit"
      ></form-staff>
      <div class="col-span-2 space-x-2 mr-auto flex justify-center py-3">
        <a-button>Huỷ bỏ</a-button>
        <a-button type="primary" @click="handleSubmit">Cập nhật</a-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useAsync,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import FormStaff from '@/components/form/form-staff.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceProfile } from '@/services'
import { IProfileForm } from '@/interfaces/profile'
import { formatDate } from '@/utils'

export default defineComponent({
  name: 'NhanSu',

  components: { FormStaff },

  setup(_, context) {
    const { formModel } = useFetchDetailProfile()
    const { updateInfo } = useServiceProfile()
    const router = useRouter()
    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const back = () => {
      router.go(-1)
    }

    const handleFormatForm = (form: IProfileForm) => {
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

        await updateInfo({
          ...formModel.value,
          avatar_files: formModel?.value?.avatar_files.map((item: any) => {
            return item.data ? item.data[0] : item
          }),
          cmnd_files: formModel?.value?.cmnd_files.map((item: any) => {
            return item.data ? item.data[0] : item
          }),
          hr_files: formModel?.value?.hr_files.map((item: any) => {
            return item.data ? item.data[0] : item
          }),
        })
        success('Cập nhật profile thành công')
        back()
        context.emit('fetch')
      } catch (e: any) {
        console.log(e)

        if (e === false) return

        error(e?.data.message || 'Vui lòng thử lại')
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
export const useFetchDetailProfile = () => {
  const { get } = useServiceProfile()
  const route = useRoute()
  const id = Number(route.value.params.id)

  const formModel = useAsync(async () => {
    try {
      const res = await get(id)

      const user = res.data.user

      return {
        ...user,
        date_of_issue: formatDate(user?.date_of_issue),
        dob: formatDate(user?.dob),
        date_of_joining: formatDate(user?.date_of_joining),
        avatar_files: user?.avatar_files || [],
        cmnd_files: user?.cmnd_files || [],
        hr_files: user?.hr_files || [],
      }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel, fetch }
}
const useLayoutContent = () => {
  const title = 'Tạo mới nhân sự'
  const breadcrumbs = ['Tổ chức', 'Nhân sự', 'Tạo mới nhân sự']

  const content = computed(() => {
    return { breadcrumbs, title }
  })

  return { content }
}
</script>
