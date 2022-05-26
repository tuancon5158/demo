import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServiceBranch } from '@/services'
import { IBranch } from '@/interfaces/branch'

export const branches = ref<IBranch[]>([])

export const useBranchs = () => {
  const { all } = useServiceBranch()

  const fetch = async () => {
    try {
      const { data } = await all()

      branches.value = data
    } catch (e) {
      console.log({ e })
    }
  }

  const findBranch = (id: number) => {
    return branches.value.find(branch => branch.id === id)
  }

  onBeforeMount(async () => {
    if (branches.value.length) return

    await fetch()
  })

  return { branches, fetch, findBranch }
}
