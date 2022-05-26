<template>
  <div
    class="
      absolute
      top-0
      left-0
      flex flex-col
      items-center
      justify-center
      w-screen
      min-h-full
      font-sans font-normal
      text-black
    "
  >
    <h1
      v-if="error.statusCode === 404"
      class="text-4xl uppercase top-[100px] !text-2xl"
    >
      Page not found
    </h1>
    <template v-else>
      <h1 class="text-4xl uppercase">
        <span>{{ message }}</span>
      </h1>

      <nuxt-link to="/" class="text-lg">Quay lại</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      htmlAttrs: {
        class: 'overflow-hidden',
      },
      title: `Error - 404 Not Found`,
    }
  },
  computed: {
    message() {
      return this.error?.message || 'An error occurred'
    },
  },
}
</script>
