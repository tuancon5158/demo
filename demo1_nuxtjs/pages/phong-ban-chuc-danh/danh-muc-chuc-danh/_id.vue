<template>
  <a-modal
    v-model="visible"
    :after-close="back"
    centered
    title="Sửa chức danh "
    width="70%"
    @ok="handleSubmit"
  >
    <form-title
      v-if="formModel"
      ref="formRef"
      v-model="formModel"
      @submit="handleSubmit"
    ></form-title>

    <template slot="footer">
      <a-popconfirm
        cancel-text="No"
        ok-text="Yes"
        placement="topRight"
        @confirm="confirm"
      >
        <template slot="title">
          <p v-if="isApproved">
            Bạn chắc chắn muốn bỏ áp dụng chức danh này này ?
          </p>
          <p v-else>Bạn chắc chắn muốn áp dụng lại chức danh này ?</p>
        </template>

        <a-button v-if="isApproved" ghost type="danger">Bỏ áp dụng</a-button>
        <a-button v-else ghost type="primary">Áp dụng lại</a-button>
      </a-popconfirm>
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
  useAsync,
  useRoute,
} from '@nuxtjs/composition-api'
import FormTitle from '@/components/form/form-title.vue'
import { useForm, useNotification, useRouteHistory } from '@/composables'
import { useServiceTitles } from '@/services'
import { E_Level } from '@/enums'

export default defineComponent({
  name: 'TitlesEdit',
  components: { FormTitle },
  setup(_, context) {
    const routeHistory = useRouteHistory()
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { edit, changeStatus } = useServiceTitles()
    const { formModel } = useFetchDetailTitle()
    const isApproved = computed(
      () => formModel && formModel.value?.status === E_Level.Approved
    )

    const back = () =>
      routeHistory.back('/phong-ban-chuc-danh/danh-muc-chuc-danh')

    const confirm = async () => {
      try {
        await changeStatus({
          id: formModel.value?.id,
          status: isApproved.value ? E_Level.Cancel : E_Level.Approved,
        })
        success('Thay đổi trạng thái thành công')
        back()
        context.emit('fetch')
      } catch (e: any) {
        if (e === false) return

        error(e?.data?.message || 'Vui lòng thử lại')
      }
    }

    const handleSubmit = async () => {
      try {
        await validate()
        await edit(formModel.value)
        success('Sửa chức danh thành công')
        back()
        context.emit('fetch')
      } catch (e: any) {
        if (e === false) return

        error(e?.data?.message || 'Vui lòng thử lại')
      }
    }

    return {
      formModel,
      back,
      handleSubmit,
      confirm,
      isApproved,
    }
  },

  data() {
    return {
      visible: true,
    }
  },
})

const useFetchDetailTitle = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)

  const { get } = useServiceTitles()

  const formModel = useAsync(async () => {
    try {
      const { data } = await get(id)

      return {
        ...data.title,
        id,
      }
    } catch (e) {
      console.log({ e })
    }
  })

  return { formModel }
}
</script>
