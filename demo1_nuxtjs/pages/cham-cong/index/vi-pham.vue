<template>
  <div class="p-4 space-y-4">
    <h5 class="px-2">Tổng: {{ behaviors.length }} loại</h5>

    <table-time-keeping-behavior
      :items="behaviors"
      :loading="$fetchState.pending"
    ></table-time-keeping-behavior>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import TableTimeKeepingBehavior from '@table/table-time-keeping-behavior/index.vue'
import { useServiceTimeKeepingBehavior } from '@/services/useServiceTimeKeepingBehavior'
import { ITimeKeepingBehavior } from '@/interfaces/timeKeeping'

export default defineComponent({
  name: 'ViPham',

  components: { TableTimeKeepingBehavior },

  setup() {
    return {
      ...useFetchTimeKeepingSetting(),
    }
  },
})

const useFetchTimeKeepingSetting = () => {
  const { all } = useServiceTimeKeepingBehavior()

  const behaviors = ref<ITimeKeepingBehavior[]>([])

  useFetch(async () => {
    try {
      const data = await all()

      behaviors.value = data
    } catch (e) {
      console.log({ e })
    }
  })

  return { behaviors }
}
</script>
