<template>
  <div class="stepper">
    <ul class="stepper_list" :class="classes">
      <li
        v-for="(item, index) in options.headers"
        :key="index"
        class="stepper_item"
        :class="{ '-active': index + 1 <= currentNumber }"
      >
        <div class="stepper_number">{{ index + 1 }}</div>
        <div class="step-name">
          <span class="stepper_title is-pc">{{ item.title_pc }}</span>
          <span class="stepper_title is-sp">{{ item.title_sp }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

// props type
type StepperProps = {
  options: Array<string>
  position: string
}

export default defineComponent({
  name: 'Stepper',

  props: {
    options: {
      type: Object as PropType<StepperProps>,
      default: () => {}
    },
    currentNumber: {
      type: Number,
      default: 1 // start from 1
    },
    position: {
      type: String,
      default: 'left',
      validator: (value: string) => {
        return ['left', 'center', 'right'].includes(value)
      }
    }
  },

  setup(props: StepperProps) {
    const classes = computed(() => {
      return {
        [`-position--${props.position}`]: props.position
      }
    })

    return {
      classes
    }
  }
})
</script>

<style scoped lang="scss">
$numberH_pc: 38px;
$numberH_sp: 28px;

.stepper {
  &_list {
    display: flex;
    align-items: center;
    padding: 0 $spacing_4x;

    &.-position {
      &--left {
        justify-content: flex-start;
      }

      &--center {
        justify-content: center;
      }

      &--right {
        justify-content: flex-end;
      }
    }
  }

  &_number {
    display: inline-block;
    text-align: center;
    background: $color_gray;
    color: $color_white;
    border-radius: 100%;
    flex: 0 0 auto;

    @include mb() {
      width: $numberH_sp;
      height: $numberH_sp;
      line-height: $numberH_sp;
      @include fz($font_size_base);
    }

    @include pc() {
      width: $numberH_pc;
      height: $numberH_pc;
      line-height: $numberH_pc;
      margin-right: $spacing_1x;
      @include fz($font_size_m);
    }
  }

  &_item {
    position: relative;
    display: inline-block;

    @include mb() {
      @include fz($font_size_xxs);
    }

    @include pc() {
      @include fz($font_size_xs);
      display: flex;
      align-items: center;
    }

    &.-active {
      & .stepper_number {
        background: $color_primary;
      }
    }

    &:not(:last-child) {
      @include mb() {
        padding-right: $spacing_10x;
      }

      @include pc() {
        padding-right: $spacing_15x;
      }

      &::after {
        content: '';
        position: absolute;
        right: 10px;
        height: 1px;
        background: $color_gray_darken2;

        @include mb() {
          top: calc(#{$numberH_sp} / 2);
          width: 25px;
        }

        @include pc() {
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
        }
      }
    }
  }

  &_title {
    text-align: center;

    @include mb() {
      margin-top: $spacing_1x;
    }
  }
}
</style>
