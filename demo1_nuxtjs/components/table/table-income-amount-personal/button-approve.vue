<template>
  <a-button :disabled="disabled" type="link" @click="onApprove">Duyệt</a-button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Modal } from 'ant-design-vue'
import { useNotification } from '@/composables'
import { useServiceIncomeAmountDetail } from '@/services'
import { IIncomeAmountDetail } from '@/interfaces/incomeAmountDetail'

export default defineComponent({
  name: 'ButtonApprove',

  props: {
    item: {
      type: Object as PropType<IIncomeAmountDetail>,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const { error, success } = useNotification()
    const { edit } = useServiceIncomeAmountDetail()

    const onApprove = () => {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn duyệt đơn.',
        onOk: async () => {
          try {
            await edit({
              id: props.item.id,
              status: 1,
            })

            emit('done')
            success('Duyệt đơn thành công.')
          } catch (e) {
            console.log({ e })
            error('Duyệt đơn không thành công.')
          }
        },
        okText: 'Approve',
        cancelText: 'Huỷ bỏ',
      })
    }

    return {
      onApprove,
      disabled: computed(() => props.item.status !== 0),
    }
  },
})
</script>
