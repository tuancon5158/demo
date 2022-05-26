<template>
  <Modal @onClose="onClose">
    <template #header>{{ $t('spaces.shareModal.heading') }}</template>
    <template #body>
      <div class="shareModal_heading">{{ $t('spaces.shareModal.sns') }}</div>
      <ul class="shareModal_snsShare">
        <li class="shareModal_snsShare_item">
          <a :href="`http://www.facebook.com/share.php?u=${shareText}`" target="_black">
            <img
              v-lazy="require(`@/assets/images/icon/icon-facebook-box.svg`)"
              alt="Share on Facebook"
            />
          </a>
        </li>
        <li class="shareModal_snsShare_item">
          <a :href="`https://twitter.com/share?url=${shareText}`" target="_black">
            <img
              v-lazy="require(`@/assets/images/icon/icon-twitter-box.svg`)"
              alt="Share on Twitter"
            />
          </a>
        </li>
        <!-- Need Email Share!? -->
        <!-- <li class="shareModal_snsShare_item">
          <a :href="`https://social-plugins.line.me/lineit/share?url=${shareText}`">
            <img
              v-lazy="require(`@/assets/images/icon/icon-email-box.svg`)"
              alt="Share on Facebook"
            />
          </a>
        </li> -->
        <li class="shareModal_snsShare_item">
          <a :href="`https://social-plugins.line.me/lineit/share?url=${shareText}`">
            <img v-lazy="require(`@/assets/images/icon/icon-line-box.svg`)" alt="Share on LINE" />
          </a>
        </li>
      </ul>
      <div class="shareModal_heading">{{ $t('spaces.shareModal.link') }}</div>
      <ClipBoard :value="shareText" />
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'
import ClipBoard from '~/components/molecules/Form/ClipBoard/ClipBoard.vue'

export default defineComponent({
  name: 'ShareModal',

  components: {
    Modal,
    ClipBoard
  },

  props: {
    shareText: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },

  setup(_, { emit }) {
    const onClose = () => {
      emit('onClose')
    }

    return {
      onClose
    }
  }
})
</script>

<style lang="scss" scoped>
.shareModal {
  &_heading {
    font-weight: $font_weight_medium;
    margin-bottom: $spacing_3x;
  }

  &_snsShare {
    display: flex;
    margin-bottom: $spacing_8x;
    border-bottom: 1px solid $color_gray_lighten1;
    padding-bottom: $spacing_8x;

    &_item {
      margin: 0 $spacing_1x $spacing_1x;
    }
  }
}
</style>
