<template>
  <div class="inputFieldSet">
    <InputLabel v-if="label" :value="label" color="gray" :required="required" />
    <TextInput
      :has-focus="hasFocus"
      :icon="icon"
      :icon-position="iconPosition"
      :size="size"
      :border-color="borderColor"
      :model-value="modelValue"
      :place-holder="placeHolder"
      :type-input="type"
      :disabled="disabled"
      :error-message="errorMessage"
      :autocomplete="autocomplete"
      @update:modelValue="handleInputFieldChange($event)"
    />
    <InputError v-if="errorMessage" :value="errorMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import InputLabel from '~/components/atoms/Form/InputLabel/InputLabel.vue'
import TextInput from '~/components/atoms/Form/TextInput/TextInput.vue'
import InputError from '~/components/atoms/Form/InputError/InputError.vue'

export default defineComponent({
  name: 'InputFieldSet',

  components: {
    InputLabel,
    TextInput,
    InputError
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    hasFocus: {
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
    value: {
      type: String,
      default: ''
    },
    placeHolder: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    borderColor: {
      type: String,
      default: 'gray'
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
    autocomplete: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  setup(_, context: SetupContext) {
    const handleInputFieldChange = (value: string | number | boolean) => {
      context.emit('update:modelValue', value)
    }

    return {
      // message: useModelWrapper(props, emit, 'modelValue'),
      handleInputFieldChange
    }
  }
})
</script>
