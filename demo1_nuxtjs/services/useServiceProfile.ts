import { useContext } from '@nuxtjs/composition-api'
import { useResource } from '@/services'
import { IGetAllStaffResonpse, IProfileII } from '@/interfaces/profile'

export const useServiceProfile = () => {
  const context = useContext()

  const { edit, get, add } = useResource<any>('v2/profiles/staffs')
  const { getDashboard } = useResource<IProfileII>('v2/profiles/dashboard')

  const { getListAll: getListProfile } = useResource<any>('v2/profiles/filter')

  const getAllStaffName = () => {
    return context.$axios.$get<IGetAllStaffResonpse>(
      `hrm/v2/profiles/all-staff`
    )
  }

  const updateWorkInfo = <P>(params?: P) => {
    return context.$axios.$put<any>(
      `hrm/v2/profiles/staff/update-work-info`,
      params
    )
  }
  const updateInfo = <P>(params?: P) => {
    return context.$axios.$put<any>(`hrm/v2/profiles/staff/update-info`, params)
  }

  const updateCompensation = <P>(params?: P) => {
    return context.$axios.$put<any>(
      `hrm/v2/profiles/staff/update-compensation`,
      params
    )
  }

  const getAllJobTitle = () => {
    return context.$axios.$get(`hrm/v2/titles/all-title`)
  }
  const all = <P>(params: P) => {
    return context.$axios.$post<any>(`/hrm/v2/profiles/filter`, params)
  }

  const updateWorkStatusLog = <P>(params: P) => {
    return context.$axios.$post<any>(`/hrm/work-status-log`, params)
  }

  return {
    all,
    edit,
    get,
    add,
    getDashboard,
    getListProfile,
    getAllStaffName,
    getAllJobTitle,
    updateWorkInfo,
    updateCompensation,
    updateInfo,
    updateWorkStatusLog,
  }
}
