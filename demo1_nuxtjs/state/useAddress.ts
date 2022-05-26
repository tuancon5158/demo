import {
  computed,
  onBeforeMount,
  reactive,
  useRoute,
} from '@nuxtjs/composition-api'
import { useServiceAddress } from '@/services'
import { IAddress } from '@/interfaces/staff'

export const fetchAddress = () => {
  const { get } = useServiceAddress()
  const route = useRoute()
  const id = Number(route.value.params.id)

  const address = reactive<IAddress>({
    id,
    name: '',
    phone: '',
    tinh_thanhpho: '',
    quan_huyen: '',
    phuong_xa: '',
    so_nha: '',
  })

  const addressFull = computed(() => {
    let text = ''

    if (address.so_nha) text += `${address.so_nha}`

    if (address.phuong_xa) text += `, ${address.phuong_xa}`

    if (address.quan_huyen) text += `, ${address.quan_huyen}`

    if (address.tinh_thanhpho) text += `, ${address.tinh_thanhpho}`

    return text
  })

  onBeforeMount(async () => {
    try {
      const { data } = await get(id)

      const firstAddress = data[0] || {}

      address.name = firstAddress.name || ''
      address.phone = firstAddress.phone || ''
      address.tinh_thanhpho = firstAddress.tinh_thanhpho || ''
      address.quan_huyen = firstAddress.quan_huyen || ''
      address.phuong_xa = firstAddress.phuong_xa || ''
      address.so_nha = firstAddress.so_nha || ''
    } catch (e) {
      console.log({ e })
    }
  })

  return { address, addressFull }
}
