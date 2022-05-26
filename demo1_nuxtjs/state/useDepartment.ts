import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import {
  IConfigDepartment,
  IDepartment,
  IParamsDepartment,
} from '@/interfaces/department'
import { useServiceDepartment } from '@/services'

interface Type {
  value: number | undefined
  label: string
}
interface Level {
  value: string | undefined
  label: string
}
export const useTypeDepartment = () => {
  const types = ref<Type[]>([
    { value: undefined, label: 'Tất cả' },
    { value: 1, label: 'Trung Tâm' },
    { value: 2, label: 'Phòng' },
    { value: 3, label: 'Nhóm' },
    { value: 4, label: 'Cửa hàng' },
  ])

  const getTypeDepartment = (id: number) => {
    return types.value.find(type => type.value === id)
  }

  const getLabelTypeDepartment = (id: number) => {
    const type = getTypeDepartment(id)

    if (!type) return ''

    return type.label
  }

  return { types, getTypeDepartment, getLabelTypeDepartment }
}
export const useLevelReportDepartment = () => {
  const levels = ref<Level[]>([
    { value: undefined, label: 'Tất cả' },
    { value: `N1`, label: 'N1' },
    { value: `N2`, label: 'N2' },
    { value: `N3`, label: 'N3' },
    { value: `N4`, label: 'N4' },
    { value: `N5`, label: 'N5' },
  ])

  return { levels }
}

export const departments = ref<IDepartment[]>([])
export const config = ref<IConfigDepartment>()

export const useDepartments = (params: IParamsDepartment) => {
  const { all } = useServiceDepartment()

  const fetch = async () => {
    try {
      const { data } = await all(params)

      departments.value = data.departments
    } catch (e) {
      console.log({ e })
    }
  }

  const findDepartment = (id: number) => {
    return departments.value.find(department => department.id === id)
  }

  onBeforeMount(async () => {
    if (departments.value.length) return

    await fetch()
  })

  return { departments, fetch, findDepartment }
}

export const useConfigDepartments = () => {
  const { getConfig } = useServiceDepartment()

  const fetchConfig = async () => {
    try {
      const { data } = await getConfig({})

      config.value = data.config
    } catch (e) {
      console.log({ e })
    }
  }

  onBeforeMount(async () => {
    if (config.value) return

    await fetchConfig()
  })

  return { config, fetchConfig }
}
