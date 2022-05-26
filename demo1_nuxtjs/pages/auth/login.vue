<template>
  <div class="h-full flex">
    <div
      class="
        h-full
        flex-1 flex
        justify-center
        items-center
        bg-primary
        p-4
        sm:p-8
      "
    >
      <div class="p-4 sm:p-8 bg-white rounded-lg w-full max-w-2xl">
        <h1 class="text-base sm:text-xl font-bold text-center">
          Đăng nhập hệ thống HRM - ThinkGroup
        </h1>

        <a-form-model
          :model="form"
          @submit="handleSubmit"
          @submit.native.prevent
        >
          <a-form-model-item label="Số điện thoại">
            <a-input
              v-model="form.phone"
              size="large"
              name="phone"
              placeholder="Nhập số điện thoại"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="Mật khẩu">
            <a-input
              v-model="form.password"
              size="large"
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              block
              size="large"
              type="primary"
              html-type="submit"
              :disabled="isDisabled"
              :loading="isLoading"
            >
              Đăng nhập
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>

    <div class="hidden lg:block w-2/5 p-8 lg:p-16 xl:p-24">
      <image-secure-login class="w-full h-full"></image-secure-login>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ImageSecureLogin from '@/assets/images/secure-login.svg?inline'

export default defineComponent({
  name: 'Login',
  components: { ImageSecureLogin },
  layout: 'auth',
  data() {
    return {
      form: {
        phone: '',
        password: '',
      },
      isLoading: false,
    }
  },
  computed: {
    isDisabled() {
      return this.form.phone === '' || this.form.password === ''
    },
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true
        await this.$auth.loginWith('customStrategy', {
          data: this.form,
        })
      } catch (e) {
        this.$notification.destroy()

        this.$notification.error({
          message: 'Lỗi đăng nhập',
          description: 'Thông tin không chính xác',
          placement: 'bottomLeft',
        })
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
