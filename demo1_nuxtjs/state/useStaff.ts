import { onBeforeMount, reactive, ref, useRoute } from '@nuxtjs/composition-api'
import { useServiceProfile, useServiceStaff } from '@/services'
import { IStaff } from '@/interfaces/staff'

export const staffs = ref<IStaff[]>([])

export const useStaffs = () => {
  const { getAllStaffName } = useServiceProfile()

  const fetch = async () => {
    try {
      const { data } = await getAllStaffName()

      staffs.value = data.all_staff.filter(item =>
        Boolean(item.name)
      ) as unknown as IStaff[]
    } catch (e) {
      console.log({ e })
    }
  }

  const findStaff = (id: number) => {
    return staffs.value.find(staff => staff.id === id)
  }

  onBeforeMount(async () => {
    if (staffs.value.length) return

    await fetch()
  })

  return { staffs, fetch, findStaff }
}

export const fetchStaff = () => {
  const { get } = useServiceStaff()
  const route = useRoute()
  const id = Number(route.value.params.id)

  const staff = reactive<IStaff>({
    id,
    avatar: '',
    name: '',
    code: '',
    phone: '',
    email: '',
    dob: '',
    cmnd: '',
    role_id: -1,
  })

  onBeforeMount(async () => {
    try {
      const { data } = await get(id)

      staff.name = data.name || ''
      staff.avatar = data.avatar || ''
      staff.code = data.code || ''
      staff.phone = data.phone || ''
      staff.email = data.email || ''
      staff.dob = data.dob || ''
      staff.cmnd = data.cmnd || ''
      staff.role_id = data.role_id || -1
    } catch (e) {
      console.log({ e })
    }
  })

  return { staff }
}
