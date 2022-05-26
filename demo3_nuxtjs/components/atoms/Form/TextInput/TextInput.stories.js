import TextInput from './TextInput.vue'

export default {
  title: 'atoms/Form/TextInput',

  component: TextInput,

  argTypes: {
    borderColor: {
      control: 'select',
      options: ['primary', 'secondary', 'white']
    },
    bgColor: {
      control: 'select',
      options: ['primary', 'secondary']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'notice']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    borderRadius: {
      control: 'select',
      options: [true, false]
    },
    typeInput: {
      control: 'select',
      options: ['text', 'number', 'password']
    }
  }
}
const Template = (args) => ({
  components: { TextInput },
  setup() {
    return { args }
  },
  template: '<TextInput v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  bgColor: '',
  size: 'medium',
  borderColor: 'white',
  placeHolder: 'パスワードを入力して下さい',
  typeInput: 'text',
  borderRadius: true,
  color: 'primary',
  value: 1,
  maxValue: 10,
  minValue: 0
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  size: 'medium',
  placeHolder: 'Left Icon Input',
  typeInput: 'text',
  borderRadius: true,
  icon: 'location',
  iconPosition: 'left'
}

export const PasswordInput = Template.bind({})
PasswordInput.args = {
  size: 'medium',
  placeHolder: 'Password',
  typeInput: 'password',
  borderRadius: true,
  icon: 'password',
  iconPosition: 'right'
}

export const WithSuffix = Template.bind({})
WithSuffix.args = {
  size: 'medium',
  placeHolder: 'Input Suffix',
  typeInput: 'text',
  borderRadius: true,
  suffix: '.com'
}

export const WithError = Template.bind({})
WithError.args = {
  size: 'medium',
  placeHolder: 'Input Error',
  typeInput: 'text',
  errorMessage: 'error'
}

export const Disabled = Template.bind({})
Disabled.args = {
  size: 'medium',
  placeHolder: 'Disabled',
  typeInput: 'text',
  disabled: true
}
