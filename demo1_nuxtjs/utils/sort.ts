export function sortNumber<T>(
  transform = (props: T): number => props as unknown as number
) {
  return (a: T, b: T) => {
    return Number(transform(a)) - Number(transform(b))
  }
}

export function sortString<T>(
  transform = (props: T): string => props as unknown as string
) {
  return (a: T, b: T) => {
    return transform(a).localeCompare(transform(b))
  }
}

export function sortDate<T>(
  transform = (props: T): string => props as unknown as string
) {
  return (a: T, b: T) => {
    const date1 = new Date(transform(a))
    const date2 = new Date(transform(b))

    return date1.getTime() - date2.getTime()
  }
}
