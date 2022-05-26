import { computed, Ref, ref, useFetch, watch } from '@nuxtjs/composition-api'
import { useServiceDateBlock } from '@/services'
import { E_BLOCK_TYPE, findTimeBlockType } from '@/state'
import { IDateBlock, IParamsDateBlock } from '@/interfaces/dateBlock'
import { ITimeBlock } from '@/interfaces/timeBlock'

export const useFetchDateBlock = (params: IParamsDateBlock) => {
  const { all } = useServiceDateBlock()

  const dateBlocks = ref<IDateBlock[]>([])
  const total = ref(0)

  const sortTimeBlock = (a: ITimeBlock, b: ITimeBlock) => {
    return a.period[0] - b.period[0]
  }

  const handleSuperSunday = (dateBlock: IDateBlock) => {
    const timeBlockTypeSupperSunday = findTimeBlockType(
      E_BLOCK_TYPE.SUPPER_SUNDAY
    )

    if (!timeBlockTypeSupperSunday) return dateBlock

    dateBlock.time_blocks = dateBlock.time_blocks.map(timeBlock => {
      timeBlock.block_type_id = E_BLOCK_TYPE.SUPPER_SUNDAY
      timeBlock.block_type = timeBlockTypeSupperSunday

      return timeBlock
    })

    return dateBlock
  }

  const handleHoliday = (dateBlock: IDateBlock) => {
    const { id, color, description, wage_weight, name } = dateBlock.holiday

    dateBlock.time_blocks = dateBlock.time_blocks.map(timeBlock => {
      // timeBlock.block_type_id = `holiday-${id}`
      timeBlock.block_type_id = id
      timeBlock.block_type = {
        bg_color: '',
        color,
        description,
        id,
        name,
        wage_weight,
      }

      return timeBlock
    })

    return dateBlock
  }

  const { fetch } = useFetch(async () => {
    try {
      const { data, meta } = await all(params)

      dateBlocks.value = data.map(item => {
        item.time_blocks.sort(sortTimeBlock)

        if (item.holiday) {
          item = handleHoliday(item)
        } else if (item.is_super_sunday) {
          item = handleSuperSunday(item)
        }

        return item
      })

      total.value = meta?.total || 0
    } catch (e) {
      console.log({ e })
    }
  })

  watch(params, fetch)

  return { dateBlocks, total, fetch }
}

export const useGetterDateBlock = (dateblocks: Ref<IDateBlock[]>) => {
  const getTimeBlocks = (time_blocks: ITimeBlock[]) => {
    return time_blocks.reduce((acc, time_block) => {
      const timeBlockIndex = acc.findIndex(
        item => item.id === time_block.block_type_id
      )
      const times = time_block.period[1] - time_block.period[0]

      if (timeBlockIndex >= 0) {
        acc[timeBlockIndex].times += times
      } else {
        acc.push({
          ...time_block.block_type,
          id: time_block.block_type_id,
          times,
        })
      }

      return acc
    }, [] as Array<{ id: number | string; times: number; color: string }>)
  }

  const getTotalTimeBlocks = computed(() => {
    return dateblocks.value.reduce((acc, dateBlock) => {
      const timeBlockByIndex = getTimeBlocks(dateBlock.time_blocks)

      if (!timeBlockByIndex.length) return acc

      timeBlockByIndex.forEach(time_block => {
        const timeBlockIndex = acc.findIndex(item => item.id === time_block.id)

        if (timeBlockIndex >= 0) {
          acc[timeBlockIndex].times += time_block.times
        } else {
          acc.push(time_block)
        }
      })

      return acc
    }, [] as Array<{ id: number | string; times: number; color: string }>)
  })

  return { getTimeBlocks, getTotalTimeBlocks }
}
