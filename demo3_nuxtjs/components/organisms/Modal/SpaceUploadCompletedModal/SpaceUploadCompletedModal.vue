<template>
  <Modal header-align="left" @onClose="handleClose">
    <template #header>
      <div>
        {{ $t('mypage.registerCompletedModal.heading') }}
      </div>
    </template>
    <template #body>
      <div class="registerCompletedModal_content">
        {{ $t('mypage.registerCompletedModal.subtitle') }}
      </div>
      <div class="howto_downloadDocs">
        <div class="howto_downloadDocs_item">
          <FileDownloadButton
            :name="$t('mypage.registerCompletedModal.doc')"
            icon-type="external-link"
            :link="docDownloadPath.sdk"
            type="externalLink"
          />
        </div>
        <div class="registerCompletedModal_content_note">
          {{ $t('mypage.registerCompletedModal.note') }}
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import FileDownloadButton from '~/components/atoms/FileDownloadButton/FileDownloadButton.vue'
import Modal from '~/components/atoms/Modal/Modal.vue'
import AppInfo from '~/constants'

export default defineComponent({
  name: 'SpaceUploadCompletedModal',

  components: {
    FileDownloadButton,
    Modal
  },

  setup(_, { emit }) {
    const docDownloadPath = reactive({
      sdk: `${AppInfo.SDK_CONFLUENCE_LINK}`
    })

    const handleClose = () => {
      emit('onClose')
    }

    return {
      handleClose,
      docDownloadPath
    }
  }
})
</script>

<style scoped lang="scss">
.registerCompletedModal_content {
  @include fz($font_size_s);

  &_note {
    color: $color_notice;
    @include fz($font_size_xxxs);
  }
}

.howto {
  &_downloadDocs {
    margin-top: $spacing_5x;

    &_item {
      margin-bottom: $spacing_2x;
    }
  }
}
</style>
