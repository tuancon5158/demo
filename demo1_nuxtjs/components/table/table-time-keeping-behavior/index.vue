<template>
  <a-table
    :columns="columns"
    :data-source="items"
    :loading="loading"
    :pagination="false"
    :scroll="{ y: heightTable }"
    class="table-timekeeping-behavior"
    row-key="id"
  >
    <template #code="code, item, index">
      <span v-if="editableIndex !== index">{{ code }}</span>

      <a-input v-else :value="editableValue" @change="handleChange"></a-input>
    </template>
    <template #action="_, item, index">
      <a-button
        v-if="editableIndex !== index"
        type="link"
        @click="onEdit(index)"
      >
        Edit
      </a-button>

      <div v-else class="flex items-center">
        <a-button type="link" @click="onSave">Lưu</a-button>

        <a-button type="link" @click="onCancel">Huỷ</a-button>
      </div>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { useNotification, useSizeTable } from '@/composables'
import { ITimeKeepingBehavior } from '@/interfaces/timeKeeping'
import { useServiceBehavior } from '@/services'

export default defineComponent({
  name: 'TableTimeKeepingBehavior',

  props: {
    items: {
      type: Array as PropType<ITimeKeepingBehavior[]>,
      default: () => [],
    },
    loading: { type: Boolean, default: false },
  },

  setup(props) {
    const { edit } = useServiceBehavior()
    const { success, error } = useNotification()

    const editableIndex = ref(-1)
    const editableValue = ref('')

    const handleChange = (event: any) => {
      editableValue.value = event.target.value
    }

    const onCancel = () => {
      editableIndex.value = -1
    }

    const onEdit = (index: number) => {
      editableIndex.value = index
      editableValue.value = props.items[index].code

      setTimeout(onFocusInput, 100)
    }

    const onFocusInput = () => {
      const tableEl = document.querySelector(
        '.table-timekeeping-behavior'
      ) as HTMLElement

      const inputEls = Array.prototype.slice.call(
        tableEl.querySelectorAll('input')
      ) as HTMLInputElement[]

      inputEls[0].focus()
    }

    const onSave = async () => {
      try {
        const params = {
          ...props.items[editableIndex.value],
          code: editableValue.value,
        }

        await edit(params)

        // force update item not emit
        Object.assign(props.items[editableIndex.value], {
          code: editableValue.value,
        })
        editableValue.value = ''
        editableIndex.value = -1

        success('Cập nhật thành công.')
      } catch (e) {
        console.log(e)

        error(e?.data || 'Cập nhật thất bại.')
      }
    }

    return {
      columns,
      editableIndex,
      editableValue,
      handleChange,
      onCancel,
      onEdit,
      onSave,
      ...useSizeTable(false),
    }
  },
})

const columns = [
  { title: 'Loại vi phạm', dataIndex: 'name' },
  {
    title: 'Kỷ luật',
    dataIndex: 'code',
    scopedSlots: { customRender: 'code' },
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150,
  },
]
</script>
