import SelectBox from './SelectBox.vue'

export default {
  title: 'atoms/Form/SelectBox',

  component: SelectBox,

  argTypes: {
    errorMessage: {
      control: 'input'
    },
    disabled: {
      control: 'select',
      options: [true, false]
    },
    typeSelect: {
      control: 'select',
      options: ['default', 'expand']
    }
  }
}
const Template = (args) => ({
  components: { SelectBox },
  setup() {
    return { args }
  },
  template: '<SelectBox v-bind="args"/>'
})

export const Normal = Template.bind({})
Normal.args = {
  errorMessage: '',
  disabled: false,
  options: [
    {
      value: '0',
      label: 'label1'
    },
    {
      value: '1',
      label: 'Youtube'
    },
    {
      value: '2',
      label: 'Sketchfab'
    },
    {
      value: '3',
      label: 'label3'
    }
  ],
  typeSelect: 'default'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  options: [
    {
      value: '0',
      label: 'label1'
    },
    {
      value: '1',
      label: 'Youtube'
    },
    {
      value: '2',
      label: 'Sketchfab'
    },
    {
      value: '3',
      label: 'label3'
    }
  ],
  typeSelect: 'default'
}

export const ExpandWithError = Template.bind({})
ExpandWithError.args = {
  errorMessage: 'errorMessage',
  options: [
    {
      value: '0',
      label: 'label1'
    },
    {
      value: '1',
      label: 'Youtube'
    },
    {
      value: '2',
      label: 'Sketchfab'
    },
    {
      value: '3',
      label: 'label3'
    }
  ],
  typeSelect: 'expand'
}
