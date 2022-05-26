<template>
  <a-config-provider :locale="locale">
    <div class="__auth" :style="{ height: 'calc(var(--vh, 1vh) * 100)' }">
      <nuxt></nuxt>
    </div>
  </a-config-provider>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import vi from 'ant-design-vue/lib/locale-provider/vi_VN'
import moment from 'moment'
import { useViewportHeight } from '@/composables'

import 'moment/locale/vi'

moment.locale('vi')

export default defineComponent({
  name: 'Mobile',
  setup() {
    useViewportHeight()
  },
  data() {
    return {
      locale: vi,
    }
  },
})
</script>
