<template>
  <div class="flex items-center justify-between">
    <template v-if="isEdited">
      <div style="width: 300px">
        <a-select
          v-model="internalValue"
          :options="options"
          class="!w-full"
        ></a-select>
      </div>

      <div style="width: 130px; text-align: right">
        <a-button :disabled="isEqual" type="link" @click="onSave">Lưu</a-button>
        <a-button type="link" @click="isEdited = false">Huỷ</a-button>
      </div>
    </template>

    <template v-else>
      <div style="width: 300px">
        <span>{{ item.behavior.name }}</span>
      </div>

      <div style="width: 130px; text-align: right">
        <a-button type="link" @click="isEdited = true">Edit</a-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from '@nuxtjs/composition-api'
import { useServiceTimeKeeping } from '@/services'
import { ITimeKeeping } from '@/interfaces/timeKeeping'

export default defineComponent({
  name: 'EditNote',

  props: {
    item: {
      type: Object as PropType<ITimeKeeping>,
      required: true,
    },
  },

  setup(props) {
    const { update } = useServiceTimeKeeping()

    const isEdited = ref(false)
    const internalValue = ref(props.item.behavior.code)

    const isEqual = computed(
      () => internalValue.value === props.item.behavior.code
    )

    const options = computed(() => {
      return [
        { label: 'Quên chấm công', value: 'QUEN_CHAM_CONG' },
        { label: 'Đi muộn Dưới 5 phút', value: 'MUON_5' },
        { label: 'Đi muộn Dưới 15 phút', value: 'MUON_15' },
        { label: 'Đi muộn Dưới 30 phút', value: 'MUON_30' },
        { label: 'Đi muộn Trên 30 phút', value: 'MUON_TREN_30' },
        { label: 'Về sớm Dưới 5 phút', value: 'SOM_5' },
        { label: 'Về sớm Dưới 15 phút', value: 'SOM_15' },
        { label: 'Về sớm Dưới 30 phút', value: 'SOM_30' },
        { label: 'Về sớm Trên 30 phút', value: 'SOM_TREN_30' },
        { label: 'Không chấm công', value: 'KHONG_CHAM_CONG' },
        { label: 'Hợp lệ', value: 'HOP_LE' },
      ]
    })

    const onSave = async () => {
      try {
        const data = await update(props.item.id, {
          behavior_code: internalValue.value,
        })

        // warning: force update item but not emit
        Object.assign(props.item, data)

        isEdited.value = false
      } catch (e) {
        console.log({ e })
      }
    }

    return { isEdited, options, onSave, internalValue, isEqual }
  },
})
</script>
