<template>
  <div>
    <a-button type="link" @click="open">Edit</a-button>

    <a-modal v-model="visible" :closable="false" centered width="50%">
      <div>
        <h5>{{ currentItem.name }}</h5>

        <div class="mt-2">
          <a-checkbox
            v-model="timesheetFlexible"
            :value="DEFAULT_FLEXIBLE_TIMESHEET"
            @change="onChangeTimesheetFlexible"
          >
            Timesheet linh hoạt
          </a-checkbox>
        </div>
      </div>

      <div class="mt-6">
        <h5>Timesheet cố định</h5>

        <div class="mt-2">
          <a-checkbox-group v-model="internalItems[index].meta_data">
            <div class="flex flex-col space-y-2">
              <div v-for="option in options" :key="option.value">
                <a-checkbox
                  :value="option.value"
                  @change="onChangeTimesheetFixed"
                >
                  {{ option.label }}
                </a-checkbox>
              </div>
            </div>
          </a-checkbox-group>
        </div>
      </div>

      <template slot="footer">
        <a-button key="submit" type="primary" @click="onSave">Lưu</a-button>
        <a-button key="back" @click="close">Huỷ</a-button>
      </template>
    </a-modal>

    <a-modal
      v-model="confirmVisible"
      title="Xác nhận thay đổi"
      @cancel="onCancelSelectItem"
    >
      <div>
        <span v-if="selectedItem" class="font-bold">
          {{ selectedItem.name }}
        </span>
        đang thuộc về {{ items[differentIndex].name }}.
      </div>
      <div class="mt-6">
        Bạn có muốn đổi thành
        <span class="font-bold">{{ currentItem.name }} không?</span>
      </div>

      <template slot="footer">
        <a-button type="primary" @click="onConfirmSelectItem">Lưu</a-button>
        <a-button @click="onCancelSelectItem">Huỷ</a-button>
      </template>
    </a-modal>

    <a-modal
      v-model="confirmVisibleFlexible"
      title="Xác nhận thay đổi"
      @cancel="onCancelFlexible"
    >
      <div>
        <span class="font-bold">Timesheet linh hoạt</span>
        đang thuộc về {{ items[differentIndex].name }}.
      </div>
      <div class="mt-6">
        Bạn có muốn đổi thành
        <span class="font-bold">{{ currentItem.name }} không?</span>
      </div>

      <template slot="footer">
        <a-button type="primary" @click="onConfirmVisibleFlexible">
          Lưu
        </a-button>
        <a-button @click="onCancelFlexible">Huỷ</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  Ref,
  ref,
  toRefs,
  watch,
} from '@nuxtjs/composition-api'
import { without } from 'lodash'
import { useDrawer, useNotification } from '@/composables'
import { useTimesheets } from '@/state'
import { ITimeKeepingSetting } from '@/interfaces/timeKeeping'
import { useServiceTimeKeepingSetting } from '@/services'
import { cloneDeep } from '@/utils'
import { CheckboxEvent } from '@/interfaces/antdv'

export default defineComponent({
  name: 'ButtonEditTimesheet',

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

    const { index, items } = toRefs(props)

    const internalItems = ref<ITimeKeepingSetting[]>([])

    const currentItem = computed(
      () => internalItems.value[props.index] as ITimeKeepingSetting
    )

    const differentIndex = computed(() => (props.index === 0 ? 1 : 0))

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

    watch(
      () => props.items,
      value => {
        internalItems.value = cloneDeep(value)
      },
      { deep: true, immediate: true }
    )

    return {
      visible,
      open,
      close,

      currentItem,
      differentIndex,
      internalItems,
      onSave,
      ...useCheckbox(),
      ...useTimesheetFlexible(internalItems, index, differentIndex, items),
      ...useTimesheetFixed(internalItems, index, differentIndex),
    }
  },
})

const useCheckbox = () => {
  const { timesheets } = useTimesheets()

  const options = computed(() => {
    return timesheets.value.map(timesheet => ({
      label: timesheet.name,
      value: timesheet.id,
    }))
  })

  return { options }
}

const useTimesheetFlexible = (
  internalItems: Ref<ITimeKeepingSetting[]>,
  currentIndex: Ref<number>,
  differentIndex: Ref<number>,
  items: Ref<ITimeKeepingSetting[]>
) => {
  const DEFAULT_FLEXIBLE_TIMESHEET = 0
  const timesheetFlexible = ref(false)
  const confirmVisibleFlexible = ref(false)

  const currentItem = computed(() => internalItems.value[currentIndex.value])
  const differentItem = computed(
    () => internalItems.value[differentIndex.value]
  )

  const onChangeTimesheetFlexible = (event: CheckboxEvent) => {
    const { checked } = event.target

    if (!checked) return

    if (differentItem.value.meta_data.includes(DEFAULT_FLEXIBLE_TIMESHEET)) {
      confirmVisibleFlexible.value = true
    }

    internalItems.value[currentIndex.value].meta_data.push(
      DEFAULT_FLEXIBLE_TIMESHEET
    )
  }

  const onConfirmVisibleFlexible = () => {
    internalItems.value[differentIndex.value].meta_data = without(
      differentItem.value.meta_data,
      DEFAULT_FLEXIBLE_TIMESHEET
    )

    confirmVisibleFlexible.value = false
  }
  const onCancelFlexible = () => {
    internalItems.value[currentIndex.value].meta_data = without(
      currentItem.value.meta_data,
      DEFAULT_FLEXIBLE_TIMESHEET
    )

    confirmVisibleFlexible.value = false
  }

  watch(
    items,
    () => {
      timesheetFlexible.value = items.value[
        currentIndex.value
      ].meta_data.includes(DEFAULT_FLEXIBLE_TIMESHEET)
    },
    { immediate: true, deep: true }
  )

  return {
    timesheetFlexible,
    DEFAULT_FLEXIBLE_TIMESHEET,
    confirmVisibleFlexible,
    onCancelFlexible,
    onConfirmVisibleFlexible,
    onChangeTimesheetFlexible,
  }
}

const useTimesheetFixed = (
  internalItems: Ref<ITimeKeepingSetting[]>,
  currentIndex: Ref<number>,
  differentIndex: Ref<number>
) => {
  const { timesheets } = useTimesheets()

  const confirmVisible = ref(false)
  const selectedId = ref(-1)

  const differentItem = computed(
    () => internalItems.value[differentIndex.value]
  )

  const currentItem = computed(() => internalItems.value[currentIndex.value])

  const selectedItem = computed(() =>
    timesheets.value.find(timesheet => timesheet.id === selectedId.value)
  )

  const onChangeTimesheetFixed = (event: CheckboxEvent) => {
    const { checked, value } = event.target

    if (!checked) return

    if (differentItem.value.meta_data.includes(value)) {
      selectedId.value = value
      confirmVisible.value = true
    }
  }

  const onConfirmSelectItem = () => {
    internalItems.value[differentIndex.value].meta_data = without(
      differentItem.value.meta_data,
      selectedId.value
    )

    confirmVisible.value = false
  }

  const onCancelSelectItem = () => {
    internalItems.value[currentIndex.value].meta_data = without(
      currentItem.value.meta_data,
      selectedId.value
    )

    confirmVisible.value = false
  }

  return {
    confirmVisible,
    selectedId,
    selectedItem,
    onChangeTimesheetFixed,
    onConfirmSelectItem,
    onCancelSelectItem,
  }
}
</script>
