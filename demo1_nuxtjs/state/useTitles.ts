import { ref } from '@nuxtjs/composition-api'
import { SelectOption } from '@/interfaces/antdv'

export const useGroupTitles = () => {
  const groups = ref<SelectOption[]>([
    { value: 'C', label: 'C', detail: 'Criticle (C)' },
    { value: 'P', label: 'P', detail: 'Professional (P)' },
    { value: 'S', label: 'S', detail: 'Specialist (S)' },
    { value: 'D', label: 'D', detail: 'Do-er (D)' },
  ])

  const getGroupTitles = (id: string) => {
    return groups.value.find(group => group.value === id)
  }

  const getLabelGroupTitles = (id: string) => {
    const group = getGroupTitles(id)

    if (!group) return ''

    return group.label
  }

  return { groups, getGroupTitles, getLabelGroupTitles }
}
export const useCareerPathTitles = () => {
  const careerPaths = ref<SelectOption[]>([
    { value: undefined, label: 'Tất cả' },
    { value: 1, label: 'Nhân viên' },
    { value: 2, label: 'Quản lý' },
    { value: 3, label: 'Lãnh đạo' },
    { value: 4, label: 'Chuyên viên' },
  ])

  const getCareerPathTitles = (id: number) => {
    return careerPaths.value.find(type => type.value === id)
  }

  const getLabelCareerPathTitles = (id: number) => {
    const type = getCareerPathTitles(id)

    if (!type) return ''

    return type.label
  }

  return { careerPaths, getLabelCareerPathTitles, getCareerPathTitles }
}

export const useCadreLevelTitles = () => {
  const cadreLevels = ref<SelectOption[]>([
    { value: undefined, label: 'Tất cả' },
    { value: 1, label: 'Cấp 1' },
    { value: 2, label: 'Cấp 2' },
    { value: 3, label: 'Cấp 3' },
    { value: 4, label: 'Cấp 4' },
    { value: 5, label: 'Cấp 5' },
    { value: 6, label: 'Cấp 6' },
    { value: 7, label: 'Cấp 7' },
  ])

  const getCadreLevelTitles = (id: number) => {
    return cadreLevels.value.find(cadre => cadre.value === id)
  }

  const getLabelCadreLevelTitles = (id: number) => {
    const cadre = getCadreLevelTitles(id)

    if (!cadre) return ''

    return cadre.label
  }

  return { cadreLevels, getLabelCadreLevelTitles, getCadreLevelTitles }
}

export const useBoundaryTitles = () => {
  const boundarys = ref<SelectOption[]>([
    { value: undefined, label: 'Tất cả' },
    { value: 1, label: 'Thừa' },
    { value: 2, label: 'Thiếu' },
    { value: 3, label: 'Đủ' },
  ])

  const getBoundaryTitles = (id: number) => {
    return boundarys.value.find(boundary => boundary.value === id)
  }

  const getLabelBoundaryTitles = (id: number) => {
    const boundary = getBoundaryTitles(id)

    if (!boundary) return ''

    return boundary.label
  }

  return { boundarys, getLabelBoundaryTitles, getBoundaryTitles }
}
