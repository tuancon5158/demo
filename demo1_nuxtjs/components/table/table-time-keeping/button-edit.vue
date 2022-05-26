<template>
  <div>
    <a-button type="link" @click="open">Edit</a-button>

    <a-modal
      v-model="visible"
      centered
      title="Lịch sử chấm công chi tiết"
      width="50%"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="Giờ đúng">
          {{ getRealDateTime(item) }}
        </a-descriptions-item>
        <a-descriptions-item label="Giờ tạo">
          {{ getStandardDateTime(item) }}
        </a-descriptions-item>
        <a-descriptions-item label="ID">
          <span class="mr-2">{{ item.id }}</span>

          <button-copy :value="item.id"></button-copy>
        </a-descriptions-item>
        <a-descriptions-item label="Tên nhân sự">
          {{ getUserName(item) }}
        </a-descriptions-item>
        <a-descriptions-item label="Phòng ban">
          {{ item.department.name }}
        </a-descriptions-item>
        <a-descriptions-item label="Loại chấm công">
          <section-type :type="item.type"></section-type>
        </a-descriptions-item>
        <a-descriptions-item label="Chi tiết">
          <edit-note :item="item"></edit-note>
        </a-descriptions-item>
        <a-descriptions-item label="Tình trạng chấm công">
          {{ item.method }}
        </a-descriptions-item>
        <a-descriptions-item label="Hình ảnh">
          <base-image
            v-if="item.image_path"
            :src="item.image_path"
          ></base-image>
        </a-descriptions-item>
      </a-descriptions>

      <template slot="footer">
        <a-button key="submit" type="primary" @click="close">Lưu</a-button>
        <a-button key="back" @click="close">Huỷ</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import SectionType from '@table/table-time-keeping/section-type.vue'
import EditNote from '@table/table-time-keeping/edit-note.vue'
import ButtonCopy from '@/components/button/button-copy.vue'
import BaseImage from '@/components/elements/base-image.vue'
import { useDrawer } from '@/composables'
import { useGetterTimeKeeping } from '@/state'
import { ITimeKeeping } from '@/interfaces/timeKeeping'

export default defineComponent({
  name: 'ButtonEdit',

  components: { BaseImage, EditNote, ButtonCopy, SectionType },

  props: {
    item: {
      type: Object as PropType<ITimeKeeping>,
      default: () => ({}),
    },
  },

  setup() {
    return {
      ...useDrawer(),
      ...useGetterTimeKeeping(),
    }
  },
})
</script>
