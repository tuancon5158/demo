import { reactive, useRoute } from '@nuxtjs/composition-api'
import { useServiceProfile } from '@/services'

export const useFetchDetailProfile = () => {
  const route = useRoute()
  const id = Number(route.value.params.id)

  let formModel = reactive<any>({})

  const { get } = useServiceProfile()

  const fetch = async () => {
    const { data } = await get(id)

    formModel = { ...data.user }
    formModel.dept_id = data.user.dept_id
    formModel.area_id = data.user.area_id
    formModel.work_status_id = data.user.work_status_id
    formModel.wage_scale_id = data.user.wage_scale_id
    formModel.salary_formula = data.user.salary_formula || 24
    formModel.date_of_joining = data.user.date_of_joining || null
    formModel.labor_contracts = data.user.labor_contracts || []
    formModel.hr_records = data.user.hr_records || []
    formModel.direct_manager_id = data.user.direct_manager_id
    formModel.time_sheet_id = data.time_sheet_id || null
    // formModel.wage_weights =
    //   data.user.wage_weights.map((item: { id: any }) => item.id) || []
    // formModel.titles = data.user.titles?.length
    //   ? data.titles
    //   : [{ id: undefined, level: undefined }]
  }

  fetch()

  return { formModel, fetch }
}
