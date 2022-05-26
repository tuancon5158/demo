<template>
  <UserAccountSettingForm v-if="$auth.user" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserAccountSettingForm from '~/components/organisms/UserAccountSettingForm/UserAccountSettingForm.vue'
import { useFetchUser } from '~/composables'

export default defineComponent({
  name: 'AccountSetting',

  components: { UserAccountSettingForm },

  layout: 'dashboard-single',

  setup() {
    const { fetchUser } = useFetchUser()

    fetchUser('login')
  }
})
</script>
