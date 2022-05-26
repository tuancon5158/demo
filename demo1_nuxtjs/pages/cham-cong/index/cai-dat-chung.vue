<template>
  <div class="p-4 space-y-4">
    <table-time-keeping-setting
      :items="settings"
      :loading="$fetchState.pending"
      @done="$fetch"
    ></table-time-keeping-setting>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import TableTimeKeepingSetting from '@table/table-time-keeping-setting/index.vue'
import { useServiceTimeKeepingSetting } from '@/services'
import { ITimeKeepingSetting } from '@/interfaces/timeKeeping'

export default defineComponent({
  name: 'CaiDatChung',

  components: { TableTimeKeepingSetting },

  setup() {
    return {
      ...useFetchTimeKeepingSetting(),
    }
  },
})

const useFetchTimeKeepingSetting = () => {
  const { all } = useServiceTimeKeepingSetting()

  const settings = ref<ITimeKeepingSetting[]>([])

  useFetch(async () => {
    try {
      const data = await all()

      settings.value = data
    } catch (e) {
      console.log({ e })
    }
  })

  return { settings }
}
</script>
