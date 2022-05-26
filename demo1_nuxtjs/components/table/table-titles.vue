<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable }"
    row-key="id"
  >
    <template #action="action, item">
      <a-button
        type="link"
        @click="redirect('/phong-ban-chuc-danh/danh-muc-chuc-danh/' + item.id)"
      >
        Thay đổi
      </a-button>
    </template>

    <template #code="code">
      <column-copy :value-copy="code" />
    </template>
    <template #name="name">
      <column-truncate-text :max-length="20" :text="name" />
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { useClipboard } from '@vueuse/core'
import ColumnCopy from '../common/column-copy.vue'
import ColumnTruncateText from '../common/column-truncate-text.vue'
import { ITitle } from '@/interfaces/titles'
import { useRouteHistory, useSizeTable } from '@/composables'

export default defineComponent({
  name: 'TableTitles',
  components: { ColumnCopy, ColumnTruncateText },

  props: {
    titles: { type: Array as PropType<ITitle[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { copy, copied } = useClipboard()
    const items = computed(() => {
      return props.titles?.map(item => ({
        ...item,
      }))
    })

    return {
      columns,
      copy,
      copied,
      items,
      ...useSizeTable(),
      ...useRouteHistory(),
    }
  },
})

const columns = [
  {
    title: 'Mã chức danh',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
    width: 150,
  },
  {
    title: 'Tên chức danh',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Cấp cán bộ',
    dataIndex: 'cadre_level',
    width: 150,
  },
  {
    title: 'Nhóm',
    dataIndex: 'group_detail',
    width: 150,
  },
  {
    title: 'Ngạch',
    dataIndex: 'career_path_detail',
    width: 150,
  },
  { title: 'Định biên', dataIndex: 'boundary', width: 150 },
  {
    title: 'Trạng thái',
    dataIndex: 'status_detail',
    width: 150,
  },

  {
    title: 'Hành động',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150,
  },
]
</script>
