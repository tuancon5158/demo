<template>
  <div>
    <a-button type="link" @click="open">Chi tiết</a-button>
    <a-modal
      v-model="visible"
      width="50%"
      centered
      :title="`Chi tiết khoản thu nhập ${item.id}`"
    >
      <a-descriptions size="middle" :column="1" bordered>
        <a-descriptions-item label="Trạng thái">
          <section-status :status="item.status"></section-status>
        </a-descriptions-item>
        <a-descriptions-item label="ID khoản">
          {{ item.id }}
        </a-descriptions-item>
        <a-descriptions-item label="Tên nhân sự">
          {{ item.user ? item.user.name : '' }} - {{ item.user.id }}
        </a-descriptions-item>
        <a-descriptions-item label="Tên khoản">
          {{ item.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Kỳ khoản">
          {{ item.kykhoan }}
        </a-descriptions-item>
        <a-descriptions-item label="Phòng ban">
          {{ item.department ? item.department.name : '' }}
        </a-descriptions-item>
        <a-descriptions-item label="Nguồn khoản">
          {{ item.type ? item.type.name : '' }}
        </a-descriptions-item>
        <a-descriptions-item label="Tiền dự kiến">
          {{ item.additional_amount }} ₫
        </a-descriptions-item>
        <a-descriptions-item label="Tiền nghiệm thu">
          <div v-if="!isEdit" class="flex items-center">
            <span v-currency="prevApprovedAmount"></span>
            <span class="ml-1">₫</span>
          </div>
          <div v-else>
            <a-input
              v-model="approvedAmount"
              style="max-width: 150px"
            ></a-input>
            <div class="float-right">
              <a-button type="link" @click="handleSaveAmount">Save</a-button>
              <a-button type="link" @click="handleCancelEditAmount">
                Cancel
              </a-button>
              <a-button v-if="type === 'CREATED'" icon="delete">Xóa</a-button>
            </div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="Ghi chú">
          <span>{{ prevNote }}</span>
        </a-descriptions-item>

        <a-descriptions-item label="Chứng từ đi kèm">
          <div class="w-1/2">
            <a-button icon="download" :disabled="!item.attached_files">
              Click để tải file
            </a-button>
          </div>
        </a-descriptions-item>
      </a-descriptions>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Lịch sử">
          <a-timeline v-if="historyLogs.length !== 0">
            <a-timeline-item
              v-for="(itemHistory, index) in historyLogs"
              :key="index"
              color="blue"
            >
              <div class="font-semibold text-base">
                {{ nameFormat.status[itemHistory.status] }} -
                {{ nameFormat.stage[itemHistory.stage] }} -
                {{ itemHistory.user.name }}
              </div>
              <div class="text-gray-400 text-sm">
                {{ itemHistory.updated_at }}
              </div>
              <div class="text-gray-400 text-sm">{{ itemHistory.note }}</div>
            </a-timeline-item>
          </a-timeline>
          <div v-else>No history</div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Phản hồi">
          <div>
            <div v-if="discussLogs.length !== 0" class="pl-12">
              <div
                v-for="(itemDiscuss, index) in discussLogs"
                :key="index"
                class="text-xs my-5 text-sm"
              >
                <a-card-meta>
                  <a-avatar slot="avatar" :src="itemDiscuss.user.avatar" />
                  <div slot="title" class="text-xs text-gray-300">
                    {{ itemDiscuss.user.name }} - {{ itemDiscuss.user.id }}
                  </div>
                  <div slot="description" class="text-sm -mt-1.5 text-black">
                    {{ itemDiscuss.message }}
                  </div>
                </a-card-meta>
              </div>
              <div class="mt-5">
                <form-discussion
                  :amount-id="item.id"
                  :discuss-logs="discussLogs"
                ></form-discussion>
              </div>
            </div>
            <div v-else>No data</div>
          </div>
        </a-tab-pane>
      </a-tabs>

      <template slot="footer">
        <a-button key="back" @click="close">Đóng</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import SectionStatus from '@table/table-duyet-de-xuat/section-status.vue'
import { useDrawer, useEditNote } from '@/composables'
import { useGetterTimeKeeping, useHistoryAndDiscuss } from '@/state'
import { IIncomeAmount } from '@/interfaces/incomeAmount'
import FormDiscussion from '@/components/form/form-discusstion.vue'

const nameFormat = {
  status: {
    APPROVED: 'Đang áp dụng',
    REJECTED: 'Khoản đã hủy',
  },
  stage: {
    CREATED: 'Đang trong kì',
    PENDING: 'Chờ duyệt',
    APPROVED: 'Đã duyệt',
    READY_FOR_PAY: 'Sẵn sàng thanh toán',
  },
}

export default defineComponent({
  name: 'ButtonDetailsReadyToPay',

  components: { SectionStatus, FormDiscussion },

  props: {
    type: {
      type: String,
      default: undefined,
    },
    item: {
      type: Object as PropType<IIncomeAmount>,
      default: () => ({}),
    },
  },

  setup(props) {
    const status = computed(() => {
      return props.item.discussion?.message || ''
    })

    // control modal
    const { visible, open, close } = useDrawer()

    const useAmountEdit = () => {
      const {
        isEditNote: isEdit,
        openEditNote: openEdit,
        closeEditNote: closeEdit,
        prevNote: prevApprovedAmount,
        note: approvedAmount,
        handleSaveNote: handleSaveAmount,
        handleCancelEditNote: handleCancelEditAmount,
      } = useEditNote(props.item.approved_amount_same_format)

      return {
        isEdit,
        openEdit,
        closeEdit,
        prevApprovedAmount,
        approvedAmount,
        handleSaveAmount,
        handleCancelEditAmount,
      }
    }

    const { historyLogs, discussLogs, getHistoryandDiscussDetails } =
      useHistoryAndDiscuss(props.item.id)

    watch(visible, current => {
      if (current) {
        getHistoryandDiscussDetails()
      }
    })

    /// / Edit Note

    // Approved Amount
    const attachments = ref(props.item.attachments)

    return {
      ...useGetterTimeKeeping(),
      getHistoryandDiscussDetails,
      ...useAmountEdit(),
      nameFormat,
      status,
      attachments,
      visible,
      open,
      close,
      historyLogs,
      discussLogs,
    }
  },
})
</script>
