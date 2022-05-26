import { isArray, isExist } from '@/utils'

/**
 * @param array: T[]
 * @param rest: T[]
 * @return T[]
 * @example without([1, 2, 3, 4, 5], 1) => [2, 3, 4, 5]
 * @example without([1, 2, 3, 4, 5], 1, 2) => [3, 4, 5]
 */

export const without = <T>(array: T[], ...rest: T[]) => {
  return array.filter(item => !rest.includes(item))
}

export const parseQueryToArrayNumber = (
  query: string | undefined
): number[] => {
  const a = query ? query.split(',').map(Number) : []

  console.log({ a })

  return a
}

export const forceArray = (collection: any) => {
  if (isArray(collection)) return collection

  return isExist(collection) ? [collection] : []
}
