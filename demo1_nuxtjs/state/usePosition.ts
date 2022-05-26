import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServicePosition } from '@/services'
import { IPosition } from '@/interfaces/position'

export const positions = ref<IPosition[]>([])

export const usePositions = () => {
  const { all } = useServicePosition()

  const fetch = async () => {
    try {
      const { data } = await all({})

      positions.value = data
    } catch (e) {
      console.log({ e })
    }
  }

  const findPosition = (id: number) => {
    return positions.value.find(position => position.id === id)
  }

  onBeforeMount(async () => {
    if (positions.value.length) return

    await fetch()
  })

  return { positions, fetch, findPosition }
}
