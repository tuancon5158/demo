<template>
  <div class="input">
    <input
      ref="inputRef"
      class="input_field"
      :class="[inputClasses, iconInputClasses, colorInputClasses]"
      :value="modelValue"
      :type="typeInputCheck"
      :placeholder="placeHolder"
      :min="typeInputCheck == 'number' ? minValue : false"
      :max="typeInputCheck == 'number' ? maxValue : false"
      :disabled="disabled"
      :autocomplete="autocomplete"
      @keyup="handleInputChange"
    />
    <img
      v-if="icon && icon === 'password'"
      class="input_icon"
      :class="iconClasses"
      :src="
        typeInputCheck === 'password'
          ? require(`@/assets/images/icon/icon-${icon}-hide.svg`)
          : require(`@/assets/images/icon/icon-${icon}-show.svg`)
      "
      :alt="icon"
      role="button"
      @click="switchVisibility"
    />
    <img
      v-if="icon && icon !== 'password'"
      class="input_icon"
      :class="iconClasses"
      :src="require(`@/assets/images/icon/icon-${icon}.svg`)"
      :alt="icon"
    />
    <p v-if="suffix" class="input_suffix" :class="suffixClasses">
      {{ suffix }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext, ref, onMounted } from '@nuxtjs/composition-api'

// props type
type TextInputProps = {
  modelValue: string | number
  typeInput: string
  borderColor: string
  borderRadius: boolean
  size: string
  minValue: string
  maxValue: number
  placeHolder: string
  disabled: boolean
  icon: string
  iconPosition: string
  errorMessage: string
  suffix: string
  hasFocus: boolean
  colorInput: string
}
export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    typeInput: {
      type: String,
      default: 'text',
      validator: (value: string) => {
        return ['number', 'text', 'email', 'password'].includes(value)
      }
    },
    borderColor: {
      type: String,
      required: false,
      default: 'gray',
      validator: (value: string) => {
        return ['primary', 'gray', 'white', 'none'].includes(value)
      }
    },
    borderRadius: {
      type: Boolean,
      default: true,
      validator: (value: boolean) => {
        return [true, false].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 100
    },
    placeHolder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasFocus: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'none',
      validator: (value: string) => {
        return ['none', 'left', 'right'].includes(value)
      }
    },
    errorMessage: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    colorInput: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['black', 'white'].includes(value)
      }
    }
  },

  emits: ['update:modelValue'],

  setup(props: TextInputProps, context: SetupContext) {
    const handleInputChange = (event: { target: HTMLButtonElement }) => {
      context.emit('update:modelValue', event.target.value)
    }

    const inputRef = ref()

    onMounted(() => {
      if (props.hasFocus) {
        inputRef.value.focus()
      }
    })

    const suffixClasses = computed(() => {
      return {
        '-disabled': props.disabled
      }
    })

    const inputClasses = computed(() => {
      return {
        [`-borderColor--${props.borderColor}`]: props.borderColor,
        [`-size--${props.size}`]: props.size,
        '-border': props.borderRadius,
        [`-error`]: props.errorMessage,
        '-disabled': props.disabled
      }
    })

    const iconInputClasses = computed(() => {
      if (props.icon) {
        return {
          [`-icon--${props.iconPosition}`]: props.iconPosition
        }
      }
    })

    const colorInputClasses = computed(() => {
      return {
        [`-colorInput--${props.colorInput}`]: props.colorInput
      }
    })

    const iconClasses = computed(() => {
      if (props.icon) {
        return { [`-position--${props.iconPosition}`]: props.iconPosition }
      }

      return {
        '-disabled': props.disabled
      }
    })
    const typeInputCheck = ref(props.typeInput)
    const switchVisibility = () => {
      typeInputCheck.value = typeInputCheck.value === 'password' ? 'text' : 'password'
    }

    return {
      typeInputCheck,
      suffixClasses,
      inputClasses,
      iconInputClasses,
      iconClasses,
      colorInputClasses,
      handleInputChange,
      switchVisibility,
      inputRef
    }
  }
})
</script>

<style lang="scss" scoped>
.input {
  position: relative;

  &_field {
    width: 100%;
    height: $input_H;
    padding: 0 $spacing_3x;
    outline: none;
    border: none;
    background: $color_gray_50;

    &:focus {
      border: 1px solid $color_gray_300;
    }

    &.-border {
      border-radius: $input_BorderRadius;
    }

    &.-borderColor {
      &--primary {
        border-color: 1px solid $color_gray_lighten1;
        color: $color_gray_900;
      }

      &--gray {
        border: 1px solid $color_gray_300;

        &:focus {
          border: 1px solid $color_blue_400;
        }
      }

      &--white {
        border: 1px solid $color_white;
      }
    }

    &.-error {
      border: 1px solid $color_red_error;
    }

    &.-size {
      &--small {
        @include fz($font_size_label_s);
        height: 40px;
      }

      &--medium {
        @include fz($font_size_s);
      }

      &--large {
        @include fz($font_size_m);
      }
    }

    &.-icon {
      &--left {
        padding-left: $spacing_9x;
      }
      &--right {
        padding-right: $spacing_9x;
      }
    }

    &.-disabled {
      color: $color_gray_800;
      pointer-events: none;
    }

    &.-colorInput {
      &--black {
        color: $color_gray_1000;
        background: $color_white;
      }
      &--white {
        color: $color_white;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  &_icon {
    cursor: pointer;
    position: absolute;
    display: block;
    top: 50%;
    transform: translate(0, -50%);
    max-width: 20px;
    opacity: 0.5;

    &.-disabled {
      opacity: 0.3;
    }

    img {
      width: 24px;
      height: 24px;
    }

    &.-position {
      &--left {
        left: 1rem;
      }

      &--right {
        right: 1rem;
      }
    }
  }

  &_suffix {
    position: absolute;
    @include fz($font_size_xxxs);
    right: 0.5rem;
    bottom: 1rem;
    margin: 0;
    padding: 0;

    &.-disabled {
      color: $color_gray_400;
    }
  }
}

input[type='number'] {
  height: $input_H;
  color: $font_color_base;
  outline: none;
  border: 1px solid $color_gray_lighten1;
  -moz-appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
  width: 15px;
  height: 25px;
  -webkit-appearance: none;
  margin: 0;
}
</style>
