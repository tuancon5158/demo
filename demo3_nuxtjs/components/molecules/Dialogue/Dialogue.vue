<template>
  <transition name="dialog">
    <div class="dialog_mask">
      <div class="dialog_wrapper" @click.self="isDelete ? $emit('onValidate') : $emit('onClose')">
        <div class="dialog_contents">
          <div class="dialog_heading">{{ title }}</div>
          <div class="dialog_footer">
            <Button
              class="dialog_button"
              :label="backButton"
              bg-color="transparent"
              border-color="red"
              @onClick="$emit('onClose')"
            />
            <Button
              class="dialog_button"
              bg-color="blue"
              :is-loading="isLoading"
              :label="confirmButton"
              @onClick="$emit('onValidate')"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'

export default defineComponent({
  name: 'Dialogue',

  components: {
    Button
  },

  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Dialogue Title'
    },
    backButton: {
      type: String,
      default: 'Close'
    },
    confirmButton: {
      type: String,
      default: 'Save'
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },

  setup() {},
  head: {
    bodyAttrs: {
      class: 'body-fixed'
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog {
  &_mask {
    position: fixed;
    z-index: 9000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color_gray_1000, 0.5);
    display: table;
    transition: opacity 0.5s ease-out;
  }

  &_wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &_contents {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    max-height: 90vh;
    height: auto;
    margin: 0 auto;
    text-align: left;
    background-color: $color_white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba($color_gray_1000, 0.25);
    transition: all 0.5s ease-out;
    transform: translate(-50%, -50%);
    padding: $spacing_8x;

    @include mb() {
      width: 95vw;
    }
  }

  &_heading {
    @include fz($font_size_xxl);
    color: $color_gray_900;
    font-weight: medium;
    margin-bottom: $spacing_5x;
  }

  &_footer {
    text-align: center;
    display: flex;

    @include mb() {
      justify-content: center;
    }
  }

  &_button {
    width: 100%;
    flex: 1;

    &:first-child {
      margin-right: $spacing_6x;
      @include mb() {
        margin-right: $spacing_4x;
      }
    }
  }
}
// transition
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s;

  .dialog_wrapper {
    transition: opacity 0.2s, transform 0.2s;
  }
}

.dialog-leave-active {
  transition: opacity 0.4s ease 0.2s;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;

  .dialog_wrapper {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
