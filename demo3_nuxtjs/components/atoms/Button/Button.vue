<template>
  <component
    :is="externalLink ? 'a' : link !== '' ? 'nuxt-link' : 'button'"
    :to="!externalLink ? link : false"
    :href="externalLink ? link : false"
    :target="externalLink ? '_blank' : false"
    :class="classes"
    class="button"
    :disabled="disabled"
    v-on="externalLink ? {} : link !== '' ? {} : { click: onClick }"
  >
    <img
      v-if="icon"
      class="button_icon"
      :width="iconWidth"
      :height="iconHeight"
      :src="require(`@/assets/images/icon/icon-${icon}.svg`)"
      :alt="label"
    />
    <span class="button_label">{{ label }}</span>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type ButtonProps = {
  type: string
  label: string
  borderColor: string
  bgColor: string
  size: string
  rounded: boolean
  icon: string
  iconWidth: string
  iconHeight: string
  externalLink: boolean
  fullSize: boolean
  disabled: boolean
  labelColor: string
}

export default defineComponent({
  name: 'Button',

  props: {
    type: {
      type: String,
      default: 'button'
    },
    label: {
      type: String,
      default: 'button'
    },
    borderColor: {
      type: String,
      default: 'transparent',
      validator: (value: string) => {
        return [
          'transparent',
          'primary',
          'secondary',
          'white',
          'gray',
          'black',
          'blue',
          'red'
        ].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return [
          'primary',
          'secondary',
          'notice',
          'white',
          'black',
          'gray',
          'facebook',
          'twitter',
          'blue',
          'red',
          'transparent'
        ].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['xsmall', 'small', 'medium', 'large'].includes(value)
      }
    },
    rounded: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconWidth: {
      type: String,
      default: '20px'
    },
    iconHeight: {
      type: String,
      default: '20px'
    },
    link: {
      type: String,
      default: ''
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    fullSize: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['white', 'blue', 'red'].includes(value)
      }
    }
  },

  emits: ['onClick'],

  setup(props: ButtonProps, { emit }) {
    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type,
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-borderColor--${props.borderColor}`]: props.borderColor,
        [`-size--${props.size}`]: props.size,
        '-rounded': props.rounded,
        '-fullSize': props.fullSize,
        '-disabled': props.disabled,
        [`-labelColor--${props.labelColor}`]: props.labelColor
      }
    })

    const onClick = () => {
      emit('onClick')
    }

    return {
      classes,
      onClick
    }
  }
})
</script>

<style scoped lang="scss">
@import './Button.scss';
</style>
