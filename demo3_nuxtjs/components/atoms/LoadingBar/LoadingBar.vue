<template>
  <div class="loadingBar" :style="styles" :class="classes" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

// props type
type LoadingBarProps = {
  bgColor: string
  height: string
}

export default defineComponent({
  name: 'LoadingBar',

  props: {
    bgColor: {
      type: String,
      default: 'primary',
      validator: (value: string) => {
        return ['primary', 'secondary', 'black'].includes(value)
      }
    },
    height: {
      type: String,
      required: true,
      default: '10'
    }
  },

  setup(props: LoadingBarProps) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor
      }
    })

    const styles = computed(() => {
      return {
        '--height': `${props.height}px`
      }
    })

    return {
      classes,
      styles
    }
  }
})
</script>

<style lang="scss" scoped>
.loadingBar {
  --height: '5';
  height: var(--height);
  margin-bottom: $spacing_5x;
  border-radius: 5px;
  background: $color_gray_lighten1;

  position: absolute;
  width: 100%;
  top: 0;
  left: 0;

  &::before {
    -webkit-animation: loadinganimation 1s infinite ease-out;
    -moz-animation: loadinganimation 1s infinite ease-out;
    -o-animation: loadinganimation 1s infinite ease-out;
    -ms-animation: loadinganimation 1s infinite ease-out;
    animation: loadingAnimation 1s infinite ease-out;
    border-radius: 20px;
    background: $color_gray_lighten3;
    height: var(--height);
    content: '';
    position: absolute;
    left: 0;
    top: 0;
  }

  &.-bgColor {
    &--primary {
      &::before {
        background: $color_primary;
      }
    }

    &--secondary {
      &::before {
        background: $color_secondary;
      }
    }

    &--black {
      &::before {
        background: $color_gray_1000;
      }
    }
  }
}

@keyframes loadingAnimation {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}
</style>
