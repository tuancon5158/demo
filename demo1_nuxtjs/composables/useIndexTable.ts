import { IParams } from '@/interfaces/resource'

export const useIndexTable = (params: IParams<any>) => {
  const getIndex = (index: number) => {
    return (params.cur_page - 1) * params.per_page + index + 1
  }

  return { getIndex }
}
