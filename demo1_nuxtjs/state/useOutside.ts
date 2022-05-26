import { reactive, useFetch, useRoute } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { useAuth } from '@/composables'
import { useServiceOutside } from '@/services'
import { IOutsideForm } from '@/interfaces/outside'

export enum OUTSIDE_TYPE {
  OUTSIDE = 1,
  MISSION,
}

export const useOutsideType = () => {
  const outsideTypes = [
    { label: 'Làm bên ngoài', value: OUTSIDE_TYPE.OUTSIDE },
    { label: 'Đi công tác', value: OUTSIDE_TYPE.MISSION },
  ]

  const isOutside = (id: number) => OUTSIDE_TYPE.OUTSIDE === id
  const isMission = (id: number) => OUTSIDE_TYPE.MISSION === id

  const getOutsideType = (id: number) => {
    return outsideTypes.find(outside => outside.value === id)
  }

  const getLabelOutsideType = (id: number) => {
    const outsideType = getOutsideType(id)

    if (!outsideType) return ''

    return outsideType.label
  }

  return {
    outsideTypes,
    getOutsideType,
    getLabelOutsideType,
    isOutside,
    isMission,
  }
}

export const useFetchDetailOutside = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)
  const { user } = useAuth()

  const formModel = reactive<IOutsideForm>({
    user_id: user.id,
    id,
    time_blocks: [],
    reason: '',
    images: [],
    location: '',
    type: 1,
    endDate: '',
    startDate: '',
    status: -1,
  })

  const { get } = useServiceOutside()

  const { fetch, fetchState } = useFetch(async () => {
    const { data } = await get(id)

    formModel.time_blocks = data.time_blocks.map(item => item.id)
    formModel.reason = data.reason
    formModel.images = data.images
    formModel.location = data.location
    formModel.type = data.type
    formModel.status = data.status

    const dateRange = data.time_blocks
      .map(timeBlock => timeBlock.date_block.date)
      .sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())

    formModel.startDate = dateRange[0]
    formModel.endDate = dateRange[dateRange.length - 1]
  })

  return { formModel, fetch, fetchState }
}
