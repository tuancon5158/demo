import RadioButtons from './RadioButtons.vue'
import { ref } from '@nuxtjs/composition-api'

export default {
  title: 'atoms/Form/RadioButtons',

  component: RadioButtons,

  argTypes: {
    autoSelect: {
      control: 'select',
      options: [true, false]
    },
    errorMessage: {
      control: 'input'
    },
    tableCheckbox: {
      control: 'select',
      options: [true, false]
    },
    modelValue: {
      control: 'select',
      options: [1, 'text']
    },
    disabled: {
      control: 'select',
      options: [true, false]
    },
    isVerticalItem: {
      control: 'select',
      options: [true, false]
    }
  }
}
const Template = (args) => ({
  components: { RadioButtons },

  setup() {
    const selected = ref('')

    const updateRadio = (value) => {
      selected.value = value
    }

    return { args, selected, updateRadio }
  },

  template: '<RadioButtons :modelValue="selected" @update:modelValue="updateRadio" v-bind="args"/>'
})

export const Disabled = Template.bind({})
Disabled.args = {
  autoSelect: true,
  errorMessage: '',
  tableCheckbox: true,
  disabled: true,
  isVerticalItem: false,
  radioButtonsData: [
    {
      id: 1,
      label: 'label1',
      value: 1
    },
    {
      id: 2,
      label: 'label2',
      value: 2
    },
    {
      id: 3,
      label: 'label3',
      value: 3
    }
  ]
}

export const UnDisabled = Template.bind({})
UnDisabled.args = {
  autoSelect: true,
  errorMessage: 'error Message',
  tableCheckbox: false,
  disabled: false,
  isVerticalItem: false,
  radioButtonsData: [
    {
      id: 1,
      label: 'label1',
      value: 1
    },
    {
      id: 2,
      label: 'label2',
      value: 2
    },
    {
      id: 3,
      label: 'label3',
      value: 3
    }
  ]
}
