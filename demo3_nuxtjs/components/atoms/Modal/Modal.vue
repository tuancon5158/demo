<template>
  <transition name="modal">
    <div class="modal_backdrop" @click.self="onClose">
      <div
        :class="['modal', classes]"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <IconBase
          class="modal_header_close"
          width="24"
          height="24"
          viewBox="-3, -3, 20, 20"
          icon-name="comony"
          @click.native="onClose"
        >
          <IconCloseModal />
        </IconBase>
        <div v-if="size === 'large'">
          <section id="modalFullContent" class="modal_content">
            <slot name="content" />
          </section>
        </div>
        <div v-else>
          <header v-if="$slots.header" id="modalTitle" class="modal_header" :class="headerClasses">
            <slot name="header" />
          </header>
          <section id="modalDescription" class="modal_body">
            <slot name="body" />
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, SetupContext, computed } from '@nuxtjs/composition-api'
// props type
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconCloseModal from '~/components/icons/IconCloseModal.vue'
type ModalProps = {
  size: string
  bgColor: string
  headerAlign: string
}
export default defineComponent({
  name: 'Modal',
  components: { IconBase, IconCloseModal },
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['small', 'default', 'large', 'medium'].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'gray'].includes(value)
      }
    },
    headerAlign: {
      type: String,
      default: 'center',
      validator: (value: string) => {
        return ['center', 'left'].includes(value)
      }
    }
  },
  setup(props: ModalProps, context: SetupContext) {
    const classes = computed(() => {
      return {
        [`-size--${props.size}`]: props.size,
        [`-bgColor--${props.bgColor}`]: props.bgColor
      }
    })

    const headerClasses = computed(() => {
      return {
        [`-align--${props.headerAlign}`]: props.headerAlign
      }
    })

    const onClose = () => {
      context.emit('onClose')
    }

    return {
      classes,
      headerClasses,
      onClose
    }
  },
  head: {
    bodyAttrs: {
      class: 'body-fixed'
    }
  }
})
</script>
<style lang="scss" scoped>
.modal_backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z_modal;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  & .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    padding: $spacing_6x;
    color: $color_gray_900;
    background: $color_white;
    overflow-x: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: $modalContainer_BorderRadius;
    min-width: 60rem;

    @include mb() {
      max-width: 35rem;
      min-width: 90%;
      max-height: 90vh;
    }

    &.-size {
      &--large {
        width: 90%;
        max-width: map-get($breakpoints, xxl);
        height: auto;
        max-height: 90vh;
      }

      &--small {
        align-self: start;
        margin-top: $spacing_25x;
        width: 40%;
        min-width: 45rem;
        padding: $spacing_3x;
      }

      &--medium {
        max-height: 90vh;
        box-shadow: none;
      }
    }

    &.-bgColor {
      &--gray {
        background-color: $color_gray_lighten3;
      }
    }
  }
  & .modal_header {
    @include fz($font_size_xxl);
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: $spacing_4x;
    font-style: normal;
    border-bottom: 1px solid $color_gray_300;

    &_close {
      width: 24px;
      height: 24px;
      margin-left: auto;
      cursor: pointer;
      position: absolute;
      right: 2rem;
      top: 2rem;
      z-index: 1;
    }

    &.-align {
      &--center {
        justify-content: center;
      }
      &--left {
        justify-content: flex-start;
      }
    }
    :lang(en) & {
      @include mb() {
        height: unset;
      }
    }
  }
  & .modal_body {
    position: relative;
    padding-top: $spacing_6x;
  }
}

/* transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
