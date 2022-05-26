<template>
  <div class="appLogo" :class="classes">
    <IconBase
      class="appLogo_mark"
      :icon-color="iconColor"
      :width="markSize"
      :height="markSize"
      viewBox="0, 0, 50, 50"
      icon-name="comony"
    >
      <IconLogo />
    </IconBase>
    <IconBase
      class="appLogo_name"
      :icon-color="iconColor"
      :width="nameWidth"
      :height="nameHeight"
      viewBox="0, 0, 197, 31"
      icon-name="comony"
    >
      <IconComony />
    </IconBase>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconLogo from '~/components/icons/IconLogo.vue'
import IconComony from '~/components/icons/IconComony.vue'

// props type
type IconBaseProps = {
  size: string
  iconColor: string
  direction: string
}

export default defineComponent({
  name: 'AppLogo',

  components: {
    IconBase,
    IconLogo,
    IconComony
  },

  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['xsmall', 'small', 'medium', 'large'].includes(value)
      }
    },
    iconColor: {
      type: String,
      default: '#222'
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (value: string) => {
        return ['vertical', 'horizontal'].includes(value)
      }
    }
  },

  setup(props: IconBaseProps) {
    const classes = computed(() => {
      return {
        [`-size--${props.size}`]: props.size,
        [`-direction--${props.direction}`]: props.direction,
        [`-iconColor--${props.iconColor}`]: props.iconColor
      }
    })

    const markSize = computed((): string => {
      if (props.size === 'xsmall') return '12.5'

      if (props.size === 'small') return '24'

      if (props.size === 'medium') return '37.5'

      return '50'
    })

    const nameWidth = computed((): string => {
      if (props.size === 'xsmall') return '49.25'

      if (props.size === 'small') return '95'

      if (props.size === 'medium') return '147.75'

      return '197'
    })

    const nameHeight = computed((): string => {
      if (props.size === 'xsmall') return '12.5'

      if (props.size === 'small') return '24'

      if (props.size === 'medium') return '37.5'

      return '31'
    })

    return {
      classes,
      markSize, // Logo mark Width/Height
      nameWidth, // Logo comony Width
      nameHeight // Logo comony Height
    }
  }
})
</script>

<style lang="scss" scoped>
.appLogo {
  display: inline-block;

  &.-direction {
    &--horizontal {
      .appLogo_mark {
        display: block;
        margin: 0 auto $spacing_3x;
      }

      .appLogo_name {
        display: block;
        margin: 0 auto;
      }
    }

    &--vertical {
      display: inline-flex;
      align-items: center;
      height: 100%;

      .appLogo_mark {
        margin-right: $spacing_3x;
      }
    }
  }

  &.-size {
    &--small {
      &.-direction--horizontal {
        .appLogo_mark {
          margin-bottom: $spacing_1x;
        }
      }

      &.-direction--vertical {
        .appLogo_mark {
          margin-right: $spacing_1x;
        }
      }
    }

    &--large {
      &.-direction--horizontal {
        .appLogo_mark {
          margin-bottom: $spacing_4x;
        }
      }

      &.-direction--vertical {
        .appLogo_mark {
          margin-right: $spacing_4x;
        }
      }
    }
  }

  &.-iconColor {
    &--white {
      color: $color_white;
    }

    &--black {
      color: $color_gray_1000;
    }
  }
}
</style>
