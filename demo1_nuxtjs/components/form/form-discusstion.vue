<template>
  <a-form-model
    ref="formRef"
    :label-col="{ span: 2 }"
    :wrapper-col="{ span: 20 }"
  >
    <a-form-model-item :colon="false" prop="additional_name">
      <span slot="label">
        <a-avatar
          v-if="$auth.user.avatar"
          :src="$config.mediaBaseURL + '/' + $auth.user.avatar"
        />
        <a-avatar v-else icon="user" />
      </span>

      <a-input
        v-model="discussionMessage"
        class="!w-full"
        size="large"
        placeholder="Phản hồi"
      />
    </a-form-model-item>
    <a-button type="primary" class="ml-11" @click="sendDiscussion">
      Gửi phản hồi
    </a-button>
  </a-form-model>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useServiceIncomeAmountDetail } from '@/services/useServiceIncomeAmountDetail'

export default defineComponent({
  name: 'FormDiscussion',

  components: {},

  props: {
    discussLogs: {
      type: Array,
      required: true,
    },
    amountId: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    return {
      ...useSendMessage(props.amountId),
    }
  },
})
export const useSendMessage = (id: number) => {
  const discussionMessage = ref('')
  const { addDiscussionsDetails } = useServiceIncomeAmountDetail()
  const sendDiscussion = async () => {
    try {
      await addDiscussionsDetails({
        amount_id: id,
        message: discussionMessage.value,
      })
      discussionMessage.value = ''
    } catch (e) {
      console.log({ e })
    }
  }

  return { discussionMessage, sendDiscussion }
}
</script>
