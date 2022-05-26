import SubmitButton from './SubmitButton.vue'

export default {
  title: 'atoms/Button/SubmitButton',

  component: SubmitButton,

  parameters: {},

  argTypes: {}
}

const Template = (args) => ({
  components: { SubmitButton },
  setup() {
    return { args }
  },
  template: '<SubmitButton v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Submit Button'
}

export const WithSpinner = Template.bind({})
WithSpinner.args = {
  label: 'Submit Button',
  spinner: true,
  isLoading: true
}
