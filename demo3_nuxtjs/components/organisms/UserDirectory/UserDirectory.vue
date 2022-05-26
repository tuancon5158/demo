<template>
  <section class="userDirectory">
    <section v-for="(item, index) in userDirectoryData" :key="index" class="userDirectory_item">
      <UserProfile
        :id="item.followingId"
        :image-path="getAvatarThumbnailUrl(item.following.thumbnailUrl)"
        :user-name="item.following.name"
        :company-name="item.following.companyName"
        :link="localePath({ name: 'profile-id', params: { id: item.followingId } })"
      />
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UserProfile from '~/components/organisms/UserProfile/UserProfile.vue'
import useCreateThumbnailPath from '~/composables/useCreateThumbnailPath'

export default defineComponent({
  name: 'UserDirectory',

  components: { UserProfile },

  props: {
    userDirectoryData: {
      type: Array,
      required: true
    },
    checkUser: {
      type: Boolean,
      required: true
    }
  },

  setup() {
    const { getAvatarThumbnailUrl } = useCreateThumbnailPath()

    return {
      getAvatarThumbnailUrl
    }
  }
})
</script>
<style scoped lang="scss">
.userDirectory {
  max-width: $dashboard_contents_W;
  padding: $spacing_14x 0 $spacing_44x;
  margin: 0 auto;

  @include mb() {
    padding: $spacing_6x $spacing_4x $spacing_14x;
    margin: 0 auto;
  }
  &_item {
    @include pc() {
      margin-bottom: $spacing_12x;
    }

    @include mb() {
      margin-bottom: $spacing_14x;
    }
  }
}
</style>
