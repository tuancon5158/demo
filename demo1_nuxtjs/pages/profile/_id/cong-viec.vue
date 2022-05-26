<template>
  <div class="mt-4">
    <template v-if="formModel">
      <form-work-info
        ref="formRef"
        v-model="formModel"
        @submit="handleSubmit"
      ></form-work-info>
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
import FormWorkInfo from '@/components/form/form-work-info.vue'
import { useForm, useNotification } from '@/composables'
import { useServiceProfile } from '@/services'
import { IProfileForm } from '@/interfaces/profile'
import { formatDate } from '@/utils'

export default defineComponent({
  name: 'ProfileWork',

  components: { FormWorkInfo },

  setup(_, context) {
    const { updateWorkInfo } = useServiceProfile()
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

        await updateWorkInfo({
          ...formModel.value,
          labor_contracts_files: formModel?.value?.labor_contracts_files.map(
            (item: any) => {
              return item.data ? item.data[0] : item
            }
          ),
          is_treasurer: formModel?.value?.is_treasurer ? 1 : 0,

          titles: formModel?.value?.titles.map((item: any) => {
            return {
              id: item.id,
              level: item.level,
              document: item.document ? item.document : '',
            }
          }),
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
        work_status_parent_detail: user.work_status_parent_detail,
        work_status_detail: user.work_status_detail,
        branch_id: user.branch_id || '',
        is_treasurer: user.is_treasurer,
        document: user.document,
        titles: user.titles,
        direct_manager_id: user.direct_manager_id,
        date_end_work: formatDate(user.date_end_work),
        date_pause_work: formatDate(user.date_pause_work),
        date_of_joining: formatDate(user.date_of_joining),
        labor_contracts_files: user.labor_contracts_files || [],
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
