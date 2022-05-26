import TextArea from './TextArea.vue'

export default {
  title: 'atoms/Form/TextArea',

  component: TextArea,

  argTypes: {}
}
const Template = (args) => ({
  components: { TextArea },
  setup() {
    return { args }
  },
  template: '<TextArea v-bind="args"/>'
})

export const Default = Template.bind({})
Default.args = {
  label: 'label',
  errorMessage: 'error message',
  disabled: false,
  row: '10',
  col: '20',
  placeholder: 'placeholder text here'
}
