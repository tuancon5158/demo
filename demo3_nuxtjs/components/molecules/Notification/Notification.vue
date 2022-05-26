<template>
  <div class="notification" :class="[classes, { 'is-active': status }]">
    <div class="notification_wrap">
      <span class="notification_message" v-html="message" />
      <div class="notification_redirectTo">
        <LinkText
          v-if="redirectTo"
          font-size="small"
          color="blue"
          :value="actionName"
          :link="redirectTo"
        />
        <IconBase
          class="notification_redirectTo_close"
          icon-name="close"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          :icon-color="type === 'error' ? '#db0505' : '#006cfa'"
          @click.native="handleClose"
        >
          <IconCloseNotification />
        </IconBase>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconCloseNotification from '~/components/icons/IconCloseNotification.vue'
import { injectNotification } from '@/composables'

type NotificationProps = {
  message: string
  status: boolean
  type: string
  redirectTo: string
}

export default defineComponent({
  name: 'Notification',

  components: { LinkText, IconCloseNotification, IconBase },

  props: {
    message: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['error', 'success', 'default'].includes(value)
      }
    },
    redirectTo: {
      type: String,
      default: ''
    }
  },

  setup(props: NotificationProps) {
    const { app } = useContext()
    const actionName = computed(() => app.i18n.t('notification.return'))

    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type
      }
    })

    const useGlobalNotificationState = injectNotification()

    const handleClose = () => {
      useGlobalNotificationState.setNotification('', 'success')
    }

    return {
      classes,
      actionName,
      handleClose
    }
  }
})
</script>

<style scoped lang="scss">
.notification {
  width: 600px;
  height: auto;
  @include fz($font_size_s);
  border-radius: 5px;
  padding: $spacing_3x;
  margin: 0;
  background: $color_white;
  border: none;
  position: fixed;
  z-index: $z_notification;
  transform: translate(50%, 100%);
  bottom: -10px;
  right: 50%;
  transition: all 0.2s ease;

  @include mb() {
    width: 90%;
  }

  &_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing_2x;
    min-height: 65px;
  }

  &_message {
    margin: $spacing_2x;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  &_redirectTo {
    flex: 0 0 auto;
    display: flex;
    gap: 1.6rem;
    justify-content: center;
    align-items: center;

    &_close {
      cursor: pointer;
      display: block;
    }
  }

  &.is-active {
    @include header-pc() {
      transform: translate(50%, -3.2rem);
    }

    @include header-mb() {
      transform: translate(50%, 0);
      bottom: 20px;
    }
  }

  &.-type {
    &--error {
      color: $color_notice;
      background-color: $color_notice_lighten1;
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    }

    &--success {
      background-color: $color_white;
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    }

    &--default {
      background-color: $color_white;
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    }
  }
}
</style>
