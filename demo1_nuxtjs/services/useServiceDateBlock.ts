import { useContext } from '@nuxtjs/composition-api'
import { useResource } from '@/services'
import { IDataDateOfUser, IParamsGetDateOfUser } from '@/interfaces/dateOfUser'
import { IResponse } from '@/interfaces/resource'
import { IDateBlock } from '@/interfaces/dateBlock'

export const useServiceDateBlock = () => {
  const context = useContext()
  const { all, add, edit, get } = useResource<IDateBlock>('date-blocks')

  const getDateOfUser = (params: IParamsGetDateOfUser) => {
    return context.$axios.$get<IResponse<IDataDateOfUser>>(
      'hrm/date-blocks/getDateOfUser',
      { params }
    )
  }

  return { all, add, edit, get, getDateOfUser }
}
