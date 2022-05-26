<template>
  <!-- for ssr -->
  <ErrorLayout :error="{ statusCode: 403, message: 'Forbidden' }" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ErrorLayout from '~/layouts/error.vue'

export default defineComponent({
  name: 'ErrorPage',

  auth: false,

  components: {
    ErrorLayout
  },

  props: {
    error: {
      type: Object,
      default: null
    }
  }
})
</script>
