import { computed, useStore } from '@nuxtjs/composition-api'
import { IRole } from '@/interfaces/policy'

export enum APPLY_FOR_ACCOUNT {
  MONTH = 1,
  QUARTER,
  YEAR,
}

export enum POLICY_TYPE {
  SELL = 1,
  SERVICE,
}

export enum APPLY_FOR_TYPE {
  PERSONAL = 1,
  BRANCH,
  NGANH_HANG,
}

export const useApplyForAccount = () => {
  const applyForAccounts = [
    { label: 'Khoản tháng', value: APPLY_FOR_ACCOUNT.MONTH },
    { label: 'Khoản quý', value: APPLY_FOR_ACCOUNT.QUARTER },
    { label: 'Khoản năm', value: APPLY_FOR_ACCOUNT.YEAR },
  ]

  const getApplyForAccount = (id: number) => {
    return applyForAccounts.find(item => item.value === id)
  }

  const getLabelApplyForAccount = (id: number) => {
    const applyForAccount = getApplyForAccount(id)

    if (!applyForAccount) return ''

    return applyForAccount.label
  }

  return { applyForAccounts, getApplyForAccount, getLabelApplyForAccount }
}

export const usePolicyType = () => {
  const policyTypes = [
    { label: 'Bán hàng / Doanh thu', value: POLICY_TYPE.SELL },
    { label: 'Theo vai trò phục vụ', value: POLICY_TYPE.SERVICE },
  ]

  const isSell = (id: number) => id === POLICY_TYPE.SELL
  const isService = (id: number) => id === POLICY_TYPE.SERVICE

  const getPolicyType = (id: number) => {
    return policyTypes.find(item => item.value === id)
  }

  const getLabelPolicyType = (id: number) => {
    const policyType = getPolicyType(id)

    if (!policyType) return ''

    return policyType.label
  }

  return { policyTypes, getPolicyType, getLabelPolicyType, isSell, isService }
}

export const useApplyForType = () => {
  const applyForTypes = [
    { label: 'Cá nhân bán', value: APPLY_FOR_TYPE.PERSONAL },
    { label: 'Chi nhánh bán', value: APPLY_FOR_TYPE.BRANCH },
    { label: 'Ngành hàng', value: APPLY_FOR_TYPE.NGANH_HANG },
  ]

  const getApplyForType = (id: number) => {
    return applyForTypes.find(item => item.value === id)
  }

  const getLabelApplyForType = (id: number) => {
    const applyForType = getApplyForType(id)

    if (!applyForType) return ''

    return applyForType.label
  }

  return { applyForTypes, getApplyForType, getLabelApplyForType }
}

export const usePolicyRole = () => {
  const store = useStore()

  const policyRoles = computed(() => {
    // @ts-ignore
    return store.state.resource.policyRoles
  })

  const getPolicyRole = (id: IRole) => {
    return policyRoles.value.find((item: any) => item.value === id)
  }

  const getLabelPolicyRole = (id: IRole) => {
    const role = getPolicyRole(id)

    if (!role) return ''

    return role.label
  }

  return { policyRoles, getPolicyRole, getLabelPolicyRole }
}

export const usePolicyModelNames = () => {
  const store = useStore()

  const policyModelNames = computed(() => {
    // @ts-ignore
    return store.state.resource.policyModelNames
  })

  const getPolicyModelNames = (id: IRole) => {
    return policyModelNames.value.find((item: any) => item.value === id)
  }

  const getLabelPolicyModelNames = (id: IRole) => {
    const modelName = getPolicyModelNames(id)

    if (!modelName) return ''

    return modelName.label
  }

  return { policyModelNames, getPolicyModelNames, getLabelPolicyModelNames }
}
