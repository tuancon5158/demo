<template>
  <div class="py-4 px-2 bg-light-200 rounded" @click="onRedirectUpdate">
    <div class="flex justify-start space-x-4">
      <div class="w-8">
        <img src="https://img.icons8.com/office/344/free-shipping.png" alt="" />
      </div>

      <div class="flex-1 flex flex-col space-y-1">
        <div class="font-bold">
          <span>Ngày:</span>
          <span>{{ formattedDate }}</span>
        </div>
        <div>
          <span>Thời lượng:</span>
          <span class="font-bold">
            {{ totalMinutes }} phút ({{ changingTime.totalTime }} giờ)
          </span>
        </div>
        <div>
          <span class="inline">Nội dung:</span>
          <span class="inline">
            {{ changingTime.reason }}
          </span>
        </div>
        <span>
          <span>Trạng thái:</span>
          <span>
            <tag-service-status
              :status="changingTime.status"
              text
            ></tag-service-status>
          </span>
        </span>
      </div>

      <a-icon type="right" class="self-center" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRouter,
} from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import TagServiceStatus from '@/components/common/tag-service-status.vue'
import { IChangingTime } from '@/interfaces/changingTime'

export default defineComponent({
  name: 'ChangingTimeItem',
  components: { TagServiceStatus },
  props: {
    changingTime: {
      type: Object as PropType<IChangingTime>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const formattedDate = computed(() => {
      return dayjs(props.changingTime.updated_at).format('DD/MM/YYYY')
    })

    const totalMinutes = computed(() => {
      return props.changingTime.totalTime * 60
    })

    const onRedirectUpdate = () => {
      if (props.changingTime.model_name === 'OT') {
        return router.push(`/work-schedule/overtime/${props.changingTime.id}`)
      }

      if (props.changingTime.model_name === 'ABSENT') {
        return router.push(`/work-schedule/absence/${props.changingTime.id}`)
      }

      if (props.changingTime.model_name === 'OUTSIDE') {
        return router.push(`/work-schedule/outside/${props.changingTime.id}`)
      }
    }

    return { formattedDate, totalMinutes, onRedirectUpdate }
  },
})
</script>
