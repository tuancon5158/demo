<template>
  <Modal @onClose="onClose">
    <template #header>{{ $t('spaces.embedModal.heading') }}</template>
    <template #body>
      <div class="embedButtonModal_example">
        <div v-html="embedIframeCode()" />
      </div>
      <div>
        <p>{{ $t('spaces.embedModal.note') }}</p>
        <ClipBoard :value="embedIframeCode()" text-area />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import ClipBoard from '~/components/molecules/Form/ClipBoard/ClipBoard.vue'
import AppInfo from '~/constants'

export default defineComponent({
  name: 'EmbedButtonModal',

  components: {
    Modal,
    ClipBoard
  },

  props: {
    spaceId: {
      type: String,
      default: ''
    }
  },

  setup(props, { emit }) {
    const { app } = useContext()
    const embedIframeCode = () => {
      let embedSrc = ''

      if (app.i18n.locale !== 'ja') {
        embedSrc = `${app.$config.frontURL}/${app.i18n.locale}/embed/spaces/${props.spaceId}`
      } else {
        embedSrc = `${app.$config.frontURL}/embed/spaces/${props.spaceId}`
      }

      return `<iframe type="text/html" src="${embedSrc}" width="auto" height="56" style="border: 0"></iframe>`
    }

    const appInfo = computed(() => AppInfo)

    const onClose = () => {
      emit('onClose')
    }

    return {
      appInfo,
      onClose,
      embedIframeCode
    }
  }
})
</script>

<style lang="scss" scoped>
.embedButtonModal {
  &_example {
    width: 100%;
    padding: $spacing_10x $spacing_5x;
    margin-bottom: $spacing_10x;
    position: relative;
    text-align: center;
    background-color: $color_gray_lighten2;

    @include mb() {
      padding: $spacing_10x 0;
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
