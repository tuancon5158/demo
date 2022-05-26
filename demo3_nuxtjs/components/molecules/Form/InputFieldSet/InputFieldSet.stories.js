import InputFieldSet from './InputFieldSet.vue'

export default {
  title: 'molecules/Form/InputFieldSet',

  component: InputFieldSet,

  argTypes: {}
}

const Template = (_, { argTypes }) => ({
  components: { InputFieldSet },
  props: Object.keys(argTypes),
  template: '<div style="margin-top: 20px;"><InputFieldSet v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Label'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Label',
  disabled: true
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Label',
  errorMessage: 'Error message'
}
