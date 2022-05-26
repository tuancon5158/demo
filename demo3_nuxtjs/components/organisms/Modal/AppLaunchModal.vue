<template>
  <Modal @onClose="onClose">
    <template #body>
      <div class="appLaunchModal">
        <strong>
          {{ $t('spaces.modalHeading1') }}
          <br />
          {{ $t('spaces.modalHeading2') }}
        </strong>
        <p>
          {{ $t('spaces.modalText1') }}
          <a class="appLaunchModal_link" @click="onClickOpenAppLaunch">
            {{ $t('spaces.modalText2') }}
          </a>
          {{ $t('spaces.modalLink1') }}
          <br />
          {{ $t('spaces.modalText3') }}
          <LinkText
            :value="$t('spaces.modalLink2')"
            color="secondary"
            :link="localePath('downloads')"
          />
          {{ $t('spaces.modalText4') }}
        </p>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'

export default defineComponent({
  name: 'AppLaunchModal',

  components: {
    Modal,
    LinkText
  },

  setup(_, context: SetupContext) {
    const onClose = () => {
      context.emit('onClose')
    }

    const onClickOpenAppLaunch = () => {
      context.emit('onClickOpenAppLaunch')
    }

    return {
      onClose,
      onClickOpenAppLaunch
    }
  }
})
</script>

<style lang="scss" scoped>
.appLaunchModal {
  &_link {
    color: $color_secondary;
  }
}
</style>
