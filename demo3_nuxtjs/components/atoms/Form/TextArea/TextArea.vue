<template>
  <div class="textArea">
    <div class="textArea_group">
      <textarea
        :disabled="disabled"
        class="textArea_item"
        :value="modelValue"
        :class="[classBorder, classes]"
        :rows="row"
        :cols="col"
        :placeholder="placeholder"
        @keyup="handleAreaInputChange"
      />
      <p v-show="isDisplayWordCount" class="textArea_count">{{ valueCount }}/{{ maxWordCount }}</p>
    </div>

    <InputError v-if="errorMessage" :value="errorMessage" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext, ref, watch } from '@nuxtjs/composition-api'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'

type TextAreaProps = {
  disabled: boolean
  row: string
  col: string
  placeholder: string
  label: string
  modelValue: string
  errorMessage: string
  isDisplayWordCount: boolean
  maxWordCount: number
  bgColor: string
  borderRadius: boolean
  borderColor: string
}

export default defineComponent({
  name: 'TextArea',

  components: { InputError },

  props: {
    errorMessage: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    row: {
      type: String,
      default: '10'
    },
    col: {
      type: String,
      default: '150'
    },
    placeholder: {
      type: String,
      default: ''
    },
    isDisplayWordCount: {
      type: Boolean,
      default: false
    },
    maxWordCount: {
      type: Number,
      default: 100
    },
    bgColor: {
      type: String,
      default: 'gray',
      validator: (value: string) => {
        return ['gray', 'white', 'inquiryForm'].includes(value)
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
    }
  },

  emits: ['update:modelValue'],

  setup(props: TextAreaProps, context: SetupContext) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-border`]: props.errorMessage,
        [`-borderColor--${props.borderColor}`]: props.borderColor
      }
    })
    const inputClasses = computed(() => {
      return {
        [`-borderRadius`]: props.borderRadius
      }
    })

    const classBorder = ref('')

    const handleAreaInputChange = (event: { target: HTMLButtonElement }) => {
      context.emit('update:modelValue', event.target.value)
    }

    const onCount = (value: string) => {
      return value.trim().split(/\s+/).join('').length
    }

    const valueCount = computed(() => {
      return props.modelValue.trim().length
    })

    watch(
      () => props.modelValue,
      (curr) => {
        const currentCount = onCount(curr)

        if (props.isDisplayWordCount && currentCount > props.maxWordCount) {
          classBorder.value = '-border'
        } else {
          classBorder.value = ''
        }
      }
    )

    return {
      handleAreaInputChange,
      valueCount,
      classBorder,
      classes,
      inputClasses
    }
  }
})
</script>

<style lang="scss" scoped>
.textArea {
  &_group {
    position: relative;
    width: fit-content;
  }
  &_count {
    position: absolute;
    right: 12px;
    bottom: 8px;
    color: $color_gray_600;
    @include fz($font_size_xxxs);
    font-style: normal;
    font-weight: $font_weight_medium;
  }
  &_item {
    width: 100%;
    padding: $spacing_2x;
    overflow: auto;
    outline: none;
    line-height: 24px;
    color: $color_gray_900;
    @include fz($font_size_s);
    @include ls(30);
    // keep current -6px
    margin-bottom: -6px;

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
    &:focus {
      border: 1px solid $color_blue_400;
    }

    &.-borderRadius {
      border-radius: $textArea_BorderRadius;
    }

    &.-border {
      border: 1px solid $color_red_500;
    }

    &.-bgColor {
      &--gray {
        background-color: $color_gray_50;
      }

      &--inquiryForm {
        color: $color_white;
        background: rgba(255, 255, 255, 0.3);

        &:focus {
          border: 1px solid $color_white;
        }
      }

      &--white {
        background-color: $color_white;
      }
    }
  }
}
</style>
