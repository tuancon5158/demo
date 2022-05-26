<template>
  <a-switch v-model="modelValue" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseSwitch',
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false,
    },
    activeValue: {
      type: [Number, String, Boolean],
      default: true,
    },
    inactiveValue: {
      type: [Number, String, Boolean],
      default: false,
    },
  },
  setup(props, { emit }) {
    const isActive = computed(() => {
      return props.value === props.activeValue
    })
    const modelValue = computed({
      get() {
        return isActive.value
      },
      set(value) {
        emit('input', value ? props.activeValue : props.inactiveValue)
      },
    })

    onBeforeMount(() => {
      if (![props.activeValue, props.inactiveValue].includes(props.value)) {
        emit('input', props.inactiveValue)
      }
    })

    return { modelValue }
  },
})
</script>
