<template>
  <div>
    <a-button class="!px-0" type="link" @click="visible = true">
      Xem chi tiết
    </a-button>

    <a-modal v-model="visible" centered :title="title">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="Trạng thái">
          <section-status :status="item.status"></section-status>
        </a-descriptions-item>
        <a-descriptions-item label="Thời gian tạo">
          {{ item.createdDateTime }}
        </a-descriptions-item>
        <a-descriptions-item label="Tên nhân sự">
          {{ item.username }}
        </a-descriptions-item>
        <a-descriptions-item label="Thời gian bắt đầu">
          {{ item.startTime }}
        </a-descriptions-item>
        <a-descriptions-item label="Thời gian kết thúc">
          {{ item.endTime }}
        </a-descriptions-item>
        <a-descriptions-item label="Tổng số giờ">
          {{ item.totalTime }}
        </a-descriptions-item>
        <a-descriptions-item label="Khu vực">
          {{ item.area.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Phòng ban">
          {{ item.department.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Lý do">
          {{ item.note }}
        </a-descriptions-item>
        <a-descriptions-item label="Mã đơn">
          {{ item.id }}

          <button-copy :value="item.id" class="ml-2"></button-copy>
        </a-descriptions-item>
      </a-descriptions>

      <template slot="footer">
        <div v-if="item.status === SERVICE_STATUS.PENDING">
          <a-button :loading="loading" type="primary" @click="onConfirmApprove">
            Duyệt
          </a-button>

          <a-button
            :loading="loading"
            ghost
            type="danger"
            @click="onConfirmReject"
          >
            Không duyệt
          </a-button>
        </div>

        <div v-else-if="item.status === SERVICE_STATUS.SUCCESS">
          <a-popconfirm
            :ok-button-props="{ props: { type: 'danger' } }"
            cancel-text="Không"
            ok-text="Có"
            title="Bạn có chắc chắn muốn huỷ không?"
            @confirm="onReject"
          >
            <a-button :loading="loading" ghost type="danger">
              Huỷ duyệt
            </a-button>
          </a-popconfirm>

          <a-button @click="visible = false">Đóng</a-button>
        </div>

        <div v-else>
          <a-button @click="visible = false">Đóng</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import { Modal } from 'ant-design-vue'

import SectionStatus from '@table/table-duyet-de-xuat/section-status.vue'
import ButtonCopy from '@button/button-copy.vue'
import { SERVICE_STATUS, useNotification } from '@/composables'
import { useServiceOutside } from '@/services'
import { OUTSIDE_TYPE } from '@/state'
import { IOutside } from '@/interfaces/outside'

export default defineComponent({
  name: 'ButtonDetail',

  components: { ButtonCopy, SectionStatus },

  props: {
    item: {
      type: Object as PropType<IOutside>,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const { error } = useNotification()
    const { approve, reject } = useServiceOutside()

    const state = reactive({
      visible: false,
      loading: false,
    })

    const title = computed(() => {
      return props.item?.type === OUTSIDE_TYPE.OUTSIDE
        ? 'Chi tiết đơn xin làm ngoài'
        : 'Chi tiết đơn xin công tác'
    })

    const onConfirmApprove = () => {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn duyệt đơn?',
        onOk: async () => {
          try {
            state.loading = true
            await approve({ ids: [props.item.id] })
            emit('done')
          } catch (e) {
            error(e?.data)
          } finally {
            state.loading = false
          }
        },
        okText: 'Xác nhận',
        cancelText: 'Huỷ bỏ',
      })
    }
    const onConfirmReject = () => {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn huỷ duyệt đơn?',
        onOk: onReject,
        okText: 'Xác nhận',
        okButtonProps: {
          props: { type: 'danger' },
        },
        cancelText: 'Huỷ bỏ',
      })
    }
    const onReject = async () => {
      try {
        state.loading = true
        await reject({ ids: [props.item.id] })
        emit('done')
      } catch (e) {
        error(e?.data)
      } finally {
        state.loading = false
      }
    }

    return {
      title,
      SERVICE_STATUS,
      onConfirmApprove,
      onConfirmReject,
      onReject,
      ...toRefs(state),
    }
  },
})
</script>
