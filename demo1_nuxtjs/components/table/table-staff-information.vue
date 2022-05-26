<template>
  <div class="space-y-2">
    <div class="p-2 border rounded inline-block">
      <object
        v-if="staff.avatar"
        data="https://i.pravatar.cc/150?img=2"
        type="image/png"
      >
        <img :src="avatar" alt="Avatar" class="w-32 h-32" />
      </object>

      <div v-else class="w-32 h-32 rounded bg-light-300"></div>
    </div>

    <base-table bordered small>
      <base-table-body>
        <tr>
          <td>Họ và tên</td>
          <td>{{ staff.name }}</td>
        </tr>
        <tr>
          <td>Ngày sinh</td>
          <td>{{ staff.dob }}</td>
        </tr>
        <tr>
          <td>Ngày gia nhập</td>
          <td>
            <div class="flex justify-between items-center">
              <span>
                {{ dateOfJoining }}
              </span>
              <span>
                <a-icon type="calendar" @click="open" />
                <a-date-picker
                  ref="dateOfJoiningRef"
                  :format="$config.dateFormat"
                  :value="form.date_of_joining"
                  class="w-[0px] h-[0px] overflow-hidden"
                  type="date"
                  @change="onChangeDate"
                />
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>Số điện thoại</td>
          <td>{{ staff.phone }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ staff.email }}</td>
        </tr>
        <tr>
          <td>CMND/ Căn cước công</td>
          <td>{{ staff.cmnd }}</td>
        </tr>
        <tr>
          <td>Quê quán</td>
          <td>{{ addressFull }}</td>
        </tr>
        <tr>
          <td>Số tài khoản</td>
          <td></td>
        </tr>
        <tr>
          <td>Ngân hàng</td>
          <td></td>
        </tr>
        <tr>
          <td>Chi nhánh</td>
          <td></td>
        </tr>
      </base-table-body>
    </base-table>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useVModel } from '@vueuse/core'
import { useConfig } from '@/composables'
import { fetchAddress, fetchStaff } from '@/state'
import { formatDate } from '@/utils'

export default defineComponent({
  name: 'TableStaffInformation',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const form = useVModel(props)
    const config = useConfig()
    const { staff } = fetchStaff()
    const { addressFull } = fetchAddress()

    const avatar = computed(() => {
      return `${config.browserBaseURL}/${staff.avatar}`
    })

    const onChangeDate = (_, dateString) => {
      form.value.date_of_joining = dateString
    }

    const dateOfJoining = computed(() => {
      return formatDate(form.value.date_of_joining)
    })

    return { staff, addressFull, avatar, form, onChangeDate, dateOfJoining }
  },
  methods: {
    open() {
      const dateOfJoiningRef = this.$refs.dateOfJoiningRef
      const pickerRef = dateOfJoiningRef.$refs.picker

      pickerRef.$refs.input.click()
    },
  },
})
</script>

<style scoped></style>
