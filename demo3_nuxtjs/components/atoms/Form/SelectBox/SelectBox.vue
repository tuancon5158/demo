<template>
  <div class="container" :class="classes" v-bind="$attrs">
    <div class="container_wrapper" :class="errorMessage && 'container_wrapper_error'">
      <select
        ref="selectElement"
        class="container_select"
        :class="classesInput"
        :disabled="disabled"
        @change="handleEmitSelected"
      >
        <option v-if="placeholder" selected="true" value="" :disabled="!unSelect">
          {{ placeholder }}
        </option>
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :disabled="item.disabled"
          :selected="item.value !== null ? item.value == modelValue : item.label == modelValue"
        >
          {{ item.label }}
        </option>
      </select>
      <div class="container_select_icon">
        <IconBase icon-color="#767378" width="10" height="5" viewBox="0 0 10 5">
          <IconDown />
        </IconBase>
      </div>
    </div>
    <InputError v-if="errorMessage" :value="errorMessage" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  SetupContext,
  PropType,
  ref,
  watch,
  onMounted
} from '@nuxtjs/composition-api'
import IconBase from '~/components/atoms/IconBase/IconBase.vue'
import IconDown from '~/components/icons/IconDown.vue'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'
// props type
export interface I_ItemSelectInterface {
  value: string
  label: string
  disabled: boolean
}
// interface , move to folder later
type SelectBoxtProps = {
  placeholder: string
  errorMessage: string
  modelValue: string
  disabled: boolean
  unSelect: boolean
  options: I_ItemSelectInterface[]
  typeSelect: string
  activated: boolean
  bgColor: string
}

export default defineComponent({
  name: 'SelectBox',

  components: {
    IconBase,
    IconDown,
    InputError
  },

  props: {
    placeholder: {
      type: String,
      default: ''
    },
    unSelect: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    activated: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array as PropType<I_ItemSelectInterface[]>,
      required: true
    },
    typeSelect: {
      type: String,
      default: 'expand',
      validator: (value: string) => {
        return ['default', 'expand'].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'transparent',
      validator: (value: string) => {
        return ['transparent', 'gray'].includes(value)
      }
    }
  },

  setup(props: SelectBoxtProps, context: SetupContext) {
    const classes = computed(() => {
      return {
        [`-typeSelect--${props.typeSelect}`]: props.typeSelect
      }
    })
    const classesInput = computed(() => {
      return {
        '-activated': props.activated,
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-error`]: props.errorMessage
      }
    })

    const selectElement = ref<null | any>(null)

    const handleEmitSelected = (event: { target: HTMLButtonElement }) => {
      context.emit('update:modelValue', event.target.value)
    }

    onMounted(() => {
      if (props.modelValue !== '') {
        selectElement.value.style.color = '#222'
      }
    })

    watch(
      () => props.modelValue,
      (val) => {
        if (val !== '') {
          selectElement.value.style.color = '#222'
        }
      }
    )

    return {
      classes,
      classesInput,
      selectElement,
      handleEmitSelected
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  border-radius: $select_BorderRadius;

  &.-typeSelect {
    &--default {
      width: fit-content;
    }

    &--expand {
      width: 100%;
    }
  }

  &_wrapper {
    position: relative;
  }

  &_select {
    @include fz($font_size_s);
    width: 100%;
    height: $select_H;
    padding: 0 $spacing_6x 0 $spacing_3x;
    font-style: normal;
    line-height: 24px;
    font-weight: $font_weight_normal;
    color: $color_gray_600;
    border-radius: $select_BorderRadius;
    outline: none;
    border: 1px solid $color_gray_300;
    z-index: 2;
    //custom right arrow
    -webkit-appearance: none;
    appearance: none;

    &.-bgColor {
      &--transparent {
        background: transparent;
      }

      &--gray {
        background: $color_gray_50;
      }
    }

    &.-activated {
      color: $color_gray_900;
    }
    &:disabled {
      background: $color_gray_50;
      color: $color_gray_400;
    }
    &:focus {
      border: 1px solid $color_blue_400;
    }

    &.-error {
      border: 1px solid $color_red_error;
    }

    &_icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-60%);
    }
  }
}
</style>
