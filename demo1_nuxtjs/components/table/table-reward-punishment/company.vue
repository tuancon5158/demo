<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable, x: 2300 }"
    row-key="id"
  >
    <template #status="status">
      <tag-service-status :status="status"></tag-service-status>
    </template>
    <template #images="images">
      <div class="grid grid-cols-3 gap-2">
        <base-file-preview
          v-for="image in images"
          :key="image"
          :src="image"
          @click="onPreviewImage(image)"
        ></base-file-preview>
      </div>
    </template>
    <template #docs="docs">
      <div class="grid grid-cols-3 gap-2">
        <base-file-preview
          v-for="doc in docs"
          :key="doc"
          :src="doc"
          @click="onPreviewImage(doc)"
        ></base-file-preview>
      </div>
    </template>
    <template #action="id, item">
      <div>
        <button-approve
          :callback="() => approve({ ids: [id] })"
          :disabled="disabledBtnApprove(item)"
          @done="$emit('fetch')"
        ></button-approve>
        <button-reject
          :callback="() => reject({ ids: [id] })"
          :disabled="disabledBtnReject(item)"
          @done="$emit('fetch')"
        ></button-reject>
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import TagServiceStatus from '@common/tag-service-status.vue'
import ButtonApprove from '@/components/button/button-approve.vue'
import ButtonReject from '@/components/button/button-reject.vue'
import {
  useSizeTable,
  disabledBtnApprove,
  disabledBtnReject,
} from '@/composables'
import { useServiceRewardsPunishment } from '@/services'
import { IRewardsPunishment } from '@/interfaces/rewardsPunishments'

export default defineComponent({
  name: 'TableRewardPunishment',

  components: { TagServiceStatus, ButtonReject, ButtonApprove },

  props: {
    rewardPunishments: {
      type: Array as PropType<IRewardsPunishment[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { approve, reject } = useServiceRewardsPunishment()

    const items = computed(() => {
      return props.rewardPunishments?.map(item => ({
        ...item,
        applyFor: item.user
          ? item.user.name
          : item.branch
          ? item.branch.name
          : '',
      }))
    })

    return {
      columns,
      items,
      reject,
      approve,
      disabledBtnApprove,
      disabledBtnReject,
      ...useSizeTable(),
    }
  },

  methods: {
    onPreviewImage(image: string) {
      this.$router.push({
        path: '/rewards-punishment/personal/preview',
        query: { image },
      })
    },
  },
})

const columns = [
  {
    title: 'Người tạo',
    dataIndex: 'created_by_user.name',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Đơn vị',
    dataIndex: 'user.name',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Hành vi',
    dataIndex: 'behavior.name',
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'apply_date',
    width: 150,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    width: 300,
  },
  {
    title: 'Điểm',
    dataIndex: 'apply_value.user.points',
  },
  {
    title: 'Thu nhập (đ)',
    dataIndex: 'apply_value.user.money',
  },
  {
    title: 'Thu nhập (h)',
    dataIndex: 'apply_value.user.hours',
  },
  {
    title: 'Điểm chi nhánh',
    dataIndex: 'apply_value.branch.points',
  },
  {
    title: 'Tài liệu',
    dataIndex: 'docs',
    scopedSlots: { customRender: 'docs' },
    width: 180,
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'images',
    scopedSlots: { customRender: 'images' },
    width: 180,
  },
  {
    title: 'Phê duyệt',
    dataIndex: 'approved_by_user.name',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    width: 150,
  },
  {
    title: 'Hành động',
    dataIndex: 'id',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 150,
  },
]
</script>
