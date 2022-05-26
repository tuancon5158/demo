<template>
  <ElColorPicker v-model="modelValue" v-bind="$attrs" />
</template>

<script>
import { useVModel } from '@vueuse/core'
import ElColorPicker from 'element-ui/packages/color-picker/src/main.vue'
import 'element-ui/lib/theme-chalk/color-picker.css'
import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/button.css'

import lang from 'element-ui/src/locale/lang/vi'
import { use } from 'element-ui/src/locale'

use(lang)

export default {
  name: 'BaseColorPicker',
  components: { ElColorPicker },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const modelValue = useVModel(props)

    return { modelValue }
  },
}
</script>
