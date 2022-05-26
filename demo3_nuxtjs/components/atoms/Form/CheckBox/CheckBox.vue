<template>
  <div class="container">
    <input
      :id="id"
      class="container-checkbox"
      :disabled="disabled"
      type="checkbox"
      :checked="checked"
      @change="handleEmitChecked"
      :value="value"
    />
    <label :class="classes" :for="id">
      <div class="circle" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, computed } from '@nuxtjs/composition-api'

export interface ItemCheckBoxPropsInterface {
  typeCheckBox: string
  modelValue: boolean
  disabled: boolean
  id: string | number
  checked: boolean
  value: string | object | number
}

export default defineComponent({
  name: 'CheckBox',

  props: {
    typeCheckBox: {
      type: String,
      default: 'check',
      validator: (value: string) => {
        return ['check', 'empty', 'dash'].includes(value)
      }
    },
    id: {
      type: [String, Number],
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },

  setup(props: ItemCheckBoxPropsInterface, context: SetupContext) {
    const handleEmitChecked = (event: { target: HTMLInputElement }) => {
      if (event.target.checked) {
        context.emit('onCheck', props.value)
      } else {
        context.emit('onUnCheck', props.value)
      }
    }
    const classes = computed(() => {
      return {
        [`-${props.typeCheckBox}`]: props.typeCheckBox
      }
    })

    return {
      handleEmitChecked,
      classes
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: fit-content;
  display: flex;

  //Normal
  input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    width: 18px;
    height: 18px;
    border: solid $color_gray_600 1px;
    background: transparent;
    border-radius: $checkbox_BorderRadius;
    position: relative;
    transition: all 0.5s;

    & .circle {
      background: $color_blue_100;
      width: 3.2rem;
      height: 3.2rem;
      position: absolute;
      opacity: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: -1;
    }
  }

  //Input when click
  input:checked {
    //Common
    + label {
      background-color: $color_blue_400;
      border-color: $color_blue_400;

      & .circle {
        animation-name: checkboxCircle;
        animation-duration: 0.3s;
      }
    }
    //Check
    + .-check {
      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 29%;
        bottom: 25%;
        display: inline-block;
        width: 2px;
        border-radius: 1px;
        background: $color_white;
        transform-origin: 50% calc(100% - 0.0625em);
      }

      &::before {
        height: 12px;
        transform: rotate(45deg);
      }

      &::after {
        height: 6px;
        transform: rotate(-47deg);
      }
    }
    //Dash
    + .-dash {
      &::after {
        content: '';
        display: relative;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 0;
        border: solid $color_white 1px;
        border-width: 0 0 2px 0;
        border-radius: 1px;
      }
    }
  }
  ////Input when disabled
  input:disabled {
    //common
    + label {
      background-color: $color_gray_400;
      border-color: $color_gray_400;
    }
    //check
    + .-check {
      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 29%;
        bottom: 25%;
        display: inline-block;
        width: 2px;
        border-radius: 1px;
        background: $color_white;
        transform-origin: 50% calc(100% - 0.0625em);
      }

      &::before {
        height: 12px;
        transform: rotate(45deg);
      }

      &::after {
        height: 6px;
        transform: rotate(-47deg);
      }
    }
    //dash
    + .-dash {
      &::after {
        content: '';
        display: relative;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 0;
        border: solid $color_white 1px;
        border-width: 0 0 2px 0;
        border-radius: 1px;
      }
    }
    //empty
    + .-empty {
      background-color: transparent;
      border-color: $color_gray_400;
    }
  }
}

@keyframes checkboxCircle {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
