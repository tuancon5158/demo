<template>
  <div class="mt-4">
    <div class="flex justify-center">
      <a-form-model
        :label-col="{ span: 6 }"
        style="width: 60%"
        :wrapper-col="{ span: 14 }"
        @submit.native.prevent
      >
        <a-collapse v-model="activeKey">
          <a-collapse-panel
            v-for="(i, k) in banksUser"
            :key="`${k + 1}`"
            :header="`Tài Khoản : ${i.name}`"
          >
            <a-form-model-item label="Ngân Hàng" prop="bank_id">
              <a-select v-model="i.bank_id" :options="banks"></a-select>
            </a-form-model-item>
            <a-form-model-item label="Chủ tài khoản" prop="name">
              <a-input v-model="i.name"></a-input>
            </a-form-model-item>
            <a-form-model-item label="Số tài khoản" prop="number">
              <a-input v-model="i.number"></a-input>
            </a-form-model-item>
            <a-form-model-item label="Tài khoản mặc định">
              <a-popconfirm
                cancel-text="No"
                ok-text="Yes"
                placement="topRight"
                @confirm="confirm(i)"
              >
                <template slot="title">
                  <p>
                    Bạn có
                    <span>xác nhận thay đổi</span>
                    ?
                  </p>
                </template>
                <a-switch v-model="i.default" ghost />
              </a-popconfirm>
            </a-form-model-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 9 }">
              <a-button class="ml-4" type="primary" @click="updateItemBank(i)">
                Xác nhận thay đổi
              </a-button>
            </a-form-item>
            <a-icon
              slot="extra"
              class="mx-2"
              type="delete"
              @click="removeBank(i)"
            />
          </a-collapse-panel>
        </a-collapse>
      </a-form-model>
    </div>
    <div class="col-span-2 space-x-2 mr-auto flex justify-center py-3">
      <a-button type="primary" @click="visible = true">
        Thêm tài khoản ngân hàng
      </a-button>
    </div>

    <a-modal
      v-model="visible"
      title="Tạo tài khoản ngân hàng"
      :after-close="back"
      centered
      width="50%"
      @ok="handleSubmit"
    >
      <a-form-model
        ref="formRef"
        :label-col="{ span: 6 }"
        :rules="rules"
        :model="formModel"
        :wrapper-col="{ span: 14 }"
        @submit="$emit('submit')"
        @submit.native.prevent
      >
        <a-form-model-item label="Ngân Hàng" prop="bank_id">
          <a-select v-model="formModel.bank_id" :options="banks"></a-select>
        </a-form-model-item>
        <a-form-model-item label="Chủ tài khoản" prop="name">
          <a-input v-model="formModel.name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="Số tài khoản" prop="number">
          <a-input v-model="formModel.number"></a-input>
        </a-form-model-item>
        <a-form-model-item label="Đặt làm tài khoản mặc định">
          <base-switch v-model="formModel.default"></base-switch>
        </a-form-model-item>
      </a-form-model>

      <template slot="footer">
        <a-button key="back" @click="visible = false">Huỷ bỏ</a-button>
        <a-button key="submit" type="primary" @click="handleSubmit">
          Xác nhận
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  useRoute,
} from '@nuxtjs/composition-api'
import BaseSwitch from '@/components/elements/base-switch.vue'
import { useForm, useNotification } from '@/composables'
import { IBank, useServiceBank } from '@/services'
import { IProfileForm } from '@/interfaces/profile'
import { SelectOption } from '@/interfaces/antdv'

export default defineComponent({
  name: 'TaiKhoanNganHang',
  components: { BaseSwitch },

  setup(_, context) {
    const route = useRoute()

    const id = Number(route.value.params.id)
    const formModel = reactive<IBank>({
      name: '',
      number: '',
      bank_id: '',
      object: {
        id,
        type: 1,
      },
      default: false,
    })
    const banks = ref<SelectOption[]>([])
    const banksUser = ref<IBank[]>([])
    const { validate } = useForm(context)
    const { error, success } = useNotification()
    const { getBank, addBank, getBankUser, deleteBank, updateBank } =
      useServiceBank()
    const state = reactive({
      visible: false,
    })
    const back = () => {}

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

    const fetchBank = async () => {
      try {
        const res = await getBank()

        banks.value = res.data.map((item: any) => {
          return {
            value: item.id,
            label: `${item.name} - ${item.code}`,
          }
        })
      } catch (error) {
        console.log(`error`, error)
      }
    }
    const fetchBankUser = async (id: number) => {
      try {
        const res = await getBankUser({
          object: {
            id,
            type: 1,
          },
        })

        banksUser.value = res.data.map((item: IBank) => {
          return {
            ...item,
          }
        })
      } catch (error) {
        console.log(`error`, error)
      }
    }

    const confirm = async (i: any) => {
      try {
        await updateBank({
          id: i.id,
          object: {
            id,
            type: 1,
          },
          default: i.default,
          name: i.name,
          number: i.number,
          bank_id: i.bank_id,
        })
        success('Xét tài khoản mặc định thành công')
        await fetchBankUser(id)
      } catch (e: any) {
        if (e === false) return

        error(e?.data?.message || 'Vui lòng thử lại')
      }
    }

    const updateItemBank = async (i: any) => {
      try {
        await updateBank({
          id: i.id,
          object: {
            id,
            type: 1,
          },
          default: i.default,
          name: i.name,
          number: i.number,
          bank_id: i.bank_id,
        })
        success('Thay đổi thành công')
        await fetchBankUser(id)
      } catch (e: any) {
        if (e === false) return

        error(e?.data?.message || 'Vui lòng thử lại')
      }
    }

    fetchBank()

    fetchBankUser(id)

    const handleSubmit = async () => {
      try {
        await validate()

        await addBank(formModel)
        success('Tạo tài khoản ngân hàng thành công')
        await fetchBankUser(id)
        state.visible = false
      } catch (e: any) {
        if (e === false) return

        error(e?.data.message || 'Vui lòng thử lại')
      }
    }

    const removeBank = async (i: any) => {
      try {
        await deleteBank({
          account_bank_ids: [i.id],
          object: {
            id,
            type: 1,
          },
        })
        await fetchBankUser(id)

        if (i.default && banksUser.value.length > 0) {
          const item = banksUser.value[0] as any

          await updateBank({
            id: item?.id,
            object: {
              id: item.id,
              type: 1,
            },
            default: true,
            name: item.name,
            number: item.number,
            bank_id: item.bank_id,
          })
        }

        await fetchBankUser(id)

        success('Xóa tài khoản nhân hàng  thành công')
        context.emit('fetch')
      } catch (e: any) {
        if (e === false) return

        error(e?.data.message || 'Vui lòng thử lại')
      }
    }

    return {
      ...toRefs(state),
      banks,
      banksUser,
      formModel,
      handleSubmit,
      back,
      removeBank,
      handleFormatForm,
      confirm,
      updateItemBank,
      ...useLayoutContent(),
    }
  },
  data() {
    return {
      activeKey: ['1', '2'],
      rules: {
        name: [
          {
            required: true,
            message: 'Chủ tài khoản là bắt buộc',
            trigger: 'change',
          },
        ],
        bank_id: [
          {
            required: true,
            message: 'Ngân hàng là bắt buộc',
            trigger: 'change',
          },
        ],
        number: [
          {
            required: true,
            message: 'Số tài khoản là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    }
  },
  watch: {
    activeKey(key) {
      console.log(key)
    },
  },
  methods: {
    handleClick(event: any) {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation()
    },
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
