<template>
  <a-button
    :disabled="disabled"
    icon="check"
    type="primary"
    @click="onApprove"
  ></a-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Modal } from 'ant-design-vue'
import { useNotification } from '@/composables'

export default defineComponent({
  name: 'ButtonApprove',
  props: {
    callback: {
      type: Function as PropType<() => void>,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { error } = useNotification()

    const onApprove = () => {
      Modal.confirm({
        title: props.title || 'Bạn có chắc chắn muốn duyệt đơn?',
        onOk: async () => {
          try {
            await props.callback()
            emit('done')
          } catch (e) {
            error(e?.data)
          }
        },
        okText: 'Approve',
        cancelText: 'Huỷ bỏ',
      })
    }

    return { onApprove }
  },
})
</script>
