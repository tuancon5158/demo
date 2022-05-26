import RegisterConfirmForm from './RegisterConfirmForm.vue'

export default {
  title: 'organisms/RegisterConfirmForm',

  component: RegisterConfirmForm,

  parameters: {
    backgrounds: {
      default: 'light'
    }
  },

  argTypes: {}
}
const Template = (_, { argTypes }) => ({
  components: { RegisterConfirmForm },
  props: Object.keys(argTypes),
  template: '<div style="max-width: 600px"><RegisterConfirmForm v-bind="$props" /></div>'
})

export const RegisterConfirmFormDefault = Template.bind({})
RegisterConfirmFormDefault.args = {
  values: { name: '', email: '', passwordConfirm: '', password: '' }
}
