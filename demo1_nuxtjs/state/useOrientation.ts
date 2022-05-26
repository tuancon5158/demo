import { ref } from '@nuxtjs/composition-api'

interface Orientations {
  value: number
  label: string
}

export const useOrientation = () => {
  const orientations = ref<Orientations[]>([
    { value: 1, label: 'Nhân viên' },
    { value: 2, label: 'Quản lý' },
  ])

  const getOrientation = (id: number) => {
    return orientations.value.find(orientation => orientation.value === id)
  }

  const getLabelOrientation = (id: number) => {
    const orientation = getOrientation(id)

    if (!orientation) return ''

    return orientation.label
  }

  return { orientations, getOrientation, getLabelOrientation }
}
