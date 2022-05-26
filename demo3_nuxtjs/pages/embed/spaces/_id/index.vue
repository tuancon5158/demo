<template>
  <div class="embedButton">
    <Button
      :label="$t('spaces.embedModal.iframeButton')"
      icon="logo-white"
      rounded
      size="large"
      bg-color="black"
      @onClick="hanldeClickOpenComonyApp"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRoute, useContext, onMounted } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import useAppLauncher from '~/composables/useAppLauncher'
import { I_SpaceDetailDTO } from '~/types/schema/space'

export default defineComponent({
  name: 'EmbedSpaceDetail',

  auth: false,

  components: {
    Button
  },

  layout: 'empty',

  setup() {
    const route = useRoute()
    const { $auth, app } = useContext()
    const spaceIdQuery = ref(route.value.params.id || '')
    const spaceDetail = ref<I_SpaceDetailDTO>({})

    onMounted(() => {
      getSpaceDetail()

      spaceTicketCheckUser()
    })

    const getSpaceDetail = () => {
      app
        .$repository('spaces')
        .getDetail(spaceIdQuery.value)
        .then((response) => {
          spaceDetail.value.anonymous = response.data.anonymous
          spaceDetail.value.shortLink = response.data.shortLink
          spaceDetail.value.deepLink = response.data.deepLink
        })
    }

    const isTicketAuthor = ref(false)
    const spaceTicketCheckUser = () => {
      if ($auth.loggedIn) {
        app
          .$repository('spaceTickets')
          .checkAuthor(spaceIdQuery.value)
          .then((response) => {
            isTicketAuthor.value = response.data.havePermission
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }

    const { handleClickComonyApp } = useAppLauncher()

    const hanldeClickOpenComonyApp = () => {
      const comonyAppArguments = {
        spaceId: spaceIdQuery.value,
        haveEvent: spaceDetail.value.spaceTicket?.haveEvent,
        eventNow: spaceDetail.value.spaceTicket?.eventNow,
        isTicketAuthor: isTicketAuthor.value,
        anonymous: spaceDetail.value?.anonymous,
        shortLink: spaceDetail.value?.shortLink,
        deepLink: spaceDetail.value?.deepLink,
        isIframe: true
      }

      handleClickComonyApp(comonyAppArguments)
    }

    return {
      hanldeClickOpenComonyApp
    }
  }
})
</script>
<style scoped lang="scss">
.embedButton {
  text-align: center;
}
</style>
