import { computed } from '@nuxtjs/composition-api'
import { IArea } from '@/interfaces/area'

const DEFAULT_AREA: IArea[] = [
  { name: 'Hồ Chí Minh', id: 1 },
  { name: 'Hà Nội', id: 2 },
]

export const useArea = () => {
  const areas = computed(() => {
    return DEFAULT_AREA.map(area => ({ label: area.name, value: area.id }))
  })

  const getArea = (id: number) => {
    return areas.value.find(area => area.value === id)
  }

  const getLabelArea = (id: number) => {
    const area = getArea(id)

    if (!area) return ''

    return area.label
  }

  return { areas, getArea, getLabelArea }
}
