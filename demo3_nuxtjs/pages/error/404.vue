<template>
  <!-- for ssr -->
  <ErrorLayout :error="{ statusCode: 404, message: 'This page could not be found' }" />
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
