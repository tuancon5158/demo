<template>
  <a-tooltip v-model="modelValue" :placement="placement">
    <template slot="title">
      <template v-if="title">
        <span>{{ title }}</span>
      </template>

      <template v-else>
        <slot name="title"></slot>
      </template>
    </template>

    <slot></slot>
  </a-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseTooltip',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'top',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const visible = ref(false)

    const modelValue = computed({
      get() {
        if (props.disabled) return false

        return visible.value
      },
      set(value: boolean) {
        visible.value = value
      },
    })

    return { modelValue }
  },
})
</script>
