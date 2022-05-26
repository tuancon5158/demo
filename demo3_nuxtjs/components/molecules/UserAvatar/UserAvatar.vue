<template>
  <div class="userAvatar" :class="classes">
    <CircleImage
      v-if="imageType === 'circle'"
      :size="avatarSize"
      type="image"
      :path="imagePath"
      :alt="userName"
      lazy-load
    />
    <SquareImage
      v-else
      class="userAvatar_image"
      :width="avatarSize"
      :height="avatarSize"
      border-color="none"
      :path="imagePath"
      :alt="userName"
    />
    <div v-if="userName" class="userAvatar_name">
      <span v-if="truncateLength">
        {{ truncateText(userName, truncateLength, '..') }}
      </span>
      <span v-else>{{ userName }}</span>
      <span v-if="userEmail" class="userAvatar_email">{{ userEmail }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { truncateFilter } from '~/composables/utilities/filters/truncate'
import SquareImage from '~/components/atoms/Image/SquareImage.vue'
import CircleImage from '~/components/atoms/Image/CircleImage.vue'

// props type
type UserAvatarProps = {
  size: string
  imagePath: string
  direction: string
  userName: string
  userEnail: string
  expand: boolean
  bgColor: string
}

export default defineComponent({
  name: 'UserAvatar',

  components: {
    SquareImage,
    CircleImage
  },

  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'].includes(value)
      }
    },
    imageType: {
      type: String,
      default: 'square',
      validator: (value: string) => {
        return ['square', 'circle'].includes(value)
      }
    },
    imagePath: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: (value: string) => {
        return ['vertical', 'horizontal'].includes(value)
      }
    },
    userName: {
      type: String,
      default: ''
    },
    truncateLength: {
      type: String,
      default: ''
    },
    userEmail: {
      type: String,
      default: ''
    },
    expand: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: 'white',
      validator: (value: string) => {
        return ['black', 'white'].includes(value)
      }
    }
  },

  setup(props: UserAvatarProps) {
    const truncateText = truncateFilter()

    const avatarSize = computed((): string => {
      if (props.size === 'xxsmall') return '20px'

      if (props.size === 'xsmall') return '27px'

      if (props.size === 'small') return '44px'

      if (props.size === 'medium') return '55px'

      if (props.size === 'large') return '115px'

      return '135px'
    })

    const classes = computed(() => {
      return {
        [`-direction--${props.direction}`]: props.direction,
        [`-size--${props.size}`]: props.size,
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        '--expand': props.expand
      }
    })

    return {
      avatarSize,
      classes,
      truncateText
    }
  }
})
</script>

<style scoped lang="scss">
.userAvatar {
  display: inline-block;

  &_image {
    margin: 0 auto;
  }

  &_name {
    color: $color_gray_900;
    margin: 0 $spacing_2x;
    word-break: break-word;
    flex: 1;
  }

  &_email {
    color: $color_gray_700;
    @include fz($font_size_xxxs);
  }

  &.-bgColor {
    &--black {
      color: $color_white;

      .userAvatar_name {
        color: $color_white;
      }

      .userAvatar_email {
        color: $color_gray_400;
      }
    }
  }

  &.-size {
    &--xsmall {
      .userAvatar_name {
        @include fz($font_size_label_m);
      }
    }

    &--small {
      .userAvatar_name {
        @include fz($font_size_xxs);
      }
    }

    &--large {
      .userAvatar_name {
        @include fz($font_size_m);
        font-weight: $font_weight_semiBold;
      }
    }
  }

  &.-direction {
    &--vertical {
      text-align: center;

      .userAvatar_name {
        margin-top: $spacing_4x;
      }
    }

    &--horizontal {
      display: inline-flex;
      align-items: center;

      .userAvatar_name {
        margin-left: $spacing_2x;
      }
    }
  }

  // make avatar name fixed when expanding
  &.--expand {
    width: 100%;

    & .userAvatar {
      &_name {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &_email {
        white-space: nowrap;
      }
    }
  }
}
</style>
