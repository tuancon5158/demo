<template>
  <transition name="card_fade">
    <div
      :class="classes"
      class="card"
      role="dialog"
      aria-labelledby="cardTitle"
      aria-describedby="cardDescription"
    >
      <div id="cardTitle" class="card_title">
        <slot name="title" />
      </div>
      <div class="card_subtitle">
        <slot name="subtitle" />
      </div>
      <div id="cardDescription" class="card_body">
        <slot name="body" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
// import LoadingBar from '~/components/atoms/LoadingBar/LoadingBar.vue'

// props type
type CardProps = {
  isLoading: boolean
  loadingColor: string
  cardType: string
  widthSize: string
  cardPadding: string
  isShawdow: boolean
}
export default defineComponent({
  name: 'Card',

  // components: {
  //   LoadingBar
  // },

  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    loadingColor: {
      type: String,
      default: 'secondary'
    },
    cardType: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'horizon'].includes(value)
      }
    },
    widthSize: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium'].includes(value)
      }
    },
    cardPadding: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'small'].includes(value)
      }
    },
    isShawdow: {
      type: Boolean,
      default: true
    }
  },

  setup(props: CardProps) {
    const classes = computed(() => {
      return {
        [`-cardType--${props.cardType}`]: props.cardType,
        [`-size--${props.widthSize}`]: props.widthSize,
        [`-cardPadding--${props.cardPadding}`]: props.cardPadding,
        '-isLoading': props.isLoading,
        '-isShadow': props.isShawdow
      }
    })

    return {
      classes
    }
  }
})
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  background: $color_white;
  border-radius: 5px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  &.-cardPadding {
    &--default {
      @include pc() {
        padding: $spacing_10x;
      }

      @include mb() {
        padding: $spacing_10x $spacing_5x;
      }
    }

    &--small {
      @include pc() {
        padding: $spacing_4x;
      }

      @include mb() {
        padding: 0;
      }
    }
  }

  &.-isShadow {
    box-shadow: 0 2px 5px $color_gray_lighten3;
  }

  &.-isLoading {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $color_white;
      opacity: 0.5;
    }
  }

  &_title {
    @include fz($font_size_xxxl);
    font-weight: $font_weight_bold;
    display: flex;
    justify-content: space-around;
    margin-bottom: $spacing_5x;
  }

  &_subtitle {
    text-align: center;
    margin-bottom: $spacing_5x;
    @include fz($font_size_xxs);
    line-height: 1.5;
  }

  &.-cardType--horizon {
    margin: $spacing_3x;
    padding: 0 0 $spacing_8x 0;
    display: flex;
    box-shadow: none;
    width: 944.45px;
    height: 336.83px;

    & .card_header {
      width: 100%;
    }

    & .card_body {
      width: 80%;
      margin: 0 auto;
    }
  }

  &.-size {
    &--small {
      width: 600px;
    }

    &--medium {
      width: 700px;
    }
  }
}
</style>
