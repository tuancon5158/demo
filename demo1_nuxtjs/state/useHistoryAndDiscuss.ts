import { ref } from '@nuxtjs/composition-api'
import { useServiceIncomeAmountDetail } from '@/services/useServiceIncomeAmountDetail'

export const useHistoryAndDiscuss = (id: number) => {
  const { getHistoryDetails, getDiscussionsDetails } =
    useServiceIncomeAmountDetail()
  const historyLogs = ref([])
  const discussLogs = ref([])
  const getHistoryandDiscussDetails = async () => {
    try {
      const { data: dataHistory } = await getHistoryDetails(id.toString())
      const { data: dataDiscuss } = await getDiscussionsDetails(id.toString())

      historyLogs.value = dataHistory.activity_logs
      discussLogs.value = dataDiscuss.discussions
    } catch (e) {
      console.log({ e })
    }
  }

  return { historyLogs, discussLogs, getHistoryandDiscussDetails }
}
