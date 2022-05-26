export const reduceTotal = <T, K extends keyof T>(
  collection: T[],
  prop: K
): number => {
  return collection.reduce<number>((sum, item) => {
    sum += Number(item[prop]) || 0

    return sum
  }, 0)
}
