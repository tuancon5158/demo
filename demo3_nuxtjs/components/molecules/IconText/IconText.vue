<template>
  <div class="iconText">
    <div v-if="iconSide === 'left'" class="iconText_icon">
      <IconBase
        name="iconText_icon"
        width="16"
        height="14"
        viewBox="0, 0, 16, 16"
        icon-name="left-side-icon"
      >
        <slot name="icon"></slot>
      </IconBase>
    </div>
    <div class="iconText_content" :class="classes">
      <div v-if="!isLink">
        <a @click="handleClick">{{ msg }}</a>
      </div>
      <LinkText v-else :link="to" :font-size="fontSize" color="secondary" :value="msg" />
    </div>
    <div v-if="iconSide === 'right'" class="iconText_icon">
      <IconBase
        name="iconText_icon"
        width="16"
        height="14"
        viewBox="0, 0, 16, 16"
        icon-name="right-side-icon"
      >
        <slot name="icon"></slot>
      </IconBase>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import LinkText from '~/components/atoms/LinkText/LinkText.vue'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
// props type
type IconTextProps = {
  // Text
  msg: string
  isLink: boolean
  to: string
  color: string
  fontSize: string
  bgColor: string
  space: string
  iconSide: string
  width: string
  height: string
}
export default defineComponent({
  name: 'IconText',
  components: { LinkText, IconBase },
  props: {
    msg: {
      type: String,
      require: true,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ''
    },
    iconSide: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['left', 'right'].includes(value)
      }
    },
    fontSize: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large', 'extraLarge'].includes(value)
      }
    },
    color: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return [
          'primary',
          'secondary',
          'notice',
          'darkblue',
          'black',
          'white',
          'gray',
          'blue'
        ].includes(value)
      }
    },
    space: {
      type: String,
      default: 'small',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    width: {
      type: String,
      default: '24'
    },
    height: {
      type: String,
      default: '24'
    },
    viewBox: {
      type: String,
      default: '0 0 36 36'
    }
  },
  emits: ['onLink'],
  setup(props: IconTextProps, { emit }) {
    const classes = computed(() => {
      return {
        [`-space--${props.space}`]: props.space,
        [`-color--${props.color}`]: props.color,
        [`-fontSize--${props.fontSize}`]: props.fontSize
      }
    })
    const handleClick = (e: InputEvent) => {
      emit('onLink', e)
    }

    return {
      classes,
      handleClick
    }
  }
})
</script>

<style scoped lang="scss">
.iconText {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  &_icon {
    display: contents;
  }
  &_content {
    &.-space {
      &--small {
        margin: 0 $spacing_1x;
      }
      &--medium {
        margin: 0 $spacing_2x;
      }
      &--large {
        margin: 0 $spacing_3x;
      }
    }
    &.-color {
      &--primary {
        color: $color_primary;
      }
      &--secondary {
        color: $color_secondary;
      }
      &--notice {
        color: $color_notice;
      }
      &--darkblue {
        color: $color_darkblue;
      }
      &--black {
        color: $font_color_base;
      }
      &--white {
        color: $color_white;
      }
      &--gray {
        color: $color_gray_darken1;
      }
      &--blue {
        color: $color_blue_400;
      }
    }
    &.-fontSize {
      &--small {
        @include fz($font_size_xxxs);
      }
      &--medium {
        @include fz($font_size_xs);
      }
      &--large {
        @include fz($font_size_s);
      }
      &--extraLarge {
        @include fz($font_size_xxxl);
      }
    }
  }
}
</style>
