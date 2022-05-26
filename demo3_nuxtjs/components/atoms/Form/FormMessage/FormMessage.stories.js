import FormMessage from './FormMessage.vue'

export default {
  title: 'atoms/Form/FormMessage',

  component: FormMessage,

  argTypes: {
    type: {
      control: 'select',
      options: ['warning', 'success']
    }
  }
}

const Template = (args) => ({
  components: { FormMessage },
  setup() {
    return { args }
  },
  template: '<div style="margin-top: 20px;"><FormMessage v-bind="args" /></div>'
})

export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  value: 'Warning message'
}

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  value: 'Success message'
}
