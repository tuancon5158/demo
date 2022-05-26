<template>
  <button class="button" type="submit" :class="classes" rounded @click.prevent="onClick">
    <div v-if="spinner && isLoading" class="button_spinner">
      <Spinner size="small" :color="spinnerColor" />
    </div>
    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import Spinner from '~/components/atoms/Spinner/Spinner.vue'

// props type
type ButtonProps = {
  isLoading: boolean
  spinner: boolean
  label: string
  borderColor: string
  bgColor: string
  size: string
  rounded: boolean
  icon: string
  iconWidth: string
  iconHeight: string
  disabled: boolean
}

export default defineComponent({
  name: 'SubmitButton',

  components: {
    Spinner
  },

  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    spinner: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    borderColor: {
      type: String,
      default: 'transparent',
      validator: (value: string) => {
        return ['transparent', 'primary', 'secondary', 'white', 'gray', 'black'].includes(value)
      }
    },
    bgColor: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['primary', 'secondary', 'white', 'black', 'facebook', 'twitter'].includes(value)
      }
    },
    spinnerColor: {
      type: String,
      default: 'black',
      validator: (value: string) => {
        return ['primary', 'secondary', 'black', 'white'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => {
        return ['xsmall', 'small', 'medium', 'large'].includes(value)
      }
    },
    rounded: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconWidth: {
      type: String,
      default: '20px'
    },
    iconHeight: {
      type: String,
      default: '20px'
    },
    link: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['onClick'],

  setup(props: ButtonProps, { emit }) {
    const classes = computed(() => {
      return {
        [`-bgColor--${props.bgColor}`]: props.bgColor,
        [`-borderColor--${props.borderColor}`]: props.borderColor,
        [`-size--${props.size}`]: props.size,
        '-rounded': props.rounded,
        '-isLoading': props.isLoading,
        '-disabled': props.disabled
      }
    })

    const onClick = () => {
      emit('onClick')
    }

    return {
      classes,
      onClick
    }
  }
})
</script>

<style scoped lang="scss">
@import './Button.scss';

.button {
  &_spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
