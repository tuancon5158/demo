<template>
  <Modal @onClose="onClose">
    <template #header>
      <h3>イベント開催中です</h3>
    </template>
    <template #body>
      <div class="appLaunchModal">
        <p>
          チケット未購入です。
          <a class="appLaunchModal_link">
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
  name: 'TicketPaidCheckModal',

  components: {
    Modal,
    LinkText
  },

  setup(_, context: SetupContext) {
    const onClose = () => {
      context.emit('onCloseTickerUnPaidModal')
    }

    return {
      onClose
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
