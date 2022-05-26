<template>
  <a-button
    :disabled="disabled"
    icon="close"
    type="danger"
    @click="onReject"
  ></a-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Modal } from 'ant-design-vue'
import { useNotification } from '@/composables'

export default defineComponent({
  name: 'ButtonReject',
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

    const onReject = () => {
      Modal.confirm({
        title: props.title || 'Bạn có chắc chắn muốn reject đơn?',
        onOk: async () => {
          try {
            await props.callback()
            emit('done')
          } catch (e) {
            error(e?.data)
          }
        },
        okText: 'Reject',
        okButtonProps: {
          props: { type: 'danger' },
        },
        cancelText: 'Huỷ bỏ',
      })
    }

    return { onReject }
  },
})
</script>

<style scoped></style>
