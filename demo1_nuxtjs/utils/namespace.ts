import { createBEM } from '@/utils/bem'

export function createNamespace(name: string) {
  const prefixedName = `t-${name}`

  return [prefixedName, createBEM(prefixedName)] as const
}
