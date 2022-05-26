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

            <a-button type="link" class="ml-auto" @click="openEdit">
              Edit
            </a-button>
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
            </div>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="Ghi chú">
          <div v-if="!isEditNote" class="flex items-center">
            <span>{{ prevNote }}</span>
            <a-button type="link" class="ml-auto" @click="openEditNote">
              Edit
            </a-button>
          </div>
          <div v-else>
            <a-input v-model="note" style="max-width: 150px"></a-input>
            <div class="float-right">
              <a-button type="link" @click="handleSaveNote">Save</a-button>
              <a-button type="link" @click="handleCancelEditNote">
                Cancel
              </a-button>
            </div>
          </div>
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
        <a-popover v-model="visiblePopUpApproved" trigger="click">
          <template slot="content" style="width: 300px">
            <div class="flex items-center gap-1.5">
              <a-icon type="exclamation-circle" />

              <p>
                Khi bạn
                <span class="text-green-300 font-medium">
                  Duyệt cho phép thanh toán.
                </span>
                <br />
                Khoản sẽ không thể Huỷ hoặc thay đổi.
                <br />
                Bạn có chắc chắn thao tác này?
              </p>
            </div>
            <div class="flex justify-end gap-x-1">
              <a-button key="back" @click="closeVisiblePopUpApproved">
                Không
              </a-button>
              <a-button
                key="submit"
                type="primary"
                @click="handleApprovedAmount"
              >
                Duyệt cho phép thanh toán
              </a-button>
            </div>
          </template>
        </a-popover>

        <a-button
          key="submit"
          type="primary"
          @click="toggleVisiblePopUpApproved"
        >
          Duyệt cho phép thanh toán
        </a-button>

        <a-popover v-model="visiblePopUp" trigger="click">
          <template slot="content">
            <div class="flex items-center gap-1.5">
              <a-icon type="exclamation-circle" />
              <p>Bạn có chắc chắn muốn hủy khoản không ?</p>
            </div>

            <div class="flex justify-end gap-x-1">
              <a-button key="back" @click="closeVisiblePopUp">Không</a-button>
              <a-button key="back" type="primary" @click="handleCancelAmount">
                Có
              </a-button>
            </div>
          </template>
        </a-popover>
        <a-button key="back" @click="toggleVisiblePopUp">Huỷ khoản</a-button>
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
import { useDrawer, useNotification, useEditNote } from '@/composables'
import { useGetterTimeKeeping, useHistoryAndDiscuss } from '@/state'
import { IIncomeAmount } from '@/interfaces/incomeAmount'
import FormDiscussion from '@/components/form/form-discusstion.vue'
import { useServiceIncomeAmountDetail } from '@/services/useServiceIncomeAmountDetail'

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
  name: 'ButtonDetailsApproved',

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

  setup(props, { emit }) {
    const { error, success } = useNotification()
    const status = computed(() => {
      return props.item.discussion?.message || ''
    })

    // control modal
    const { visible, open, close } = useDrawer()

    const { historyLogs, discussLogs, getHistoryandDiscussDetails } =
      useHistoryAndDiscuss(props.item.id)

    const attachments = ref(props.item.attachments)

    // Edit Approved Income
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

    watch(visible, current => {
      if (current) {
        getHistoryandDiscussDetails()
      }

      const { isEdit } = useAmountEdit()

      isEdit.value = false
    })

    // approve, cancel Amount

    const { approvedAmount: approvedAmountAPI, cancelAmount: cancelAmountAPI } =
      useServiceIncomeAmountDetail()
    const handleApprovedAmount = async () => {
      const { approvedAmount } = useAmountEdit()
      const { note } = useEditNote(props.item.note)

      if (approvedAmount.value === 0) {
        approvedAmount.value = props.item.additional_amount_same_format
      }

      try {
        await approvedAmountAPI({
          amount_id: props.item.id,
          approved_amount:
            approvedAmount.value || props.item.additional_amount_same_format,
          note: note.value,
          attachments: props.item.attachments,
        })
        success('Duyệt khoản thành công')
        emit('fetch')
      } catch (e) {
        error(e?.data || 'Vui lòng thử lại')
      }
    }

    const handleCancelAmount = async () => {
      try {
        await cancelAmountAPI({
          amount_id: props.item.id,
        })
        success('Hủy khoản thành công')
        emit('fetch')
      } catch (e) {
        error(e?.data || 'Vui lòng thử lại')
      }
    }

    return {
      ...useAmountEdit(),
      ...useGetterTimeKeeping(),
      ...useEditNote(props.item.note),
      ...usePopUpCancelAmount(),
      ...usePopUpApprovedAmount(),
      nameFormat,
      status,
      attachments,
      visible,
      open,
      close,
      historyLogs,
      discussLogs,
      handleCancelAmount,
      handleApprovedAmount,
    }
  },
})

const usePopUpCancelAmount = () => {
  const {
    visible: visiblePopUp,
    close: closeVisiblePopUp,
    toggle: toggleVisiblePopUp,
  } = useDrawer()

  return { visiblePopUp, closeVisiblePopUp, toggleVisiblePopUp }
}

const usePopUpApprovedAmount = () => {
  const {
    visible: visiblePopUpApproved,
    close: closeVisiblePopUpApproved,
    toggle: toggleVisiblePopUpApproved,
  } = useDrawer()

  return {
    visiblePopUpApproved,
    closeVisiblePopUpApproved,
    toggleVisiblePopUpApproved,
  }
}
</script>
