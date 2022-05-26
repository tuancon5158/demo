import { useServiceAddressV2 } from '@/services'

export const fetchAddressV2 = () => {
  const { getAddress } = useServiceAddressV2()

  return {
    getAddress,
  }
}
