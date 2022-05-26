<template>
  <div class="mt-4">
    <template v-if="formModel">
      <form-compensation
        ref="formRef"
        v-model="formModel"
        @submit="handleSubmit"
      ></form-compensation>
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
import FormCompensation from '@/components/form/form-compensation.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceProfile } from '@/services'
import { IProfileForm } from '@/interfaces/profile'

export default defineComponent({
  name: 'ProfileUpdate',

  components: { FormCompensation },

  setup(_, context) {
    const { updateCompensation } = useServiceProfile()
    const router = useRouter()

    const { validate } = useForm(context)
    const { error, success } = useNotification()

    const { formModel } = useFetchDetailProfile()

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

        await updateCompensation({
          ...formModel.value,
        })
        success('Cập nhật profile thành công')
      } catch (e: any) {
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
        user_id: user.user_id,
        profile_id: user.profile_id,
        salary_formula: user.salary_formula || 24,
        time_sheet_id: user.time_sheet_id || null,
        wage_scale_id: user.wage_scale_id,
        wage_weight_id: user.wage_weight_id || [],
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
