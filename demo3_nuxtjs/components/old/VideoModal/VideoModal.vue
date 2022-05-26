<template>
  <Modal v-if="visible" :size="size" @onClose="onClose">
    <template #content>
      <div class="videoModal_iframe">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/UWXxkT0Tgr4"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Modal from '~/components/atoms/Modal/Modal.vue'

export default defineComponent({
  name: 'VideoModal',

  components: {
    Modal
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'large'
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
.videoModal {
  &_iframe {
    width: 100%;
    padding-bottom: 48%;
    height: 0;
    position: relative;

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
