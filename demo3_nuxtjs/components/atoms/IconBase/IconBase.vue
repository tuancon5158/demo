<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot></slot>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'IconBase',

  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    iconColor: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '18'
    },
    height: {
      type: String,
      default: '18'
    },
    viewBox: {
      type: String,
      default: '0, 0, 18, 18'
    }
  }
})
</script>
