import InputError from './InputError.vue'

export default {
  title: 'atoms/Form/InputError',

  component: InputError,

  argTypes: {
    value: {
      control: 'text',
      options: ['text1', 'text2']
    }
  }
}
const Template = (_, { argTypes }) => ({
  components: { InputError },
  props: Object.keys(argTypes),
  template: '<InputError v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  value: 'Error 1'
}
