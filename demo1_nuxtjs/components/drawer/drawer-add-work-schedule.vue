<template>
  <t-modalize
    :breaks="{
      top: { enabled: true, height: 250 },
      middle: { enabled: true, height: 250 },
      bottom: { enabled: true, offset: 100 },
    }"
    :visible.sync="visible"
    css-class="z-[99999]"
  >
    <template #activator="{ open }">
      <a-affix class="absolute right-[16px] bottom-[16px] z-10">
        <a-button
          icon="plus"
          shape="circle"
          size="large"
          type="primary"
          @click="open"
        ></a-button>
      </a-affix>
    </template>
    <section class="drawer">
      <h3 class="font-bold text-lg px-4">Thêm lịch làm việc</h3>

      <div class="flex flex-col divide-y">
        <span
          v-for="(item, key) in items"
          :key="key"
          class="block py-2 px-4 cursor-pointer"
          @click="redirect(item)"
        >
          {{ item.label }}
        </span>
      </div>
    </section>
  </t-modalize>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DrawerAddWorkSchedule',
  data() {
    return {
      items: [
        { label: 'Tăng ca', href: '/work-schedule/overtime/add' },
        { label: 'Làm bên ngoài', href: '/work-schedule/outside/add' },
        { label: 'Xin nghỉ phép', href: '/work-schedule/absence/add' },
      ],
      visible: false,
    }
  },
  methods: {
    redirect(item: any) {
      this.visible = false
      this.$router.push(item.href)
    },
  },
})
</script>
