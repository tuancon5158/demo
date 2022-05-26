import { onBeforeMount, ref } from '@nuxtjs/composition-api'
import { useServiceBehavior } from '@/services'
import { IBehavior } from '@/interfaces/behavior'

export const behaviors = ref<IBehavior[]>([])

export const useBehaviors = () => {
  const { all } = useServiceBehavior()

  const fetch = async () => {
    try {
      const { data } = await all({})

      behaviors.value = data
    } catch (e) {
      console.log({ e })
    }
  }

  const findBehavior = (id: number) => {
    return behaviors.value.find(behavior => behavior.id === id)
  }

  onBeforeMount(async () => {
    if (behaviors.value.length) return

    await fetch()
  })

  return { behaviors, fetch, findBehavior }
}

export const useBehaviorType = () => {
  const behaviorTypes = [
    { value: 1, label: 'Khen thưởng' },
    { value: 2, label: 'Kỷ luật' },
  ]

  const getBehaviorType = (id: number) => {
    return behaviorTypes.find(type => type.value === id)
  }

  const getLabelBehaviorType = (id: number) => {
    const behaviorType = getBehaviorType(id)

    return behaviorType?.label || ''
  }

  return { behaviorTypes, getBehaviorType, getLabelBehaviorType }
}

export const useBehaviorApplyFor = () => {
  const behaviorApplyForItems = [
    { value: 1, label: 'Cá nhân' },
    { value: 2, label: 'Đơn vị' },
  ]

  const getBehaviorApplyFor = (id: number) => {
    return behaviorApplyForItems.find(item => item.value === id)
  }

  const getLabelBehaviorApplyFor = (id: number) => {
    const behaviorApplyFor = getBehaviorApplyFor(id)

    return behaviorApplyFor?.label || ''
  }

  return {
    behaviorApplyForItems,
    getBehaviorApplyFor,
    getLabelBehaviorApplyFor,
  }
}
