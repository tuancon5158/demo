<template>
  <div class="tagSelection" :class="classes" @click="$emit('onClick')">
    <span class="tagSelection_label">{{ label }}</span>
    <span v-if="iconType === 'default'" class="tagSelection_iconText" @click="onDelete">x</span>
    <img
      v-if="iconType !== 'default' && iconType !== 'none'"
      :class="['tagSelection_icon', iconType === 'close' && 'tagSelection_icon--close']"
      :src="require(`@/assets/images/icon/icon-${iconType}.svg`)"
      @click="onDelete"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type TagProps = {
  label: string
  bgColor: string
  rounded: string
  size: string
  labelColor: string
  iconType: string
}

export default defineComponent({
  name: 'Tag',

  props: {
    label: {
      type: String,
      default: 'label'
    },
    bgColor: {
      type: String,
      default: 'secondary',
      validator: (value: string) => {
        return ['primary', 'secondary', 'default', 'danger', 'blue', 'light-blue', 'gray'].includes(
          value
        )
      }
    },
    size: {
      type: String,
      default: 'small',
      validator: (value: string) => {
        return ['small', 'medium'].includes(value)
      }
    },
    iconType: {
      type: String,
      default: 'none',
      validator: (value: string) => {
        return ['none', 'default', 'close-circle', 'close'].includes(value)
      }
    },
    labelColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['blue', 'gray', 'white'].includes(value)
      }
    },
    rounded: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    }
  },

  setup(props: TagProps, { emit }) {
    const onDelete = () => {
      emit('onDelete')
    }

    const classes = computed(() => {
      return {
        [`-size--${props.size}`]: props.size,
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-labelColor--${props.labelColor}`]: props.labelColor,
        [`-rounded--${props.rounded}`]: props.rounded
      }
    })

    return {
      classes,
      onDelete
    }
  }
})
</script>

<style scoped lang="scss">
.tagSelection {
  cursor: pointer;
  padding: $spacing_1x $spacing_3x;
  margin: 0;
  position: relative;
  text-decoration: none;
  font-style: normal;
  width: auto;
  touch-action: manipulation;
  letter-spacing: normal;
  border: none;
  display: inline-flex;
  align-items: center;

  &_iconText {
    display: flex;
    margin-left: $spacing_2x;
    cursor: pointer;
  }

  &_icon {
    margin-left: $spacing_2x;
    cursor: pointer;

    &--close {
      margin-left: $spacing_2x;
      margin-right: -$spacing_1x;
    }
  }

  &.-size {
    &--small {
      @include fz($font_size_xxxs);
      padding: $spacing_1x $spacing_3x;
      font-weight: $font_weight_normal;
      line-height: 18px;
    }

    &--medium {
      @include fz($font_size_xs);
      width: 105px;
      height: 38px;
      font-weight: $font_weight_medium;
      line-height: 20px;
    }
  }

  &.-labelColor {
    &--white {
      color: $color_white;
    }

    &--blue {
      color: $color_blue_400;
    }

    &--gray {
      color: $color_gray_800;
    }
  }

  &.-bgColor {
    &--default {
      background-color: $color_gray_darken1;
    }

    &--primary {
      background-color: $color_primary;
    }

    &--secondary {
      background-color: $color_secondary;
    }

    &--danger {
      background-color: $color_notice;
    }

    &--blue {
      background-color: $color_blue_50;
    }

    &--light-blue {
      background-color: $color_light_blue_100;
    }

    &--gray {
      background-color: $color_gray_700;
    }
  }

  &.-rounded {
    &--small {
      border-radius: $tag_BorderRadius_small;
    }

    &--medium {
      border-radius: $tag_BorderRadius_medium;
    }

    &--large {
      border-radius: $tag_BorderRadius_larger;
    }
  }
}
</style>
