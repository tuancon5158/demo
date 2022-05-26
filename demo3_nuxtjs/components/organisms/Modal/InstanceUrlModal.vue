<template>
  <Modal header-align="left" @onClose="handleClose">
    <!-- 招待URL発行 -->
    <template #header>
      <div class="instanceUrl_head">
        {{ $t('spaces.instanceUrl.heading') }}
      </div>
    </template>
    <template #body>
      <div class="instanceUrl_body">
        <p class="instanceUrl_note">
          {{ $t('spaces.instanceUrl.note') }}
        </p>
        <p class="instanceUrl_date">
          {{ $t('spaces.instanceUrl.limit') }}:
          {{ getYmdwms(dataSource.expiredAt, $i18n.locale) }}
        </p>
        <ClipBoard is-instance-url :value="embedIframeCode()" />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import ClipBoard from '~/components/molecules/Form/ClipBoard/ClipBoard.vue'
import { dateFormat } from '~/composables/utilities/dateFormat'

export default defineComponent({
  name: 'InstanceUrlModal',

  components: {
    Modal,
    ClipBoard
  },

  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, context: SetupContext) {
    const { $config } = context.root
    const { getYmdwms } = dateFormat()

    const handleClose = () => {
      context.emit('onClose')
    }

    const embedIframeCode = () => {
      return `${$config.frontURL}/spaces/${props.dataSource.id}`
    }

    return {
      handleClose,
      embedIframeCode,
      getYmdwms
    }
  }
})
</script>

<style lang="scss" scoped>
/deep/ .modal_header {
  @include fz($font_size_l);
}
/deep/ .input {
  flex: 1;
}

/deep/ .clipBoard_input {
  display: flex;
}

.instanceUrl {
  &_body {
    @include fz($font_size_s);
  }

  &_note {
    margin: 0;
  }

  &_date {
    font-weight: $font_weight_medium;
    margin: $spacing_6x 0;
  }
}
</style>
