<template>
  <div class="radioButton" :class="classes">
    <div
      v-for="item in radioButtonsData"
      :key="item.id"
      class="radioButton_group"
      :class="{ '-vertical': isVerticalItem }"
    >
      <input
        :id="item.id"
        :disabled="disabled"
        class="radio"
        type="radio"
        :value="item.value"
        :checked="item.value == modelValue"
        @change="handleEmitButtonRadio"
      />
      <label v-if="isVerticalItem" class="verticalItem" :for="item.id">
        <span class="label"></span>
        <span class="label_text">
          <span class="label_mainText">
            {{ item.label }}
          </span>
          <!-- <br /> -->
          <span class="label_subText">
            {{ item.subLabel }}
          </span>
        </span>
      </label>
      <label v-else class="label" :for="item.id">
        <span class="label_text">
          {{ item.label }}
        </span>
      </label>
      <InputError v-if="errorMessage" :value="errorMessage" />
      <br />
      <slot :item="item.description"></slot>
      <div v-if="tableCheckbox && item.id !== radioButtonsData.length">
        <hr class="line" />
      </div>
    </div>
    <InputError v-if="!autoSelect" :value="errorMessage" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from '@nuxtjs/composition-api'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'
interface RadioElement {
  id: string
  label: string
  subLabel?: string
  value: string
}

type RadioButtonsProps = {
  isVerticalItem: boolean
  InputError: string
  tableCheckbox: boolean
  autoSelect: boolean
  errorMessage: string
  modelValue: number
  disabled: boolean
  modelName: string
  type: string
  labelColor: string
  dotColor: string
}

export default defineComponent({
  name: 'RadioButtons',
  components: { InputError },
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        return ['default', 'privacy'].includes(value)
      }
    },
    autoSelect: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    tableCheckbox: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    radioButtonsData: {
      type: Array as PropType<RadioElement[]>,
      required: true
    },
    modelName: {
      type: String,
      default: 'model'
    },
    isVerticalItem: {
      type: Boolean,
      default: false
    },
    labelColor: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['black', 'white', 'gray'].includes(value)
      }
    },
    dotColor: {
      type: String,
      default: 'blue',
      validator: (value: string) => {
        return ['blue', 'yellow'].includes(value)
      }
    }
  },
  emits: ['update'],
  setup(props: RadioButtonsProps, context: SetupContext) {
    const handleEmitButtonRadio = (event: { target: HTMLButtonElement }) => {
      context.emit('update:modelValue', event.target.value)
    }

    const classes = computed(() => {
      return {
        [`-type--${props.type}`]: props.type,
        [`-labelColor--${props.labelColor}`]: props.labelColor,
        [`-dotColor--${props.dotColor}`]: props.dotColor
      }
    })

    return {
      classes,
      handleEmitButtonRadio
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes ripple {
  0% {
    box-shadow: 0 0 0 1px rgba(182, 190, 224, 0);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(182, 190, 224, 1);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(182, 190, 224, 0);
  }
}

.radioButton {
  &_group {
    margin: $spacing_2x 0;
    position: relative;
  }

  &.-labelColor {
    &--white {
      color: $color_white;
    }

    &--black {
      color: $font_color_base;
    }

    &--gray {
      color: $color_gray_800;
    }
  }

  &.-dotColor {
    &--blue {
      .label {
        &::before {
          border: 2px solid $color_gray_600;
        }
        &::after {
          background: $color_blue_400;
        }
      }

      .radio {
        &:checked + label::before {
          border-color: $color_blue_400;
        }
      }
    }

    &--yellow {
      .label {
        &::before {
          border: 2px solid $color_white;
        }
        &::after {
          background: $color_yellow;
        }
      }

      .radio {
        &:checked + label::before {
          border-color: $color_white;
        }
      }
    }
  }

  .label {
    display: inline-block;
    min-height: 20px;
    position: relative;
    margin-right: $spacing_1x;
    cursor: pointer;
    vertical-align: bottom;
    font-weight: $font_weight_medium;
    @include fz($font_size_s);
    line-height: 18px;

    &::before,
    &::after {
      position: absolute;
      content: '';
      border-radius: 50%;
      transition: all 0.3s ease;
      transition-property: transform, border-color;
    }
    &::before {
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
    }
    &::after {
      top: 5px;
      left: 5px;
      width: 10px;
      height: 10px;
      transform: scale(0);
    }

    &_text {
      display: inline-block;
      margin-left: $spacing_7x;
    }
  }
  .radio {
    display: none;
    &:checked + label::before {
      animation: ripple 0.2s linear forwards;
    }
    &:checked + label::after {
      transform: scale(1);
    }
    &:disabled {
      opacity: 0;
    }
    &:disabled + label::before {
      border-color: $color_gray_400;
    }
    &:disabled + label::after {
      background-color: $color_gray_400;
    }
  }
  .-vertical {
    display: flex;
    align-items: center;
    padding: $spacing_4x;
    margin: 0;
    .verticalItem {
      display: contents;
    }
    & .radio {
      margin: 0;
      flex: 0 0 auto;
      &:checked + .verticalItem .label::before {
        border-color: $color_blue_400;
        animation: ripple 0.2s linear forwards;
      }
      &:checked + .verticalItem .label::after {
        transform: scale(1);
      }
      &:disabled {
        opacity: 0;
      }
      &:disabled + .verticalItem .label::before {
        border-color: $color_gray_400;
      }
      &:disabled + .verticalItem .label::after {
        background-color: $color_gray_400;
      }
    }
    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
    &:nth-last-child(2) {
      border-bottom: 0;
    }
    & .label {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      @include fz($font_size_xxxs);
      line-height: 18px;
      font-weight: $font_weight_normal;

      &_text {
        margin-left: $spacing_7x;
        color: $color_gray_900;
        font-weight: $font_weight_medium;
        @include fz($font_size_s);
      }

      &_subText {
        display: block;
        margin-top: $spacing_1x;
        font-weight: $font_weight_normal;
        @include fz($font_size_xs);
        line-height: 20px;
      }

      &_mainText {
        margin-bottom: $spacing_1x;
        display: inline-block;
      }
    }
  }

  &.-type {
    &--privacy {
      background-color: $color_light_blue_100;
      border-radius: $radioButton_BorderRadius;

      .button_group {
        border-bottom: none !important;

        &::after {
          content: '';
          width: calc(100% - 48px);
          height: 1px;
          background: $color_light_blue_200;
          position: absolute;
          right: 0;
          bottom: 0;
        }

        &:nth-last-child(2) {
          &::after {
            display: none;
          }
        }
      }
    }
  }

  // &.privacy {
  //   background-color: $color_light_blue_100;
  //   border-radius: $radioButton_BorderRadius;

  //   .button_group {
  //     border-bottom: none !important;

  //     &::after {
  //       content: '';
  //       width: 211px;
  //       height: 1px;
  //       background: $color_light_blue_200;
  //       position: absolute;
  //       right: 0;
  //       bottom: 0;
  //     }

  //     &:nth-last-child(2) {
  //       &::after {
  //         display: none;
  //       }
  //     }
  //   }
  // }
}
</style>
