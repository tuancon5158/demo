<template>
  <div>
    <a-button type="link" @click="open">Edit</a-button>

    <a-modal v-model="visible" :closable="false" centered width="50%">
      <div>
        <h5>{{ currentItem.name }}</h5>
      </div>

      <div class="mt-3">
        <a-select
          :default-active-first-option="false"
          :filter-option="false"
          :show-arrow="false"
          class="!w-full"
          placeholder="Theo chức danh"
          show-search
          @search="onSearchPosition"
          @select="onSelectPosition"
        >
          <a-select-option
            v-for="option in autoCompleteOptions"
            :key="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
      </div>

      <div class="mt-6">
        <a-checkbox-group
          v-model="internalItems[index].meta_data"
          :options="checkboxOptions"
          class="!flex flex-col space-y-2"
        ></a-checkbox-group>
      </div>

      <template slot="footer">
        <a-button key="submit" type="primary" @click="onSave">Lưu</a-button>
        <a-button key="back" @click="close">Huỷ</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { useDrawer, useNotification } from '@/composables'
import { ITimeKeepingSetting } from '@/interfaces/timeKeeping'
import { useServiceTimeKeepingSetting } from '@/services'
import { usePositions } from '@/state'
import { removeVietnameseTones } from '@/utils'

export default defineComponent({
  name: 'ButtonEditPosition',

  props: {
    items: {
      type: Array as PropType<ITimeKeepingSetting[]>,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  setup(props, { emit }) {
    const { update } = useServiceTimeKeepingSetting()
    const { visible, open, close } = useDrawer()
    const { success, error } = useNotification()

    const internalItems = ref<ITimeKeepingSetting[]>(props.items)

    const currentItem = computed(
      () => internalItems.value[props.index] as ITimeKeepingSetting
    )

    const onSelectPosition = (id: number) => {
      internalItems.value[props.index].meta_data.push(id)
    }

    const onSave = async () => {
      try {
        await update(internalItems.value)

        emit('done')
        close()
        success('Cập nhật cài đặt thành công.')
      } catch (e) {
        console.log({ e })

        error(e?.message || 'Xuất hiện 1 lỗi.')
      }
    }

    return {
      visible,
      open,
      close,

      internalItems,
      currentItem,
      onSave,
      onSelectPosition,

      ...useSource(currentItem),
    }
  },
})

const useSource = (currentItem: ComputedRef<ITimeKeepingSetting>) => {
  const { positions } = usePositions()

  const queryString = ref('')

  const getTextFormatted = (string: string) => {
    return removeVietnameseTones(string.toString().toLowerCase())
  }

  const checkboxOptions = computed(() => {
    return positions.value
      .filter(position => {
        return currentItem.value.meta_data.includes(position.id)
      })
      .map(position => ({
        label: position.name,
        value: position.id,
      }))
  })

  const autoCompleteOptions = computed(() => {
    return positions.value
      .filter(position => {
        return !currentItem.value.meta_data.includes(position.id)
      })
      .filter(position => {
        const name = getTextFormatted(position.name)
        const query = getTextFormatted(queryString.value)

        return name.includes(query)
      })
      .map(position => ({
        value: position.id,
        label: position.name,
      }))
  })

  const onSearchPosition = (query: string) => {
    queryString.value = query
  }

  return { checkboxOptions, autoCompleteOptions, onSearchPosition }
}
</script>
