<template>
  <component
    :is="externalLink ? 'a' : 'nuxt-link'"
    :to="externalLink ? '' : link"
    :href="externalLink ? link : ''"
    :target="externalLink ? '_blank' : ''"
    :class="classes"
    class="link"
    @click="onClick"
  >
    {{ value }}
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@nuxtjs/composition-api'

// props type
type LinkTextProps = {
  value: string
  link: string
  color: string
  underline: boolean
  fontSize: string
}

export default defineComponent({
  name: 'LinkText',

  props: {
    value: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      default: 'small',
      validator: (value: string) => {
        return ['small', 'medium', 'standard', 'large'].includes(value)
      }
    },
    link: {
      type: String,
      default: ''
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['primary', 'secondary', 'black', 'notice', 'blue', 'white'].includes(value)
      }
    },
    underline: {
      type: Boolean,
      default: false
    }
  },

  setup(props: LinkTextProps, context: SetupContext) {
    const classes = computed(() => {
      return {
        [`-color--${props.color}`]: props.color,
        [`-fontSize--${props.fontSize}`]: props.fontSize,
        '-underline': props.underline
      }
    })

    // handle emit props when click link text
    const onClick = () => {
      context.emit('onClick')
    }

    return {
      classes,
      onClick
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  &.-color {
    &--black {
      color: $font_color_base;
    }

    &--primary {
      color: $color_primary;
    }

    &--secondary {
      color: $color_secondary;
    }

    &--notice {
      color: $color_notice;
    }

    &--blue {
      color: $color_blue;
    }

    &--white {
      color: $color_white;
    }
  }

  &.-fontSize {
    &--small {
      @include fz($font_size_xxs);
    }

    &--medium {
      @include fz($font_size_xs);

      @include mb() {
        @include fz($font_size_xsmall);
      }
    }

    &--standard {
      @include fz($font_size_standard);

      @include mb() {
        @include fz($font_size_xsmall);
      }
    }

    &--large {
      @include fz($font_size_m);

      @include mb() {
        @include fz($font_size_xsmall);
      }
    }
  }

  &:hover {
    text-decoration: underline;
  }

  &.-underline {
    transition: all 0.5s;
    text-decoration: underline;

    &:hover {
      opacity: 0.75;
    }
  }
}
</style>
