<template>
  <Nuxt keep-alive />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { provideWorkspace } from '@/composables'
import { provideMember } from '@/composables/useSetMemberInfo'
import { provideLoginUser } from '@/store/login'

export default defineComponent({
  setup() {
    provideWorkspace()
    provideLoginUser()
    provideMember()
  }
})
</script>
