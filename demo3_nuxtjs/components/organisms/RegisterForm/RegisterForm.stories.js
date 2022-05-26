import RegisterForm from './RegisterForm.vue'

export default {
  title: 'organisms/RegisterForm',

  component: RegisterForm,

  parameters: {
    backgrounds: {
      default: 'light'
    }
  },

  argTypes: {}
}
const Template = (_, { argTypes }) => ({
  components: { RegisterForm },
  props: Object.keys(argTypes),
  template: '<div style="max-width: 600px"><RegisterForm v-bind="$props" /></div>'
})

export const RegisterFormDefault = Template.bind({})
RegisterFormDefault.args = {
  values: { name: '', email: '', password: '', passwordConfirm: '' },
  serverError: 'error'
}
